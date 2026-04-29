import { useState } from 'react';
import {
  CaseSensitive, CaseLower, CaseUpper, Bold, Sparkles, ArrowUpDown,
  Dices, CamelCaseIcon, Braces, Minus, SeparatorHorizontal, Hash, Dot,
} from './CaseIconFallbacks.jsx';
import * as converters from '../utils/caseConverters.js';

const caseOptions = [
  // Standard Cases
  { id: 'sentence', label: 'Sentence Case', example: 'Hello world. How are you?', icon: CaseSensitive, color: 'blue', group: 'standard', converter: converters.sentenceCase },
  { id: 'lower', label: 'lower case', example: 'hello world', icon: CaseLower, color: 'sky', group: 'standard', converter: converters.lowerCase },
  { id: 'upper', label: 'UPPER CASE', example: 'HELLO WORLD', icon: CaseUpper, color: 'indigo', group: 'standard', converter: converters.upperCase },
  { id: 'capitalized', label: 'Capitalized Case', example: 'Hello World', icon: Bold, color: 'violet', group: 'standard', converter: converters.capitalizedCase },
  { id: 'title', label: 'Title Case', example: 'The Lord Of The Rings', icon: CaseSensitive, color: 'purple', group: 'standard', converter: converters.titleCase },
  // Fun Cases
  { id: 'alternating', label: 'aLtErNaTiNg', example: 'hElLo WoRlD', icon: ArrowUpDown, color: 'amber', group: 'fun', converter: converters.alternatingCase },
  { id: 'inverse', label: 'InVeRsE', example: 'hELLO wORLD', icon: Sparkles, color: 'rose', group: 'fun', converter: converters.inverseCase },
  { id: 'random', label: 'RaNdOm', example: 'hElLo wORLd', icon: Dices, color: 'pink', group: 'fun', converter: converters.randomCase },
  // Developer Cases
  { id: 'camel', label: 'camelCase', example: 'helloWorld', icon: CamelCaseIcon, color: 'emerald', group: 'dev', converter: converters.camelCase },
  { id: 'pascal', label: 'PascalCase', example: 'HelloWorld', icon: Braces, color: 'teal', group: 'dev', converter: converters.pascalCase },
  { id: 'snake', label: 'snake_case', example: 'hello_world', icon: Minus, color: 'cyan', group: 'dev', converter: converters.snakeCase },
  { id: 'kebab', label: 'kebab-case', example: 'hello-world', icon: SeparatorHorizontal, color: 'orange', group: 'dev', converter: converters.kebabCase },
  { id: 'constant', label: 'CONSTANT_CASE', example: 'HELLO_WORLD', icon: Hash, color: 'red', group: 'dev', converter: converters.constantCase },
  { id: 'dot', label: 'dot.case', example: 'hello.world', icon: Dot, color: 'lime', group: 'dev', converter: converters.dotCase },
  { id: 'path', label: 'path/case', example: 'hello/world', icon: SeparatorHorizontal, color: 'fuchsia', group: 'dev', converter: converters.pathCase },
];

const colorMap = {
  blue: 'from-blue-500 to-blue-600 shadow-blue-200 dark:shadow-blue-900/30',
  sky: 'from-sky-500 to-sky-600 shadow-sky-200 dark:shadow-sky-900/30',
  indigo: 'from-indigo-500 to-indigo-600 shadow-indigo-200 dark:shadow-indigo-900/30',
  violet: 'from-violet-500 to-violet-600 shadow-violet-200 dark:shadow-violet-900/30',
  purple: 'from-purple-500 to-purple-600 shadow-purple-200 dark:shadow-purple-900/30',
  amber: 'from-amber-500 to-amber-600 shadow-amber-200 dark:shadow-amber-900/30',
  rose: 'from-rose-500 to-rose-600 shadow-rose-200 dark:shadow-rose-900/30',
  pink: 'from-pink-500 to-pink-600 shadow-pink-200 dark:shadow-pink-900/30',
  emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-200 dark:shadow-emerald-900/30',
  teal: 'from-teal-500 to-teal-600 shadow-teal-200 dark:shadow-teal-900/30',
  cyan: 'from-cyan-500 to-cyan-600 shadow-cyan-200 dark:shadow-cyan-900/30',
  orange: 'from-orange-500 to-orange-600 shadow-orange-200 dark:shadow-orange-900/30',
  red: 'from-red-500 to-red-600 shadow-red-200 dark:shadow-red-900/30',
  lime: 'from-lime-500 to-lime-600 shadow-lime-200 dark:shadow-lime-900/30',
  fuchsia: 'from-fuchsia-500 to-fuchsia-600 shadow-fuchsia-200 dark:shadow-fuchsia-900/30',
};

const groupLabels = {
  standard: 'Standard',
  fun: 'Fun & Creative',
  dev: 'Developer',
};

const CaseButtons = ({ text, setText, onConvert }) => {
  const [activeGroup, setActiveGroup] = useState('all');

  const handleConvert = (converter, label) => {
    setText(converter(text));
    onConvert?.(label);
  };

  const groups = ['all', 'standard', 'fun', 'dev'];
  const filtered = activeGroup === 'all' ? caseOptions : caseOptions.filter(c => c.group === activeGroup);

  return (
    <div className="panel">
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-3">Case Converters</h2>

      {/* Group Tabs */}
      <div className="flex gap-0.5 mb-4 neu-tab-bar">
        {groups.map(g => (
          <button
            key={g}
            onClick={() => setActiveGroup(g)}
            className={`flex-1 px-3 py-2 text-xs font-semibold tracking-wide rounded-lg transition-all duration-200 ${
              activeGroup === g
                ? 'neu-tab-active text-gray-700 dark:text-gray-100'
                : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            {g === 'all' ? 'All' : groupLabels[g]}
          </button>
        ))}
      </div>

      {/* Case Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {filtered.map(({ id, label, example, icon: Icon, color, converter }) => (
          <button
            key={id}
            onClick={(e) => {
              // Ripple effect
              const btn = e.currentTarget;
              const rect = btn.getBoundingClientRect();
              const dot = document.createElement('span');
              const size = Math.max(rect.width, rect.height);
              dot.className = 'ripple-dot';
              dot.style.width = dot.style.height = `${size}px`;
              dot.style.left = `${e.clientX - rect.left - size / 2}px`;
              dot.style.top = `${e.clientY - rect.top - size / 2}px`;
              btn.appendChild(dot);
              setTimeout(() => dot.remove(), 600);
              handleConvert(converter, label);
            }}
            className="group relative flex items-center gap-3 p-3 neu-card text-left ripple-container shimmer-hover"
            style={{ overflow: 'hidden' }}
          >
            {/* Icon Badge */}
            <div className={`flex items-center justify-center w-9 h-9 rounded-lg bg-linear-to-br ${colorMap[color]} text-white shadow-sm shrink-0`}>
              <Icon size={18} />
            </div>

            {/* Label + Example */}
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {label}
              </div>
              <div className="text-xs text-gray-400 dark:text-gray-500 truncate font-mono break-all">
                {example}
              </div>
            </div>

            {/* Arrow indicator */}
            <div className="text-gray-300 dark:text-gray-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CaseButtons;

