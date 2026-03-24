export const analyzeScope = (text) => {
  const lowerText = text.toLowerCase();
  const summary = {
    painting: lowerText.includes('paint') || lowerText.includes('painting') || lowerText.includes('pintura'),
    demolition: lowerText.includes('demo') || lowerText.includes('demolition') || lowerText.includes('demolicao'),
    cleaning: lowerText.includes('clean') || lowerText.includes('cleaning') || lowerText.includes('limpeza'),
    cleaningDetails: {
      rough: lowerText.includes('rough') || lowerText.includes('initial'),
      final: lowerText.includes('final clean') || lowerText.includes('deep clean'),
      windows: lowerText.includes('window') || lowerText.includes('glass'),
      debris: lowerText.includes('debris') || lowerText.includes('trash')
    },
    sqft: extractSqFt(text),
    rooms: extractRooms(text)
  };
  return summary;
};

const extractSqFt = (text) => {
  const match = text.match(/(\d{1,3}(,\d{3})*(\.\d+)?)[\s]*sq[\s]*ft/i);
  return match ? match[1] : null;
};

const extractRooms = (text) => {
  const rooms = [];
  if (text.match(/bedroom/i)) rooms.push('Bedroom');
  if (text.match(/bathroom/i)) rooms.push('Bathroom');
  if (text.match(/kitchen/i)) rooms.push('Kitchen');
  return rooms;
};
