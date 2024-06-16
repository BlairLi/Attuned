from flask import Flask, request, jsonify
import os
import librosa
import numpy as np
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

def analyze_audio(file_path):
    try:
        y, sr = librosa.load(file_path, sr=None)
        stft = np.abs(librosa.stft(y))
        freqs = librosa.fft_frequencies(sr=sr)
        
        # Aggregate the STFT result across time to get an average or max energy value per frequency bin
        stft_mean = np.mean(stft, axis=1)
        
        max_freq = freqs[np.argmax(stft_mean)]
        min_freq = freqs[np.argmin(stft_mean[stft_mean > 0])]
        
        return min_freq, max_freq
    except Exception as e:
        print(f"Error analyzing audio: {e}")
        return None, None

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        min_freq, max_freq = analyze_audio(file_path)
        if min_freq is None or max_freq is None:
            return jsonify({"error": "Failed to analyze audio"}), 500
        return jsonify({
            "min_frequency": min_freq,
            "max_frequency": max_freq
        }), 200

if __name__ == '__main__':
    app.run(debug=True)
