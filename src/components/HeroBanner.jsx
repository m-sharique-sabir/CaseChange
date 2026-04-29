import { Type, Sparkles } from 'lucide-react';
import { useTiltHover } from '../hooks/useTiltHover.js';
import profileImg from '../assets/m-sharique-sabir.jpeg';

const HeroBanner = () => {
  const { ref, handleMove, handleLeave } = useTiltHover(4, 1.01, true);

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative overflow-hidden rounded-[16px] neu-card"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="tilt-glare" />

      {/* Mesh gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-100/40 via-purple-50/30 to-blue-100/40 dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-blue-950/20" />
      <div className="absolute inset-0 opacity-[0.12] dark:opacity-[0.06]" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(99,102,241,0.3) 0%, transparent 50%),
                          radial-gradient(circle at 80% 20%, rgba(59,130,246,0.2) 0%, transparent 50%),
                          radial-gradient(circle at 60% 80%, rgba(139,92,246,0.2) 0%, transparent 50%)`,
      }} />

      <div className="relative flex flex-col sm:flex-row items-center gap-5 px-6 py-5 sm:px-8 sm:py-6">
        {/* Profile Picture */}
        <div className="shrink-0">
          <div className="w-16 h-20 sm:w-20 sm:h-32 rounded-md neu-inset overflow-hidden bg-linear-to-br from-blue-400 to-indigo-500">
            <img
              src={profileImg}
              alt="Mohammad Sharique Sabir"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="flex-1 text-center sm:text-left min-w-0">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <div className="p-1 rounded-md bg-blue-100 dark:bg-blue-900/40">
              <Type size={16} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-100 tracking-tight">
              CaseChange
            </h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
            A professional text utility tool built with <span className="font-semibold text-indigo-600 dark:text-indigo-400">React</span>, <span className="font-semibold text-indigo-600 dark:text-indigo-400">TailwindCSS</span> & modern web tech. Convert cases, analyze text, encode/decode — all in your browser.
          </p>
          <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2">
            <Sparkles size={12} className="text-amber-500" />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Crafted by <span className="font-semibold text-gray-700 dark:text-gray-200">Mohammad Sharique Sabir</span> — Software Engineer
            </span>
          </div>
        </div>

        {/* Tech badges */}
        <div className="hidden lg:flex flex-col gap-1.5 shrink-0">
          {['React', 'TailwindCSS', 'Vite', 'Lucide'].map((tech, i) => (
            <span
              key={tech}
              className="neu-badge text-gray-600 dark:text-gray-300 animate-float"
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
