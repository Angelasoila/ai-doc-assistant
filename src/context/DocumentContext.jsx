import React, { createContext, useState, useContext } from 'react';

// Create the context
const DocumentContext = createContext();

// Context Provider Component
export const DocumentProvider = ({ children }) => {
  const [originalDocument, setOriginalDocument] = useState(null);
  const [improvedDocument, setImprovedDocument] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({
    status: 'idle',
    message: ''
  });

  // Function to reset document state
  const resetDocument = () => {
    setOriginalDocument(null);
    setImprovedDocument(null);
    setSuggestions([]);
    setUploadStatus({ status: 'idle', message: '' });
  };

  // Provide the context value
  const contextValue = {
    originalDocument,
    setOriginalDocument,
    improvedDocument,
    setImprovedDocument,
    suggestions,
    setSuggestions,
    uploadStatus,
    setUploadStatus,
    resetDocument
  };

  return (
    <DocumentContext.Provider value={contextValue}>
      {children}
    </DocumentContext.Provider>
  );
};

// Custom hook to use the document context
export const useDocumentContext = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocumentContext must be used within a DocumentProvider');
  }
  return context;
};

