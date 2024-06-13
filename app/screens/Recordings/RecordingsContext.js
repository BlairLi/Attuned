// RecordingsContext.js
import React, { createContext, useState } from 'react';

export const RecordingsContext = createContext();

export const RecordingsProvider = ({ children }) => {
  const [recordings, setRecordings] = useState([]);

  return (
    <RecordingsContext.Provider value={{ recordings, setRecordings }}>
      {children}
    </RecordingsContext.Provider>
  );
};
