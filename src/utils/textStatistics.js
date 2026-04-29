export const getStats = (text) => {
  const trimmed = text.trim();
  const wordCount = trimmed ? trimmed.split(/\s+/).length : 0;
  const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length : 0;
  const paragraphs = trimmed ? text.split(/\n\s*\n/).filter(p => p.trim()).length : 0;
  const letterMatches = text.match(/[A-Za-z]/g) || [];
  const numberMatches = text.match(/[0-9]/g) || [];
  const specialMatches = text.match(/[^A-Za-z0-9\s]/g) || [];
  
  const words = trimmed ? trimmed.toLowerCase().split(/\s+/) : [];
  const wordFreq = {};
  words.forEach(word => {
    const cleanWord = word.replace(/[^a-z0-9]/g, '');
    if (cleanWord.length > 0) {
      wordFreq[cleanWord] = (wordFreq[cleanWord] || 0) + 1;
    }
  });
  
  let mostFrequent = '';
  let maxFreq = 0;
  Object.entries(wordFreq).forEach(([word, freq]) => {
    if (freq > maxFreq) {
      maxFreq = freq;
      mostFrequent = word;
    }
  });
  
  let longestWord = '';
  words.forEach(word => {
    const cleanWord = word.replace(/[^a-z0-9]/g, '');
    if (cleanWord.length > longestWord.length) {
      longestWord = cleanWord;
    }
  });
  
  const uniqueWords = Object.keys(wordFreq).length;
  
  return {
    charCount: text.length,
    charNoSpace: text.replace(/\s/g, '').length,
    wordCount,
    sentenceCount: sentences,
    lineCount: text ? text.split(/\r?\n/).length : 0,
    paragraphCount: paragraphs || (trimmed ? 1 : 0),
    readingTime: wordCount > 0 ? Math.max(1, Math.ceil(wordCount / 200)) : 0,
    letterCount: letterMatches.length,
    numberCount: numberMatches.length,
    specialCharCount: specialMatches.length,
    mostFrequentWord: mostFrequent || '-',
    longestWord: longestWord || '-',
    uniqueWords,
  };
};
