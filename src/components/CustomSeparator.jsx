import { useState } from 'react';
import { Replace } from 'lucide-react';

const CustomSeparator = ({ text, setText }) => {
  const [separator, setSeparator] = useState('-');
  const [affectNewlines, setAffectNewlines] = useState(false);

  const handleReplace = () => {
    if (!separator) return;
    const pattern = affectNewlines ? /\s+/g : / +/g;
    setText(text.replace(pattern, separator));
  };

  return (
    <div className="p-3 neu-inset rounded-[16px]">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
        <Replace size={14} />
        Custom Separator
      </h3>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex items-center gap-2 flex-1">
          <input
            type="text"
            value={separator}
            onChange={(e) => setSeparator(e.target.value)}
            placeholder="e.g. -, _, ~"
            className="w-24 px-2 py-1.5 text-sm neu-input text-gray-700 dark:text-gray-200"
          />
          <button
            onClick={handleReplace}
            disabled={!text.trim()}
            className="btn-action disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: '#3b82f6' }}
          >
            Replace Spaces
          </button>
        </div>
        <label className="checkbox-container text-sm text-gray-600 dark:text-gray-400">
          <input
            type="checkbox"
            checked={affectNewlines}
            onChange={(e) => setAffectNewlines(e.target.checked)}
          />
          <svg viewBox="0 0 64 64" className="mr-2">
            <path d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16" pathLength="575.0541381835938" className="checkbox-path"></path>
          </svg>
          Include newlines
        </label>
      </div>
    </div>
  );
};

export default CustomSeparator;
