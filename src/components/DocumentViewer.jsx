import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDocumentContext } from "@/context/DocumentContext";

const DocumentViewer = () => {
  const { originalDocument, improvedDocument } = useDocumentContext();

  if (!originalDocument || !improvedDocument) return null;

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Original Document Pane */}
      <Card className="h-96 overflow-auto">
        <CardHeader>
          <CardTitle>Original Document</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap break-words">{originalDocument}</pre>
        </CardContent>
      </Card>

      {/* Improved Document Pane */}
      <Card className="h-96 overflow-auto">
        <CardHeader>
          <CardTitle>Improved Document</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="whitespace-pre-wrap break-words" 
            dangerouslySetInnerHTML={{ __html: improvedDocument }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentViewer;


  