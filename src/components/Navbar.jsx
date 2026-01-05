import React from 'react';

const SECTIONS = ['home', 'work', 'about', 'contact'];

const Navbar = ({ activeSection, theme, onNavigate }) => {
  const containerStyles = theme === 'light'
    ? 'bg-white/80 border-zinc-200 shadow-zinc-200/50'
    : 'bg-white/5 border-white/10 shadow-black/50';

  const getButtonStyles = (isActive) => {
    if (isActive) {
      return theme === 'light'
        ? 'bg-zinc-900 text-white shadow-lg scale-105'
        : 'bg-white text-black shadow-lg scale-105';
    }
    return theme === 'light'
      ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
      : 'text-zinc-400 hover:text-white hover:bg-white/10';
  };

  return (
    <nav 
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50" 
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className={`flex items-center gap-1 backdrop-blur-xl border px-2 py-2 rounded-full shadow-2xl ${containerStyles}`}>
        {SECTIONS.map((section) => (
          <button
            key={section}
            onClick={() => onNavigate(section)}
            aria-current={activeSection === section ? 'page' : undefined}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
              theme === 'light' ? 'focus:ring-offset-white' : 'focus:ring-offset-black'
            } ${getButtonStyles(activeSection === section)}`}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
