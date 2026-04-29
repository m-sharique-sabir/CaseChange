import { useMemo } from 'react';
import { FileJson, TextCursorInput, Hash, MessageSquare, AlignLeft, BookOpen, Clock, LetterText, Calculator, Sparkles, Trophy, Ruler } from 'lucide-react';
import { getStats } from '../utils/textStatistics.js';

const exportStatsAsJson = (stats) => {
  const blob = new Blob([JSON.stringify(stats, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `text-stats-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const statConfig = [
  { key: 'charCount', label: 'Characters', icon: TextCursorInput, color: 'blue', subKey: 'charNoSpace', subLabel: 'no space' },
  { key: 'wordCount', label: 'Words', icon: Hash, color: 'emerald' },
  { key: 'sentenceCount', label: 'Sentences', icon: MessageSquare, color: 'violet' },
  { key: 'lineCount', label: 'Lines', icon: AlignLeft, color: 'sky' },
  { key: 'paragraphCount', label: 'Paragraphs', icon: BookOpen, color: 'amber' },
  { key: 'readingTime', label: 'Read Time', icon: Clock, color: 'rose', format: (v) => `<${v} min` },
  { key: 'letterCount', label: 'Letters', icon: LetterText, color: 'indigo' },
  { key: 'numberCount', label: 'Numbers', icon: Calculator, color: 'orange' },
  { key: 'specialCharCount', label: 'Special', icon: Sparkles, color: 'pink' },
  { key: 'mostFrequentWord', label: 'Top Word', icon: Trophy, color: 'yellow' },
  { key: 'longestWord', label: 'Longest', icon: Ruler, color: 'cyan', subKey: 'longestWordLen', subLabel: 'ch' },
  { key: 'uniqueWords', label: 'Unique', icon: Sparkles, color: 'teal' },
];

const colorStyles = {
  blue:    { bg: 'hover:bg-blue-50 dark:hover:bg-blue-950/40', border: 'hover:border-blue-300 dark:hover:border-blue-700', icon: 'text-blue-500 dark:text-blue-400', ring: 'group-hover:ring-blue-200 dark:group-hover:ring-blue-800' },
  emerald: { bg: 'hover:bg-emerald-50 dark:hover:bg-emerald-950/40', border: 'hover:border-emerald-300 dark:hover:border-emerald-700', icon: 'text-emerald-500 dark:text-emerald-400', ring: 'group-hover:ring-emerald-200 dark:group-hover:ring-emerald-800' },
  violet:  { bg: 'hover:bg-violet-50 dark:hover:bg-violet-950/40', border: 'hover:border-violet-300 dark:hover:border-violet-700', icon: 'text-violet-500 dark:text-violet-400', ring: 'group-hover:ring-violet-200 dark:group-hover:ring-violet-800' },
  sky:     { bg: 'hover:bg-sky-50 dark:hover:bg-sky-950/40', border: 'hover:border-sky-300 dark:hover:border-sky-700', icon: 'text-sky-500 dark:text-sky-400', ring: 'group-hover:ring-sky-200 dark:group-hover:ring-sky-800' },
  amber:   { bg: 'hover:bg-amber-50 dark:hover:bg-amber-950/40', border: 'hover:border-amber-300 dark:hover:border-amber-700', icon: 'text-amber-500 dark:text-amber-400', ring: 'group-hover:ring-amber-200 dark:group-hover:ring-amber-800' },
  rose:    { bg: 'hover:bg-rose-50 dark:hover:bg-rose-950/40', border: 'hover:border-rose-300 dark:hover:border-rose-700', icon: 'text-rose-500 dark:text-rose-400', ring: 'group-hover:ring-rose-200 dark:group-hover:ring-rose-800' },
  indigo:  { bg: 'hover:bg-indigo-50 dark:hover:bg-indigo-950/40', border: 'hover:border-indigo-300 dark:hover:border-indigo-700', icon: 'text-indigo-500 dark:text-indigo-400', ring: 'group-hover:ring-indigo-200 dark:group-hover:ring-indigo-800' },
  orange:  { bg: 'hover:bg-orange-50 dark:hover:bg-orange-950/40', border: 'hover:border-orange-300 dark:hover:border-orange-700', icon: 'text-orange-500 dark:text-orange-400', ring: 'group-hover:ring-orange-200 dark:group-hover:ring-orange-800' },
  pink:    { bg: 'hover:bg-pink-50 dark:hover:bg-pink-950/40', border: 'hover:border-pink-300 dark:hover:border-pink-700', icon: 'text-pink-500 dark:text-pink-400', ring: 'group-hover:ring-pink-200 dark:group-hover:ring-pink-800' },
  yellow:  { bg: 'hover:bg-yellow-50 dark:hover:bg-yellow-950/40', border: 'hover:border-yellow-300 dark:hover:border-yellow-700', icon: 'text-yellow-500 dark:text-yellow-400', ring: 'group-hover:ring-yellow-200 dark:group-hover:ring-yellow-800' },
  cyan:    { bg: 'hover:bg-cyan-50 dark:hover:bg-cyan-950/40', border: 'hover:border-cyan-300 dark:hover:border-cyan-700', icon: 'text-cyan-500 dark:text-cyan-400', ring: 'group-hover:ring-cyan-200 dark:group-hover:ring-cyan-800' },
  teal:    { bg: 'hover:bg-teal-50 dark:hover:bg-teal-950/40', border: 'hover:border-teal-300 dark:hover:border-teal-700', icon: 'text-teal-500 dark:text-teal-400', ring: 'group-hover:ring-teal-200 dark:group-hover:ring-teal-800' },
};

const StatCard = ({ icon: Icon, label, value, subValue, subLabel, color }) => {
  const s = colorStyles[color] || colorStyles.blue;
  return (
    <div className={`group p-3 neu-card shimmer-hover`}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <div className={`p-1.5 rounded-lg neu-badge ${s.icon}`}>
          <Icon size={14} />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{label}</span>
      </div>
      <div className="text-lg font-bold text-gray-700 dark:text-gray-100 overflow-hidden text-ellipsis whitespace-nowrap" title={typeof value === 'string' ? value : undefined}>
        {typeof value === 'string' && value.length > 18 ? value.slice(0, 18) + '…' : value}
      </div>
      {subValue !== undefined && subValue !== null && subValue !== '' && (
        <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
          {subValue} {subLabel}
        </div>
      )}
    </div>
  );
};

const StatsPanel = ({ text }) => {
  const stats = useMemo(() => getStats(text), [text]);
  const enrichedStats = useMemo(() => ({
    ...stats,
    longestWordLen: stats.longestWord !== '-' ? stats.longestWord.length : null,
  }), [stats]);
  const hasText = text.trim().length > 0;

  return (
    <div className="panel">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Statistics</h2>
        <button
          onClick={() => exportStatsAsJson(stats)}
          disabled={!hasText}
          className="btn-action disabled:opacity-40 disabled:cursor-not-allowed"
          title={hasText ? 'Export stats as JSON' : 'Enter text to enable export'}
        >
          <FileJson size={14} />
          Export
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {statConfig.map(({ key, label, icon, color, subKey, subLabel, format }) => {
          const rawValue = enrichedStats[key];
          const value = format ? format(rawValue) : (rawValue === '-' ? '—' : rawValue);
          const subValue = subKey ? enrichedStats[subKey] : null;
          const showSub = key === 'longestWord' ? !!subValue : (subKey === 'charNoSpace' && hasText);
          return (
            <StatCard
              key={key}
              icon={icon}
              label={label}
              value={value}
              subValue={showSub ? subValue : null}
              subLabel={subLabel}
              color={color}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StatsPanel;
