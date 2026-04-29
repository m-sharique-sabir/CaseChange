import { useState, useCallback } from 'react';
import { Type, Moon, Sun } from 'lucide-react';
import TextInput from './components/TextInput.jsx';
import CaseButtons from './components/CaseButtons.jsx';
import StatsPanel from './components/StatsPanel.jsx';
import AdvancedOptions from './components/AdvancedOptions.jsx';
import HeroBanner from './components/HeroBanner.jsx';
import ProfessionalFooter from './components/ProfessionalFooter.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import { ToastProvider, useToast } from './components/ToastContainer.jsx';
import useTextConverter from './hooks/useTextConverter.js';
import { useScrollReveal, revealClass } from './hooks/useScrollReveal.js';

function AppContent() {
  const { text, setText, copyToClipboard, downloadAsText, undo, redo, canUndo, canRedo, isOverLimit } = useTextConverter('');
  const [copySuccess, setCopySuccess] = useState(false);
  const { success, error, info } = useToast();

  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('casechange-dark');
      if (saved !== null) {
        const dark = saved === 'true';
        if (dark) document.documentElement.classList.add('dark');
        return dark;
      }
    } catch { /* ignore */ }
    return false;
  });

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard();
    if (ok) {
      setCopySuccess(true);
      success('Copied to clipboard!');
      setTimeout(() => setCopySuccess(false), 2000);
    } else {
      error('Failed to copy — try selecting manually');
    }
  }, [copyToClipboard, success, error]);

  const handleDownload = useCallback(() => {
    downloadAsText();
    success('Text file downloaded!');
  }, [downloadAsText, success]);

  const handleClear = useCallback(() => {
    if (!text.trim()) return;
    setText('');
    info('Text cleared — use Undo to restore');
  }, [text, setText, info]);

  const handleConvert = useCallback((label) => {
    if (!text.trim()) {
      error('Enter text first, then convert');
      return;
    }
    success(`Converted to ${label}`);
  }, [text, success, error]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle('dark');
    try { localStorage.setItem('casechange-dark', String(next)); } catch { /* ignore */ }
  };

  const [bannerRef, bannerVisible] = useScrollReveal({ delay: 100 });
  const [inputRef, inputVisible] = useScrollReveal({ delay: 250 });
  const [utilRef, utilVisible] = useScrollReveal({ delay: 400 });
  const [advRef, advVisible] = useScrollReveal({ delay: 100 });
  const [footerRef, footerVisible] = useScrollReveal({ delay: 100 });

  return (
    <div className="neu-root min-h-screen transition-colors">
      <CustomCursor />

      {/* Navbar */}
      <nav className="neu-nav sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg neu-card">
                <Type size={22} className="text-blue-500 dark:text-blue-400" />
              </div>
              <h1 className="text-xl font-bold text-gray-700 dark:text-gray-100 tracking-tight">CaseChange</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="btn-action"
              >
                {isDark ? (
                  <Sun size={18} className="text-yellow-500" />
                ) : (
                  <Moon size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Hero Banner */}
        <div ref={bannerRef} className={revealClass(bannerVisible, 'down')}>
          <HeroBanner />
        </div>

        {/* Hero: Text Input (full width) */}
        <div ref={inputRef} className={revealClass(inputVisible, 'up')}>
        <TextInput
          text={text}
          setText={setText}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onClear={handleClear}
          copySuccess={copySuccess}
          undo={undo}
          redo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          isOverLimit={isOverLimit}
        />
        </div>

        {/* Utility Row: Case Converters + Statistics side-by-side */}
        <div ref={utilRef} className={revealClass(utilVisible, 'up')}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CaseButtons text={text} setText={setText} onConvert={handleConvert} />
            <StatsPanel text={text} />
          </div>
        </div>

        {/* Advanced Options */}
        <div ref={advRef} className={revealClass(advVisible, 'scale')}>
          <AdvancedOptions text={text} setText={setText} />
        </div>
      </main>

      {/* Professional Footer */}
      <div ref={footerRef} className={revealClass(footerVisible, 'up')}>
        <ProfessionalFooter />
      </div>
    </div>
  );
}

function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}

export default App;
