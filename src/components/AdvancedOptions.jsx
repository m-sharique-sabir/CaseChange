import { useState } from 'react';
import { ChevronDown, ChevronUp, Wand2, Trash2, ArrowLeftRight, Shuffle, ArrowDownAZ, ArrowUpZA, List, CopyPlus, Lock, Unlock, Link, Mail, Link2, WrapText } from 'lucide-react';
import CustomSeparator from './CustomSeparator.jsx';
import FindReplace from './FindReplace.jsx';
import {
  removeExtraSpaces,
  removeEmptyLines,
  reverseText,
  shuffleLines,
  filterWordsByLength,
  sortLines,
  sortLinesDesc,
  numberLines,
  removeDuplicateLines,
  base64Encode,
  base64Decode,
  urlEncode,
  urlDecode,
  extractUrls,
  extractEmails,
  slugify,
  wrapText,
} from '../utils/customSeparator.js';

const AdvancedOptions = ({ text, setText }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [minLength, setMinLength] = useState(3);

  const toggleSection = () => setIsOpen(!isOpen);

  const act = (fn) => () => setText(fn(text));

  const textOptions = [
    { id: 'spaces', label: 'Remove Extra Spaces', icon: Wand2, action: act(removeExtraSpaces) },
    { id: 'empty', label: 'Remove Empty Lines', icon: Trash2, action: act(removeEmptyLines) },
    { id: 'reverse', label: 'Reverse Text', icon: ArrowLeftRight, action: act(reverseText) },
    { id: 'shuffle', label: 'Shuffle Lines', icon: Shuffle, action: act(shuffleLines) },
  ];

  const lineOptions = [
    { id: 'sortAsc', label: 'Sort A→Z', icon: ArrowDownAZ, action: act(sortLines) },
    { id: 'sortDesc', label: 'Sort Z→A', icon: ArrowUpZA, action: act(sortLinesDesc) },
    { id: 'number', label: 'Number Lines', icon: List, action: act(numberLines) },
    { id: 'dedup', label: 'Remove Duplicates', icon: CopyPlus, action: act(removeDuplicateLines) },
  ];

  const encodeOptions = [
    { id: 'b64enc', label: 'Base64 Encode', icon: Lock, action: act(base64Encode) },
    { id: 'b64dec', label: 'Base64 Decode', icon: Unlock, action: act(base64Decode) },
    { id: 'urlenc', label: 'URL Encode', icon: Link, action: act(urlEncode) },
    { id: 'urldec', label: 'URL Decode', icon: Link2, action: act(urlDecode) },
  ];

  const extractOptions = [
    { id: 'urls', label: 'Extract URLs', icon: Link, action: act(extractUrls) },
    { id: 'emails', label: 'Extract Emails', icon: Mail, action: act(extractEmails) },
    { id: 'slug', label: 'Slugify', icon: Link2, action: act(slugify) },
    { id: 'wrap', label: 'Wrap Text (80ch)', icon: WrapText, action: act(wrapText) },
  ];

  const OptionGroup = ({ title, options, color = 'purple' }) => (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">{title}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map(({ id, label, icon: Icon, action }) => {
          const disabled = !text.trim();
          const colorClass = color === 'purple' ? 'text-purple-600 dark:text-purple-400'
            : color === 'blue' ? 'text-blue-600 dark:text-blue-400'
            : color === 'green' ? 'text-green-600 dark:text-green-400'
            : 'text-amber-600 dark:text-amber-400';
          return (
            <button
              key={id}
              onClick={disabled ? undefined : action}
              disabled={disabled}
              title={disabled ? 'Enter text first' : label}
              className={`neu-btn-sm disabled:opacity-40 disabled:cursor-not-allowed ${colorClass}`}
            >
              <Icon size={16} />
              <span className="truncate">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="panel overflow-hidden">
      <button
        onClick={toggleSection}
        className="w-full flex items-center justify-between p-4 transition-colors rounded-[16px]"
      >
        <div className="flex items-center gap-2">
          <Wand2 size={20} className="text-purple-500 dark:text-purple-400" />
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Advanced Options</h2>
        </div>
        {isOpen ? (
          <ChevronUp size={20} className="text-gray-400 dark:text-gray-500" />
        ) : (
          <ChevronDown size={20} className="text-gray-400 dark:text-gray-500" />
        )}
      </button>
      
      {isOpen && (
        <div className="p-4 pt-0 space-y-4">
          {/* Text Cleanup */}
          <div className="mt-3">
            <OptionGroup title="Text Cleanup" options={textOptions} color="purple" />
          </div>

          {/* Line Operations */}
          <OptionGroup title="Line Operations" options={lineOptions} color="blue" />

          {/* Encode / Decode */}
          <OptionGroup title="Encode / Decode" options={encodeOptions} color="green" />

          {/* Extract & Transform */}
          <OptionGroup title="Extract & Transform" options={extractOptions} color="amber" />

          {/* Word Filter */}
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center p-3 neu-inset rounded-[16px]">
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200">
              <Wand2 size={14} />
              <span>Filter words longer than</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={minLength}
                onChange={(e) => setMinLength(e.target.value)}
                className="w-16 px-2 py-1.5 text-sm neu-input text-gray-700 dark:text-gray-200"
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">chars</span>
              <button
                onClick={() => setText(filterWordsByLength(text, parseInt(minLength) || 1))}
                disabled={!text.trim()}
                className="btn-action disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ color: '#a855f7' }}
              >
                Apply
              </button>
            </div>
          </div>
          
          <FindReplace text={text} setText={setText} />
          <CustomSeparator text={text} setText={setText} />
        </div>
      )}
    </div>
  );
};

export default AdvancedOptions;
