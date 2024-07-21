from flask import Flask, request, jsonify
import os
import wave
import numpy as np
import logging
from pydub import AudioSegment
from scipy.signal import butter, lfilter
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Initialize logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

chunk = 2048

def butter_lowpass(cutoff, fs, order=5):
    nyquist = 0.5 * fs
    normal_cutoff = cutoff / nyquist
    b, a = butter(order, normal_cutoff, btype='low', analog=False)
    return b, a

def lowpass_filter(data, cutoff, fs, order=5):
    b, a = butter_lowpass(cutoff, fs, order=order)
    y = lfilter(b, a, data)
    return y

def convert_to_wav(file_path):
    try:
        logger.debug(f"Converting {file_path} to WAV format.")
        audio = AudioSegment.from_file(file_path)
        wav_path = file_path.rsplit('.', 1)[0] + '.wav'
        audio.export(wav_path, format='wav')
        logger.debug(f"Conversion successful. Saved as {wav_path}.")
        return wav_path
    except Exception as e:
        logger.error(f"Error converting {file_path} to WAV: {e}")
        raise

def analyze_audio(file_path):
    try:
        # Convert to wav format if necessary
        if not file_path.endswith('.wav'):
            file_path = convert_to_wav(file_path)
        
        logger.debug(f"Analyzing audio file {file_path}.")
        # open up a wave
        wf = wave.open(file_path, 'rb')
        swidth = wf.getsampwidth()
        RATE = wf.getframerate()
        n_channels = wf.getnchannels()
        logger.debug(f"Sample width: {swidth}, Frame rate: {RATE}, Channels: {n_channels}")
        
        # use a Blackman window
        window = np.blackman(chunk)
        
        # read some data
        data = wf.readframes(chunk)
        logger.debug(f"Read {len(data)} bytes from audio file.")
        
        frequencies = []
        max_expected_freq = 400  # Set a reasonable max expected frequency for human voice analysis
        
        while len(data) == chunk * swidth * n_channels:
            print("--------Processing chunk----------")
            # unpack the data and apply the Blackman window
            indata = np.frombuffer(data, dtype=np.int16).reshape(-1, n_channels)
            windowed_data = (indata * window[:, None]).mean(axis=1)  # Convert to mono by averaging channels
            
            # Apply low-pass filter
            filtered_data = lowpass_filter(windowed_data, max_expected_freq, RATE)
            
            # Take the fft and square each value
            fftData = abs(np.fft.rfft(filtered_data)) ** 2
            
            # find the maximum
            which = fftData[1:].argmax() + 1
            # use quadratic interpolation around the max
            if which != len(fftData) - 1:
                y0, y1, y2 = np.log(fftData[which - 1:which + 2])
                x1 = (y2 - y0) * .5 / (2 * y1 - y2 - y0)
                # find the frequency and output it
                thefreq = abs((which + x1) * RATE / chunk)  # Ensure non-negative
            else:
                thefreq = which * RATE / chunk

            if thefreq <= max_expected_freq:
                frequencies.append(thefreq)
                logger.debug(f"Detected frequency: {thefreq} Hz")
            else:
                logger.debug("Detected frequency exceeds max expected frequency limit, ignoring")
            
            # read some more data
            data = wf.readframes(chunk)
        
        if not frequencies:
            logger.debug("No frequencies found in the audio file.")
            return None, None, None
        
        # Remove outliers using IQR
        frequencies = np.array(frequencies)
        Q1 = np.percentile(frequencies, 25)
        Q3 = np.percentile(frequencies, 75)
        IQR = Q3 - Q1
        lower_bound = Q1 - 1.5 * IQR
        upper_bound = Q3 + 1.5 * IQR
        filtered_frequencies = frequencies[(frequencies >= lower_bound) & (frequencies <= upper_bound)]
        
        if len(filtered_frequencies) == 0:
            logger.debug("No frequencies left after outlier removal.")
            return None, None, None
        
        min_freq = np.min(filtered_frequencies)
        max_freq = np.max(filtered_frequencies)
        avg_freq = np.mean(filtered_frequencies)
        
        logger.debug(f"Frequency analysis complete. Min freq: {min_freq}, Max freq: {max_freq}, Avg freq: {avg_freq}")
        return min_freq, max_freq, avg_freq
    except Exception as e:
        logger.error(f"Error analyzing audio: {e}")
        return None, None, None

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        logger.error("No file part in the request.")
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        logger.error("No selected file.")
        return jsonify({"error": "No selected file"}), 400
    if file:
        try:
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            logger.debug(f"File {filename} uploaded successfully and saved to {file_path}.")
            min_freq, max_freq, avg_freq = analyze_audio(file_path)
            if min_freq is None or max_freq is None:
                logger.error("Failed to analyze audio.")
                return jsonify({"error": "Failed to analyze audio"}), 500
            return jsonify({
                "min_frequency": min_freq,
                "max_frequency": max_freq,
                "avg_frequency": avg_freq
            }), 200
        except Exception as e:
            logger.error(f"Exception during file upload or analysis: {e}")
            return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(debug=True)
