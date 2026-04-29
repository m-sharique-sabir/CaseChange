import { GitBranch, Briefcase, Mail, Phone, Code2, Braces, Server, Wrench } from 'lucide-react';

const skills = {
  languages: ['JavaScript', 'TypeScript'],
  frontend: ['HTML', 'CSS', 'React.js', 'Next.js', 'TailwindCSS', 'Shadcn', 'Styled Components'],
  backend: ['Node.js', 'Express.js', 'MongoDB', 'PHP', 'Laravel', 'API Integration', 'Local Storage'],
  tools: ['Git', 'GitHub', 'VS Code', 'Windsurf', 'Cursor'],
};

const contactLinks = [
  { icon: Phone, label: '+92 339 2409950', href: 'https://wa.me/923392409950', color: 'text-green-600 dark:text-green-400' },
  { icon: Mail, label: 'mohammadsharique2409950@gmail.com', href: 'mailto:mohammadsharique2409950@gmail.com', color: 'text-blue-600 dark:text-blue-400' },
  { icon: GitBranch, label: 'GitHub', href: 'https://github.com/m-sharique-sabir', color: 'text-gray-700 dark:text-gray-300' },
  { icon: Briefcase, label: 'LinkedIn', href: 'https://linkedin.com/in/m-sharique-sabir', color: 'text-blue-700 dark:text-blue-400' },
];

const SkillBadge = ({ name }) => (
  <span className="neu-badge text-gray-600 dark:text-gray-300">
    {name}
  </span>
);

const SkillGroup = ({ icon: Icon, title, items }) => (
  <div>
    <div className="flex items-center gap-1.5 mb-2">
      <Icon size={13} className="text-indigo-500 dark:text-indigo-400" />
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">{title}</h4>
    </div>
    <div className="flex flex-wrap gap-1">
      {items.map(item => <SkillBadge key={item} name={item} />)}
    </div>
  </div>
);

const ProfessionalFooter = () => {
  return (
    <footer className="neu-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: About the Developer */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-100 mb-2">Mohammad Sharique Sabir</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
              Software Engineer crafting clean, scalable web experiences. Passionate about modern frontend, developer tooling, and building products that make a difference.
            </p>
            <div className="flex flex-col gap-1.5">
              {contactLinks.map(({ icon: CIcon, label, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors no-underline"
                >
                  <CIcon size={13} className={color} />
                  <span className="truncate">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Technical Skills */}
          <div className="space-y-3">
            <SkillGroup icon={Code2} title="Languages" items={skills.languages} />
            <SkillGroup icon={Braces} title="Frontend" items={skills.frontend} />
            <SkillGroup icon={Server} title="Backend & DB" items={skills.backend} />
            <SkillGroup icon={Wrench} title="Tools" items={skills.tools} />
          </div>

          {/* Column 3: Project Info */}
          <div>
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-100 mb-2">About CaseChange</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
              A free, privacy-first text utility tool. No data leaves your browser — all processing happens client-side. Built with React, TailwindCSS, and Vite.
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['React', 'TailwindCSS', 'Vite', 'Lucide', 'LocalStorage'].map(t => (
                <span key={t} className="neu-badge text-indigo-600 dark:text-indigo-400">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              © {new Date().getFullYear()} Mohammad Sharique Sabir. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ProfessionalFooter;
