// Generate mock suggestions
export const generateMockSuggestions = (text) => {
    return [
      { 
        id: 1, 
        type: 'grammar', 
        original: 'Their are many ways to improve writing', 
        suggestion: 'There are many ways to improve writing',
        color: 'bg-blue-100 text-blue-800 p-1 rounded'
      },
      { 
        id: 2, 
        type: 'clarity', 
        original: 'The results was good', 
        suggestion: 'The results were good',
        color: 'bg-green-100 text-green-800 p-1 rounded'
      },
      { 
        id: 3, 
        type: 'vocabulary', 
        original: 'The document is nice', 
        suggestion: 'The document is excellent',
        color: 'bg-purple-100 text-purple-800 p-1 rounded'
      }
    ];
  };
  
  // Apply improvements to the text
  export const applyMockImprovements = (text, suggestions) => {
    let improvedText = text;
  
    const sortedSuggestions = suggestions.sort((a, b) => b.original.length - a.original.length);
  
    sortedSuggestions.forEach(suggestion => {
      const regex = new RegExp(`(${suggestion.original})`, 'g');
      improvedText = improvedText.replace(regex, (match) => 
        `<span class="${suggestion.color}" title="${suggestion.type} improvement">${suggestion.suggestion}</span>`
      );
    });
  
    return improvedText;
  };