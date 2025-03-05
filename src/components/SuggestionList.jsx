import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDocumentContext } from '@/context/DocumentContext';
import { applyMockImprovements } from '@/utils/suggestionGenerator';

const SuggestionList = () => {
  const { 
    suggestions, 
    setSuggestions, 
    originalDocument, 
    setImprovedDocument 
  } = useDocumentContext();

  // Suggestion acceptance
  const handleAcceptSuggestion = (suggestionId) => {
    const updatedSuggestions = suggestions.filter(s => s.id !== suggestionId);
    setSuggestions(updatedSuggestions);

    const improvedTextWithHighlights = applyMockImprovements(
      originalDocument, 
      updatedSuggestions
    );
    setImprovedDocument(improvedTextWithHighlights);
  };

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Suggestions</h3>
      {suggestions.map(suggestion => (
        <Card key={suggestion.id} className="mb-2">
          <CardContent className="flex justify-between items-center p-4">
            <div>
              <p><strong>Type:</strong> {suggestion.type}</p>
              <p>
                <span className="mr-2 p-1 rounded bg-gray-100">Original</span>
                {suggestion.original}
                <br />
                <span className="mr-2 p-1 rounded bg-green-100">Suggestion</span>
                {suggestion.suggestion}
              </p>
            </div>
            <Button 
              onClick={() => handleAcceptSuggestion(suggestion.id)}
              variant="outline"
            >
              Accept
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SuggestionList;
  