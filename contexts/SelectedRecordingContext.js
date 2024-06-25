import React, { createContext, useState } from 'react';

export const SelectedRecordingContext = createContext();

export const SelectedRecordingProvider = ({ children }) => {
  const [selectedRecording, setSelectedRecording] = useState(null);

  return (
    <SelectedRecordingContext.Provider value={{ selectedRecording, setSelectedRecording }}>
      {children}
    </SelectedRecordingContext.Provider>
  );
};
