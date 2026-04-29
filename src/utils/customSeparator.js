export const replaceSpacesWith = (text, separator, affectNewlines = false) => {
  if (!text || !separator) return text;
  const pattern = affectNewlines ? /\s+/g : / +/g;
  return text.replace(pattern, separator);
};

export const removeExtraSpaces = (text) => {
  if (!text) return '';
  return text.trim().replace(/\s+/g, ' ');
};

export const removeEmptyLines = (text) => {
  if (!text) return '';
  return text.split(/\r?\n/).filter(line => line.trim()).join('\n');
};

export const reverseText = (text) => {
  if (!text) return '';
  return text.split('').reverse().join('');
};

export const shuffleLines = (text) => {
  if (!text) return '';
  const lines = text.split(/\r?\n/);
  for (let i = lines.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lines[i], lines[j]] = [lines[j], lines[i]];
  }
  return lines.join('\n');
};

export const filterWordsByLength = (text, minLength) => {
  if (!text || minLength < 1) return text;
  const words = text.split(/(\s+)/);
  return words.filter((word, index) => {
    if (index % 2 === 1) return true;
    return word.replace(/[^a-zA-Z0-9]/g, '').length >= minLength;
  }).join('');
};

export const sortLines = (text, descending = false) => {
  if (!text) return '';
  const lines = text.split(/\r?\n/);
  lines.sort((a, b) => descending ? b.localeCompare(a) : a.localeCompare(b));
  return lines.join('\n');
};

export const sortLinesDesc = (text) => sortLines(text, true);

export const numberLines = (text, startAt = 1) => {
  if (!text) return '';
  return text.split(/\r?\n/).map((line, i) => `${i + startAt}. ${line}`).join('\n');
};

export const removeDuplicateLines = (text) => {
  if (!text) return '';
  const seen = new Set();
  return text.split(/\r?\n/).filter(line => {
    if (seen.has(line)) return false;
    seen.add(line);
    return true;
  }).join('\n');
};

export const base64Encode = (text) => {
  if (!text) return '';
  try {
    return btoa(unescape(encodeURIComponent(text)));
  } catch {
    return text;
  }
};

export const base64Decode = (text) => {
  if (!text) return '';
  try {
    return decodeURIComponent(escape(atob(text.trim())));
  } catch {
    return '[Invalid Base64 — cannot decode]';
  }
};

export const urlEncode = (text) => {
  if (!text) return '';
  return encodeURIComponent(text);
};

export const urlDecode = (text) => {
  if (!text) return '';
  try {
    return decodeURIComponent(text);
  } catch {
    return '[Invalid URL encoding — cannot decode]';
  }
};

export const findAndReplace = (text, find, replace, caseSensitive = false) => {
  if (!text || !find) return text;
  const flags = caseSensitive ? 'g' : 'gi';
  const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const safeReplace = replace.replace(/\$/g, '$$$$');
  return text.replace(new RegExp(escaped, flags), safeReplace);
};

export const extractUrls = (text) => {
  if (!text) return '';
  const urls = text.match(/https?:\/\/[^\s<>"{}|\\^`[\]]+/g) || [];
  return urls.join('\n');
};

export const extractEmails = (text) => {
  if (!text) return '';
  const emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  return emails.join('\n');
};

export const slugify = (text) => {
  if (!text) return '';
  return text.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const wrapText = (text, width = 80) => {
  if (!text) return '';
  return text.split(/\r?\n/).map(line => {
    if (line.length <= width) return line;
    const result = [];
    while (line.length > width) {
      let breakAt = line.lastIndexOf(' ', width);
      if (breakAt === -1) breakAt = width;
      result.push(line.slice(0, breakAt));
      line = line.slice(breakAt).trimStart();
    }
    result.push(line);
    return result.join('\n');
  }).join('\n');
};

export const countWordFrequency = (text) => {
  if (!text) return {};
  const words = text.toLowerCase().match(/[a-z0-9]+/g) || [];
  const freq = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });
  return freq;
};
