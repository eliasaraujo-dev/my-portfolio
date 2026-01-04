import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Sun, Moon } from 'lucide-react';

const ControlButtons = ({ theme, lang, onThemeChange, onLangChange }) => {
  return (
    <div className="fixed top-6 right-6 z-50 flex gap-3">
      {/* Botão de Idioma */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -2 }}
        onClick={onLangChange}
        className={`h-12 px-4 rounded-full border flex items-center gap-2 font-bold text-xs uppercase backdrop-blur-md transition-colors duration-500 ${
          theme === 'light' 
            ? 'bg-white border-zinc-200 text-zinc-900 shadow-sm' 
            : 'bg-zinc-900 border-white/10 text-white'
        }`}
      >
        <Globe size={16} />
        <span>{lang}</span>
      </motion.button>

      {/* Botão de Tema (Dark/Light) */}
      <motion.button 
        whileTap={{ scale: 0.9 }}
        whileHover={{ y: -2 }}
        onClick={onThemeChange}
        className={`w-12 h-12 rounded-full border flex items-center justify-center backdrop-blur-md transition-colors duration-500 ${
          theme === 'light' 
            ? 'bg-white border-zinc-200 text-zinc-900 shadow-sm' 
            : 'bg-zinc-900 border-white/10 text-white'
        }`}
      >
        {theme === 'dark' ? (
          <Sun size={18} className="text-yellow-400" />
        ) : (
          <Moon size={18} className="text-zinc-600" />
        )}
      </motion.button>
    </div>
  );
};

export default ControlButtons;

