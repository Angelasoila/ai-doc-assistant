import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert';

import { useDocumentContext } from '@/context/DocumentContext';
import DocumentUploader from '@/components/DocumentUploader';
import DocumentViewer from '@/components/DocumentViewer';
import SuggestionList from '@/components/SuggestionList';

const Home = () => {
  const { uploadStatus } = useDocumentContext();

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>AI Document Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          {/* File Upload Component */}
          <DocumentUploader />

          {/* Status Alert */}
          {uploadStatus.message && (
            <Alert 
              variant={uploadStatus.status === 'error' ? 'destructive' : 'default'}
              className="mb-4"
            >
              <AlertTitle>
                {uploadStatus.status === 'error' ? 'Error' : 
                 uploadStatus.status === 'loading' ? 'Processing' : 'Success'}
              </AlertTitle>
              <AlertDescription>
                {uploadStatus.message}
              </AlertDescription>
            </Alert>
          )}

          {/* Document Viewer Component */}
          <DocumentViewer />

          {/* Suggestions List Component */}
          <SuggestionList />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;

