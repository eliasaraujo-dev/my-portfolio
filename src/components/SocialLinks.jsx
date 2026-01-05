import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const SOCIAL_LINKS = [
  { 
    href: 'https://github.com/eliasaraujo-dev', 
    label: 'GitHub', 
    icon: Github,
    external: true 
  },
  { 
    href: 'https://linkedin.com/in/eliasaraujx/', 
    label: 'LinkedIn', 
    icon: Linkedin,
    external: true 
  },
  { 
    href: 'mailto:eliasaraujx@gmail.com', 
    label: 'Email', 
    icon: Mail,
    external: false 
  },
];

const SocialLinks = ({ theme, variant = 'default', iconSize = 20 }) => {
  const getStyles = () => {
    if (variant === 'contact') {
      return theme === 'light'
        ? 'bg-zinc-100 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200'
        : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800';
    }
    return theme === 'light'
      ? 'bg-zinc-100 border-zinc-200 hover:bg-zinc-200'
      : 'bg-white/5 border-white/10';
  };

  const baseStyles = variant === 'contact' ? 'rounded-xl' : 'rounded-2xl';

  return (
    <div className="flex gap-3">
      {SOCIAL_LINKS.map(({ href, label, icon: Icon, external }) => (
        <a
          key={label}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          aria-label={label}
          className={`p-4 ${baseStyles} border transition-all duration-300 hover:scale-110 hover:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500 ${getStyles()}`}
        >
          <Icon size={iconSize} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};

export { SOCIAL_LINKS };
export default SocialLinks;
