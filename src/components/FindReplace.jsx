import { useState } from 'react';
import { Search } from 'lucide-react';
import { findAndReplace } from '../utils/customSeparator.js';

const FindReplace = ({ text, setText }) => {
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);

  const handleReplace = () => {
    if (!find) return;
    setText(findAndReplace(text, find, replace, caseSensitive));
  };

  let matchCount = 0;
  try {
    if (find) {
      const escaped = find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      matchCount = (text.match(new RegExp(escaped, caseSensitive ? 'g' : 'gi')) || []).length;
    }
  } catch {
    matchCount = 0;
  }

  return (
    <div className="p-3 neu-inset rounded-[16px]">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
        <Search size={14} />
        Find & Replace
        {find && <span className="text-xs text-blue-500 dark:text-blue-400">{matchCount} match{matchCount !== 1 ? 'es' : ''}</span>}
      </h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={find}
          onChange={(e) => setFind(e.target.value)}
          placeholder="Find..."
          className="flex-1 px-2.5 py-1.5 text-sm neu-input text-gray-700 dark:text-gray-200"
        />
        <input
          type="text"
          value={replace}
          onChange={(e) => setReplace(e.target.value)}
          placeholder="Replace with..."
          className="flex-1 px-2.5 py-1.5 text-sm neu-input text-gray-700 dark:text-gray-200"
        />
        <label className="checkbox-container text-sm text-gray-600 dark:text-gray-400 shrink-0">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(e) => setCaseSensitive(e.target.checked)}
          />
          <svg viewBox="0 0 64 64" className="mr-1.5">
            <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className="checkbox-path"></path>
          </svg>
          Aa
        </label>
        <button
          onClick={handleReplace}
          disabled={!find}
          className="btn-action disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          style={{ color: '#3b82f6' }}
        >
          Replace All
        </button>
      </div>
    </div>
  );
};

export default FindReplace;
