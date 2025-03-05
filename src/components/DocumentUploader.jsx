import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { parseDocument } from '@/utils/documentParsers';
import { generateMockSuggestions, applyMockImprovements } from '@/utils/suggestionGenerator';
import { useDocumentContext } from '@/context/DocumentContext';

const DocumentUploader = () => {
  const fileInputRef = useRef(null);
  const { 
    setOriginalDocument, 
    setImprovedDocument, 
    setSuggestions, 
    setUploadStatus 
  } = useDocumentContext();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploadStatus({ status: 'loading', message: 'Processing document...' });
      
      // Parse document
      const text = await parseDocument(file);
      setOriginalDocument(text);

      // Generate suggestions
      const mockSuggestions = generateMockSuggestions(text);
      setSuggestions(mockSuggestions);

      // Apply improvements
      const improvedTextWithHighlights = applyMockImprovements(text, mockSuggestions);
      setImprovedDocument(improvedTextWithHighlights);

      setUploadStatus({ status: 'success', message: 'Document processed successfully!' });
    } catch (error) {
      console.error('Document parsing error:', error);
      setUploadStatus({
        status: 'error',
        message: `Error processing document: ${error.message}`
      });
    }
  };

  return (
    <div className="mb-4">
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".txt,.docx"
        className="hidden"
      />
      <Button 
        onClick={() => fileInputRef.current.click()}
        className="w-full"
      >
        Upload Document (Supported: .txt, .docx)
      </Button>
    </div>
  );
};

export default DocumentUploader;

