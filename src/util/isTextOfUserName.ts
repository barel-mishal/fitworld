export function sanitizeString(inputString: string): string {
    // Define the regex pattern to match invalid characters
    const invalidPattern = /[^a-zA-Z0-9_-]/g;
    
    // Replace invalid characters with '-'
    const sanitizedString = inputString.replace(invalidPattern, '-');
    
    return sanitizedString;
  }