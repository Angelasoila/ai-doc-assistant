import * as mammoth from 'mammoth';

// File type to parser mapping
export const FILE_PARSERS = {
  'text/plain': async (file) => {
    return await file.text();
  },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value;
  }
};

// Function to parse document
export const parseDocument = async (file) => {
  const parser = FILE_PARSERS[file.type];
  
  if (!parser) {
    throw new Error(`Unsupported file type: ${file.type}`);
  }

  return await parser(file);
};