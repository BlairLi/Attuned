// RecordingsContext.js
import React, { createContext, useState } from 'react';

export const RecordingsContext = createContext();

export const RecordingsProvider = ({ children }) => {
  const [recordings, setRecordings] = useState([]);

  const addRecording = (recording) => {
    setRecordings((prevRecordings) => [...prevRecordings, recording]);
  };

  return (
    <RecordingsContext.Provider value={{ recordings, addRecording }}>
      {children}
    </RecordingsContext.Provider>
  );
};
