export const sentenceCase = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (match) => match.toUpperCase());
};

export const lowerCase = (str) => {
  return str ? str.toLowerCase() : '';
};

export const upperCase = (str) => {
  return str ? str.toUpperCase() : '';
};

export const capitalizedCase = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
};

export const alternatingCase = (str) => {
  if (!str) return '';
  let result = '';
  let upper = false;
  for (let i = 0; i < str.length; i++) {
    if (/[a-zA-Z]/.test(str[i])) {
      result += upper ? str[i].toUpperCase() : str[i].toLowerCase();
      upper = !upper;
    } else {
      result += str[i];
    }
  }
  return result;
};

export const titleCase = (str) => {
  if (!str) return '';
  const minorWords = ['a', 'an', 'the', 'and', 'but', 'or', 'for', 'nor', 'on', 'at', 'to', 'from', 'by', 'in', 'of'];
  return str.toLowerCase().split(/\s+/).map((word, index) => {
    if (index === 0 || !minorWords.includes(word)) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  }).join(' ');
};

export const inverseCase = (str) => {
  if (!str) return '';
  return str.split('').map(char => {
    if (/[a-z]/.test(char)) return char.toUpperCase();
    if (/[A-Z]/.test(char)) return char.toLowerCase();
    return char;
  }).join('');
};

export const randomCase = (str) => {
  if (!str) return '';
  return str.split('').map(char => {
    if (/[a-zA-Z]/.test(char)) {
      return Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase();
    }
    return char;
  }).join('');
};

export const camelCase = (str) => {
  if (!str) return '';
  const words = str.toLowerCase().match(/[a-z0-9]+/g) || [];
  if (words.length === 0) return '';
  return words[0] + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
};

export const pascalCase = (str) => {
  if (!str) return '';
  const words = str.toLowerCase().match(/[a-z0-9]+/g) || [];
  return words.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
};

export const snakeCase = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
};

export const kebabCase = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};

export const constantCase = (str) => {
  if (!str) return '';
  return str.toUpperCase().replace(/[^A-Z0-9]+/g, '_').replace(/^_+|_+$/g, '');
};

export const dotCase = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '');
};

export const pathCase = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '/').replace(/^\/+|\/+$/g, '');
};
