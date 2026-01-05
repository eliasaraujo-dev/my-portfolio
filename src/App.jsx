import React, { useState } from 'react';
import { Github, Linkedin, Mail, ArrowUpRight, User, Briefcase } from 'lucide-react';

// Components
import ControlButtons from './components/ControlButtons';
import SpotlightCard from './components/SpotlightCard';
import InfiniteMarquee from './components/InfiniteMarquee';
import ProfileScanner from './components/ProfileScanner';
import Navbar from './components/Navbar';
import SocialLinks from './components/SocialLinks';

// Hooks
import useScrollSpy from './hooks/useScrollSpy';
import useTheme from './hooks/useTheme';

// Constants & Data
import { translations } from './translations';
import { SECTIONS, TECHNOLOGIES, PROJECT_COLORS, STATISTICS } from './constants';

// ============================================================================
// SECTION COMPONENTS
// ============================================================================

const BackgroundEffects = ({ theme }) => (
  <div className="fixed inset-0 z-0 pointer-events-none">
    <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] ${theme === 'light' ? 'opacity-30' : ''}`} />
    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow" />
    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
  </div>
);

const HeroSection = ({ theme, t, onNavigate }) => (
  <section id="home" className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 z-10">
    <div className="max-w-5xl w-full">
      {/* Availability Badge */}
      <div className="flex items-center gap-3 mb-6">
        <span className="relative flex h-3 w-3" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
        </span>
        <span className={`font-mono text-sm tracking-widest uppercase ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
          {t.available}
        </span>
      </div>

      {/* Title */}
      <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-[0.95] bg-clip-text text-transparent ${
        theme === 'light'
          ? 'bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-600'
          : 'bg-gradient-to-b from-white via-white to-zinc-500'
      }`}>
        {t.heroIntro}<br />
        <span className={`inline-block transition-all duration-500 cursor-default hover:tracking-wide ${
          theme === 'light' ? 'text-purple-600 hover:text-purple-700' : 'text-purple-400 hover:text-purple-300'
        }`}>
          Developer
        </span>
      </h1>

      {/* Subtitle */}
      <p className={`text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 ${theme === 'light' ? 'text-zinc-700' : 'text-zinc-400'}`}>
        {t.heroSubtitle}
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={() => onNavigate('work')} 
          className={`group relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
            theme === 'light' 
              ? 'bg-zinc-900 text-white focus:ring-offset-white' 
              : 'bg-white text-black focus:ring-offset-black'
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            {t.viewWork} <ArrowUpRight size={20} aria-hidden="true" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity" aria-hidden="true" />
        </button>
        <button 
          onClick={() => onNavigate('contact')} 
          className={`px-8 py-4 rounded-full border font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
            theme === 'light'
              ? 'border-zinc-300 text-zinc-900 hover:bg-zinc-100 focus:ring-offset-white'
              : 'border-white/20 text-white hover:bg-white/10 focus:ring-offset-black'
          }`}
        >
          {t.contact}
        </button>
      </div>
    </div>
  </section>
);

const ProjectCard = ({ project, theme, isLarge }) => (
  <SpotlightCard 
    theme={theme} 
    className={`group min-h-[400px] flex flex-col justify-between p-8 hover:border-zinc-500/50 transition-colors ${isLarge ? "lg:col-span-2" : ""}`}
  >
    <div className="mb-4">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${project.color} blur-xl opacity-20 group-hover:opacity-40 transition-opacity mb-4`} />
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest mb-2 block text-zinc-500">
            {project.category}
          </span>
          <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
        </div>
        <ArrowUpRight className={`group-hover:rotate-45 transition-all duration-300 ${
          theme === 'light' ? 'text-zinc-400 group-hover:text-zinc-900' : 'text-zinc-600 group-hover:text-white'
        }`} />
      </div>
      <p className={`text-lg ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
        {project.desc}
      </p>
    </div>
    
    <div className="flex flex-wrap gap-2 mt-auto">
      {project.tags.map((tag) => (
        <span 
          key={tag} 
          className={`px-3 py-1 rounded-full border text-xs ${
            theme === 'light'
              ? 'border-zinc-200 text-zinc-600 bg-zinc-100'
              : 'border-white/10 text-zinc-400 bg-white/5'
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  </SpotlightCard>
);

const WorkSection = ({ theme, t, projects }) => (
  <section id="work" className="py-32 px-6 z-10 relative max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-end mb-20">
      <div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.selectedProjects}</h2>
        <p className={`max-w-md ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
          {t.projectsDescription}
        </p>
      </div>
      <a 
        href="https://github.com/eliasaraujo-dev" 
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden md:flex items-center gap-2 transition-colors pb-2 border-b border-transparent ${
          theme === 'light'
            ? 'text-zinc-600 hover:text-zinc-900 hover:border-zinc-900'
            : 'text-zinc-400 hover:text-white hover:border-white'
        }`}
      >
        {t.viewAllGitHub} <Github size={16} />
      </a>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, idx) => (
        <ProjectCard key={project.title} project={project} theme={theme} isLarge={idx === 0} />
      ))}
    </div>
  </section>
);

const StatisticsGrid = ({ theme, t }) => (
  <div className={`grid grid-cols-3 gap-4 border-y py-8 my-8 ${theme === 'light' ? 'border-zinc-200' : 'border-white/10'}`}>
    {STATISTICS.map(({ value, key }) => (
      <div key={key}>
        <div className="text-2xl font-black tracking-tighter">{value}</div>
        <div className="text-[10px] uppercase font-semibold leading-tight text-zinc-500">
          {t[key]}
        </div>
      </div>
    ))}
  </div>
);

const ExperienceTimeline = ({ theme, t }) => {
  const experiences = [
    { titleKey: 'exp1Title', descKey: 'exp1Desc', companyKey: 'freelanceProjects', period: `2025 - ${t.present}` },
    { titleKey: 'exp2Title', descKey: 'exp2Desc', companyKey: 'techCompany', period: '2024 - 2025' },
    { titleKey: 'exp3Title', descKey: 'exp3Desc', companyKey: 'startup', period: '2023 - 2024' },
  ];

  return (
    <div className="space-y-12">
      {experiences.map(({ titleKey, descKey, companyKey, period }) => (
        <div 
          key={titleKey} 
          className={`relative pl-10 border-l group ${theme === 'light' ? 'border-zinc-200' : 'border-white/10'}`}
        >
          {/* Timeline Indicator */}
          <div 
            className={`absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full border group-hover:bg-purple-500 transition-colors ${
              theme === 'light' ? 'bg-zinc-200 border-zinc-300' : 'bg-zinc-800 border-white/20'
            }`} 
            aria-hidden="true" 
          />
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <h5 className="text-2xl font-black tracking-tight">{t[titleKey]}</h5>
            <span className="font-mono text-xs text-purple-500 font-bold">{period}</span>
          </div>
          <p className="text-purple-400 font-bold text-sm mb-4 uppercase tracking-widest">
            {t[companyKey]}
          </p>
          <p className="leading-relaxed max-w-2xl text-zinc-500">
            {t[descKey]}
          </p>
        </div>
      ))}
    </div>
  );
};

const AboutSection = ({ theme, t }) => (
  <section id="about" className="py-32 px-6 z-10 relative max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Sidebar: Profile & Statistics */}
      <div className="lg:col-span-4 lg:sticky lg:top-32">
        <SpotlightCard theme={theme} className="p-10 text-center">
          <ProfileScanner theme={theme} />
          
          <h3 className="text-3xl font-black mt-10">Elias Araújo</h3>
          <p className="text-purple-500 font-mono text-xs uppercase tracking-[0.2em] mb-8">
            {t.fullstackDeveloper}
          </p>
          
          <StatisticsGrid theme={theme} t={t} />
          
          <div className="flex justify-center">
            <SocialLinks theme={theme} />
          </div>
        </SpotlightCard>
      </div>

      {/* Main Column: Biography & Experience */}
      <div className="lg:col-span-8 space-y-8">
        {/* Biography Block */}
        <SpotlightCard theme={theme} className="p-10">
          <div className="flex items-center gap-4 mb-6">
            <User className="text-purple-500" size={24} aria-hidden="true" />
            <h4 className="text-xl font-black uppercase tracking-widest">{t.biography}</h4>
          </div>
          <p className={`text-xl leading-relaxed font-medium ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
            {t.bio}
          </p>
        </SpotlightCard>

        {/* Experience Block */}
        <SpotlightCard theme={theme} className="p-10">
          <div className="flex items-center gap-4 mb-10">
            <Briefcase className="text-purple-500" size={24} aria-hidden="true" />
            <h4 className="text-xl font-black uppercase tracking-widest">{t.experience}</h4>
          </div>
          <ExperienceTimeline theme={theme} t={t} />
        </SpotlightCard>
      </div>
    </div>
  </section>
);

const ContactSection = ({ theme, t }) => (
  <section id="contact" className="py-32 px-6 relative z-10">
    <div className="max-w-4xl mx-auto text-center">
      {/* Badge */}
      <div className="inline-block p-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mb-8">
        <div className={`rounded-full px-6 py-2 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
          <span className="text-sm font-bold tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            {t.letsTalk}
          </span>
        </div>
      </div>
      
      <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
        {t.boldIdea}
      </h2>
      <p className={`text-xl mb-12 max-w-2xl mx-auto ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>
        {t.contactDescription}
      </p>
      
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        <a 
          href="mailto:eliasaraujx@gmail.com" 
          className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 hover:scale-105 active:scale-95 ${
            theme === 'light'
              ? 'bg-zinc-900 text-white hover:bg-zinc-800 focus:ring-offset-white'
              : 'bg-white text-black hover:bg-zinc-200 focus:ring-offset-black'
          }`}
        >
          <Mail size={20} aria-hidden="true" /> {t.sayHello}
        </a>
        <div className="flex gap-4">
          <a 
            href="https://github.com/eliasaraujo-dev" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={`p-4 rounded-xl border transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              theme === 'light'
                ? 'bg-zinc-100 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200'
                : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800'
            }`}
          >
            <Github aria-hidden="true" />
          </a>
          <a 
            href="https://linkedin.com/in/eliasaraujx" 
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={`p-4 rounded-xl border transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-purple-500 ${
              theme === 'light'
                ? 'bg-zinc-100 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200'
                : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800'
            }`}
          >
            <Linkedin aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Footer = ({ theme, t }) => (
  <footer className={`py-8 text-center text-sm border-t ${
    theme === 'light' ? 'text-zinc-500 border-zinc-200' : 'text-zinc-600 border-white/5'
  }`}>
    <p>© {new Date().getFullYear()} {t.footer}</p>
  </footer>
);

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

const App = () => {
  const { theme, toggleTheme } = useTheme('dark');
  const [lang, setLang] = useState('en');
  const activeSection = useScrollSpy(SECTIONS);

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'pt' : 'en'));
  const t = translations[lang];

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  // Projects data with translations
  const projects = [
    {
      title: t.project1Title,
      category: t.project1Category,
      desc: t.project1Desc,
      tags: ['Next.js', 'Recharts', 'Supabase'],
      color: PROJECT_COLORS.neonFinance,
    },
    {
      title: t.project2Title,
      category: t.project2Category,
      desc: t.project2Desc,
      tags: ['Shopify API', 'React', 'Tailwind'],
      color: PROJECT_COLORS.auraCommerce,
    },
    {
      title: t.project3Title,
      category: t.project3Category,
      desc: t.project3Desc,
      tags: ['OpenAI', 'Node.js', 'Redis'],
      color: PROJECT_COLORS.zenithAi,
    },
  ];

  return (
    <div className={`min-h-screen font-sans selection:bg-purple-500/30 overflow-x-hidden transition-colors duration-500 ${
      theme === 'light' ? 'bg-white text-zinc-900' : 'bg-black text-white'
    }`}>
      <div className={`relative z-10 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <ControlButtons 
          theme={theme} 
          lang={lang} 
          onThemeChange={toggleTheme} 
          onLangChange={toggleLang} 
        />
        
        <BackgroundEffects theme={theme} />
        
        <Navbar 
          activeSection={activeSection} 
          theme={theme} 
          onNavigate={scrollTo} 
        />

        <HeroSection theme={theme} t={t} onNavigate={scrollTo} />

        {/* Marquee Separator */}
        <div className={`py-10 border-y backdrop-blur-sm z-20 relative ${
          theme === 'light' ? 'border-zinc-200 bg-white/50' : 'border-white/5 bg-black/50'
        }`}>
          <InfiniteMarquee items={TECHNOLOGIES} theme={theme} />
        </div>

        <WorkSection theme={theme} t={t} projects={projects} />
        <AboutSection theme={theme} t={t} />
        <ContactSection theme={theme} t={t} />
        <Footer theme={theme} t={t} />
      </div>
    </div>
  );
};

export default App;
