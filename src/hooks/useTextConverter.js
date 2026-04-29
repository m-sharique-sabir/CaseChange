import { useReducer, useCallback } from 'react';

const STORAGE_KEY = 'casechange-text';
const MAX_HISTORY = 50;
const MAX_INPUT_SIZE = 1_000_000; // 1MB limit to prevent freeze

const loadSavedText = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || '';
  } catch {
    return '';
  }
};

const savedText = loadSavedText();

const initialState = {
  text: savedText,
  history: [savedText],
  historyIndex: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      const payload = typeof action.payload === 'string' && action.payload.length > MAX_INPUT_SIZE
        ? action.payload.slice(0, MAX_INPUT_SIZE)
        : action.payload;
      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(payload);
      if (newHistory.length > MAX_HISTORY) newHistory.shift();
      try {
        localStorage.setItem(STORAGE_KEY, payload);
      } catch { /* quota exceeded — ignore */ }
      return {
        text: payload,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    case 'UNDO':
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        const prev = state.history[newIndex];
        try { localStorage.setItem(STORAGE_KEY, prev); } catch { /* ignore */ }
        return { ...state, text: prev, historyIndex: newIndex };
      }
      return state;
    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        const next = state.history[newIndex];
        try { localStorage.setItem(STORAGE_KEY, next); } catch { /* ignore */ }
        return { ...state, text: next, historyIndex: newIndex };
      }
      return state;
    case 'CLEAR':
      const empty = '';
      try { localStorage.setItem(STORAGE_KEY, empty); } catch { /* ignore */ }
      return {
        text: empty,
        history: [empty],
        historyIndex: 0,
      };
    default:
      return state;
  }
};

export const useTextConverter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setText = useCallback((newText) => {
    dispatch({ type: 'SET_TEXT', payload: newText });
  }, []);

  const undo = useCallback(() => dispatch({ type: 'UNDO' }), []);
  const redo = useCallback(() => dispatch({ type: 'REDO' }), []);
  const clearText = useCallback(() => dispatch({ type: 'CLEAR' }), []);

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  const copyToClipboard = useCallback(async () => {
    if (!state.text) return false;
    try {
      await navigator.clipboard.writeText(state.text);
      return true;
    } catch (err) {
      console.error('Failed to copy:', err);
      return false;
    }
  }, [state.text]);

  const downloadAsText = useCallback(() => {
    if (!state.text) return;
    const blob = new Blob([state.text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `converted-text-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state.text]);

  return {
    text: state.text,
    setText,
    clearText,
    copyToClipboard,
    downloadAsText,
    undo,
    redo,
    canUndo,
    canRedo,
    isOverLimit: state.text.length >= MAX_INPUT_SIZE,
  };
};

export default useTextConverter;
