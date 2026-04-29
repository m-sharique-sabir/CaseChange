import { useMemo } from 'react';
import { Eraser, Copy, Download, Undo2, Redo2, FileText, AlertTriangle } from 'lucide-react';

const sampleText = `The quick brown fox jumps over the lazy dog. This sentence contains every letter of the English alphabet at least once — making it a perfect pangram for testing text transformations!

Try converting this text using the case converters below. You can also use advanced options like Find & Replace, Sort Lines, or Encode/Decode.`;

const TextInput = ({ text, setText, onCopy, onDownload, onClear, copySuccess, undo, redo, canUndo, canRedo, isOverLimit }) => {
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo?.();
    }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
      e.preventDefault();
      redo?.();
    }
  };

  const hasText = text.trim().length > 0;
  const wordCount = useMemo(() => text.trim() ? text.trim().split(/\s+/).length : 0, [text]);
  const charCount = text.length;
  const lineCount = useMemo(() => text ? text.split(/\r?\n/).length : 0, [text]);
  
  return (
    <div className="panel">
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Text Input</h2>
        <div className="flex gap-1.5 flex-wrap">
          <button
            onClick={() => setText(sampleText)}
            disabled={hasText}
            className="btn-action disabled:opacity-40 disabled:cursor-not-allowed"
            title={hasText ? 'Clear text first to load sample' : 'Load sample text'}
          >
            <FileText size={16} />
            <span className="hidden sm:inline">Sample</span>
          </button>
          <button
            onClick={undo}
            disabled={!canUndo}
            className="btn-action disabled:opacity-40 disabled:cursor-not-allowed"
            title={canUndo ? 'Undo (Ctrl+Z)' : 'Nothing to undo'}
          >
            <Undo2 size={16} />
            <span className="hidden sm:inline">Undo</span>
          </button>
          <button
            onClick={redo}
            disabled={!canRedo}
            className="btn-action disabled:opacity-40 disabled:cursor-not-allowed"
            title={canRedo ? 'Redo (Ctrl+Y)' : 'Nothing to redo'}
          >
            <Redo2 size={16} />
            <span className="hidden sm:inline">Redo</span>
          </button>
          <button
            onClick={onClear}
            disabled={!hasText}
            className="btn-action disabled:opacity-40 disabled:cursor-not-allowed"
            title={hasText ? 'Clear all text' : 'Nothing to clear'}
          >
            <Eraser size={16} />
            Clear
          </button>
          <button
            onClick={onCopy}
            disabled={!hasText}
            className="btn-action disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: '#3b82f6' }}
            title={hasText ? 'Copy to clipboard' : 'Enter text to copy'}
          >
            <Copy size={16} />
            {copySuccess ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={onDownload}
            disabled={!hasText}
            className="btn-action disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ color: '#22c55e' }}
            title={hasText ? 'Download as .txt' : 'Enter text to download'}
          >
            <Download size={16} />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type or paste your text here..."
        className="w-full h-64 lg:h-80 p-4 neu-inset resize-none text-gray-700 dark:text-gray-100 text-base leading-relaxed"
        style={{ overflowWrap: 'break-word', wordBreak: 'normal' }}
      />
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
        <span>{wordCount} word{wordCount !== 1 ? 's' : ''} · {charCount.toLocaleString()} character{charCount !== 1 ? 's' : ''}</span>
        <span>{lineCount} line{lineCount !== 1 ? 's' : ''}</span>
      </div>
      {isOverLimit && (
        <div className="flex items-center gap-2 mt-2 px-3 py-2 neu-inset rounded-lg text-xs text-amber-700 dark:text-amber-300">
          <AlertTriangle size={14} className="shrink-0" />
          <span>Text truncated at 1M characters to prevent browser freeze.</span>
        </div>
      )}
    </div>
  );
};

export default TextInput;
