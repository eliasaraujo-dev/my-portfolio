import React, { useState, useEffect, useRef } from 'react';
import { useSpring, motion, AnimatePresence } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ArrowUpRight, 
  Code2, 
  Terminal, 
  Cpu, 
  Globe, 
  Zap,
  Layout,
  Smartphone,
  Database,
  Coffee,
  User,
  Briefcase
} from 'lucide-react';
import ControlButtons from './components/ControlButtons';
import { translations } from './translations';

/* --- Deep Space Warp Background --- */
const DeepSpaceBackground = ({ theme, travelProgress }) => {
  const canvasRef = useRef(null);
  const velocitySpring = useSpring(0, { stiffness: 15, damping: 20 });

  useEffect(() => {
    velocitySpring.set(travelProgress);
  }, [travelProgress, velocitySpring]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const stars = [];
    for (let i = 0; i < 1000; i++) {
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * width,
        size: Math.random() * 1.2 + 0.2
      });
    }

    const draw = () => {
      ctx.fillStyle = theme === 'light' ? '#f0f4f8' : '#000';
      ctx.fillRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;
      const currentVelocity = 0.8 + (velocitySpring.get() * 140);

      stars.forEach(s => {
        const oldZ = s.z;
        s.z -= currentVelocity;

        if (s.z <= 1) {
          s.z = width;
          s.x = Math.random() * width - width / 2;
          s.y = Math.random() * height - height / 2;
          return;
        }

        const k = 128 / s.z;
        const x = s.x * k + cx;
        const y = s.y * k + cy;

        const kOld = 128 / oldZ;
        const xOld = s.x * kOld + cx;
        const yOld = s.y * kOld + cy;

        const opacity = Math.min(1, (1 - s.z / width) * 2);
        
        ctx.beginPath();
        ctx.strokeStyle = theme === 'light' 
          ? `rgba(0,0,0,${opacity * 0.15})` 
          : `rgba(255, 255, 255, ${opacity})`;
        
        ctx.lineWidth = s.size * (1 + (currentVelocity / 15));
        ctx.lineCap = 'round';
        
        ctx.moveTo(xOld, yOld);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    const handleResize = () => { 
      width = canvas.width = window.innerWidth; 
      height = canvas.height = window.innerHeight; 
    };
    window.addEventListener('resize', handleResize);
    return () => { 
      cancelAnimationFrame(animationFrameId); 
      window.removeEventListener('resize', handleResize); 
    };
  }, [theme, velocitySpring]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

/* --- Components Utilitários --- */

// Card com efeito de Spotlight (luz seguindo o mouse)
const SpotlightCard = ({ children, className = "", theme = 'dark' }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-3xl border overflow-hidden ${className} ${
        theme === 'light'
          ? 'border-zinc-200 bg-white/80'
          : 'border-white/10 bg-zinc-900/50'
      }`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(120, 119, 198, 0.15), transparent 40%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
};

// Marquee Infinito (Faixa de rolagem)
const InfiniteMarquee = ({ items, speed = 20 }) => {
  return (
    <div className="relative flex overflow-hidden w-full mask-linear-fade">
      <div className="animate-marquee whitespace-nowrap py-4 flex gap-8">
        {[...items, ...items].map((item, idx) => (
          <span key={idx} className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-500 to-zinc-700 uppercase tracking-tighter">
            {item}
          </span>
        ))}
      </div>
      <style>{`
        .animate-marquee { animation: marquee ${speed}s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .mask-linear-fade { mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent); }
      `}</style>
    </div>
  );
};

// Componente ProfileScanner (Foto com contorno rotativo)
const ProfileScanner = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative w-32 h-32 mx-auto">
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-500 animate-spin-slow opacity-20"></div>
      <div className="absolute inset-1 rounded-full bg-black"></div>
      <div className="absolute inset-1 rounded-full overflow-hidden flex items-center justify-center">
        {!imgError ? (
          <img 
            src="/profile.png" 
            alt="Elias Araújo" 
            className="w-full h-full object-cover rounded-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-black">
            EA
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  
  // Estados para a animação de viagem espacial
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelProgress, setTravelProgress] = useState(0);
  const [showArrival, setShowArrival] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [flash, setFlash] = useState(false);
  
  const currentYear = new Date().getFullYear();

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleLang = () => setLang(prev => prev === 'en' ? 'pt' : 'en');

  const t = translations[lang];

  // Animação de viagem espacial na entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTraveling(true);
      let p = 0;
      const accelInterval = setInterval(() => {
        p += 0.012;
        setTravelProgress(p);

        if (p >= 1) {
          clearInterval(accelInterval);
          setFlash(true);
          
          setTimeout(() => {
            setShowArrival(true);
            setTravelProgress(0); 
            setFlash(false);
            setIsTraveling(false);
            
            // Após 6.0s na tela de chegada, mostrar o portfolio
            setTimeout(() => {
              setShowPortfolio(true);
            }, 6000);
          }, 800);
        }
      }, 40);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  // Aplicar tema ao body
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -300 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const projects = [
    {
      title: "Neon Finance",
      category: "Fintech Dashboard",
      desc: "Visualização de dados cripto em tempo real com WebSockets.",
      tags: ["Next.js", "Recharts", "Supabase"],
      color: "from-purple-500 to-indigo-500"
    },
    {
      title: "Aura Commerce",
      category: "Headless E-commerce",
      desc: "Experiência de compra ultrarrápida com Edge Functions.",
      tags: ["Shopify API", "React", "Tailwind"],
      color: "from-purple-400 to-pink-500"
    },
    {
      title: "Zenith AI",
      category: "SaaS Platform",
      desc: "Interface generativa para criação de conteúdo automatizado.",
      tags: ["OpenAI", "Node.js", "Redis"],
      color: "from-violet-500 to-purple-600"
    }
  ];

  return (
    <div className={`min-h-screen font-sans selection:bg-purple-500/30 overflow-x-hidden transition-colors duration-500 ${
      theme === 'light' 
        ? 'bg-white text-zinc-900' 
        : 'bg-black text-white'
    }`}>
      
      {/* Deep Space Warp Background */}
      <DeepSpaceBackground theme={theme} travelProgress={travelProgress} />
      
      {/* Clarão da Dobra com AnimatePresence */}
      <AnimatePresence>
        {flash && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-white"
          />
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!showArrival ? (
          /* Tela de Intro - Deep Space */
          <motion.div 
            key="intro"
            exit={{ opacity: 0, scale: 2, filter: 'blur(20px)' }}
            className="relative z-50 flex flex-col items-center justify-center h-screen space-y-4"
          >
            <h1 className="text-white text-4xl font-black uppercase tracking-[0.5em] italic">
              {isTraveling ? "Warp Drive Active" : "Deep Space"}
            </h1>
            {isTraveling && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0.5, 1] }}
                className="text-cyan-400 font-mono text-xs tracking-widest uppercase"
              >
                Approaching Milky Way...
              </motion.p>
            )}
          </motion.div>
        ) : !showPortfolio ? (
          /* Tela de Chegada - Arrival */
          <motion.div 
            key="arrival"
            initial={{ scale: 1.5, filter: 'blur(40px)', opacity: 0 }}
            animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.5 }
            }}
            className="relative z-50 p-20 flex flex-col items-center justify-center min-h-screen text-center"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-cyan-400 font-mono text-lg md:text-xl tracking-[0.5em] uppercase mb-4">
                Location: Milky Way Galaxy
              </h2>
              <h3 className="text-white/70 font-mono text-base tracking-widest uppercase mb-8">
                Arrival Date: January {currentYear}
              </h3>
              
              <p className="text-white/60 max-w-md text-lg font-medium italic mx-auto">
                System stabilized. Digital environment successfully re-materialized.
              </p>
            </motion.div>
          </motion.div>
        ) : (
          /* Conteúdo do Portfolio com efeito de "destorção" */
          <motion.div 
            key="portfolio"
            initial={{ scale: 1.5, filter: 'blur(40px)', opacity: 0 }}
            animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1],
              opacity: { duration: 0.5 }
            }}
            className="relative z-10"
          >
            {/* Control Buttons */}
            <ControlButtons 
              theme={theme} 
              lang={lang} 
              onThemeChange={toggleTheme} 
              onLangChange={toggleLang} 
            />
            
            {/* Background Grid & Ambient Light */}
            <div className="fixed inset-0 z-0 pointer-events-none">
              <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] ${theme === 'light' ? 'opacity-30' : ''}`}></div>
              <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 animate-pulse-slow"></div>
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Floating Navbar */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
              <div className="flex items-center gap-1 bg-white/5 backdrop-blur-xl border border-white/10 px-2 py-2 rounded-full shadow-2xl shadow-black/50">
                {['home', 'work', 'about', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollTo(item)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeSection === item 
                        ? theme === 'light'
                    ? 'bg-zinc-900 text-white shadow-lg scale-105'
                    : 'bg-white text-black shadow-lg scale-105'
                  : theme === 'light'
                    ? 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 z-10">
        <div className="max-w-5xl w-full">
          <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className={`font-mono text-sm tracking-widest uppercase ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>{t.available}</span>
          </div>

          <h1 className={`text-5xl md:text-6xl font-bold tracking-tighter mb-8 leading-[0.9] bg-clip-text text-transparent ${
            theme === 'light'
              ? 'bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-700'
              : 'bg-gradient-to-b from-white via-white to-zinc-600'
          }`}>
            {t.heroIntro}<br />
            <span className={`transition-colors duration-700 cursor-default ${
              theme === 'light'
                ? 'text-zinc-900 hover:text-zinc-700'
                : 'text-zinc-800 hover:text-white'
            }`}>Developer</span>
          </h1>

          <p className={`text-xl md:text-2xl max-w-2xl leading-relaxed mb-12 ${
            theme === 'light' ? 'text-zinc-700' : 'text-zinc-400'
          }`}>
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-4">
             <button onClick={() => scrollTo('work')} className={`group relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105 active:scale-95 ${
               theme === 'light' 
                 ? 'bg-zinc-900 text-white' 
                 : 'bg-white text-black'
             }`}>
                <span className="relative z-10 flex items-center gap-2">{t.viewWork} <ArrowUpRight size={20} /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
             </button>
             <button onClick={() => scrollTo('contact')} className={`px-8 py-4 rounded-full border font-medium transition-all ${
               theme === 'light'
                 ? 'border-zinc-300 text-zinc-900 hover:bg-zinc-100'
                 : 'border-white/20 text-white hover:bg-white/10'
             }`}>
                {t.contact}
             </button>
          </div>
        </div>
      </section>

      {/* Marquee Separator */}
      <div className={`py-10 border-y backdrop-blur-sm z-20 relative ${
        theme === 'light'
          ? 'border-zinc-200 bg-white/50'
          : 'border-white/5 bg-black/50'
      }`}>
        <InfiniteMarquee items={["React", "TypeScript", "Node.js", "Next.js", "Tailwindcss", "Java", "Springboot", "Kubernetes", "Docker", "PostgreSQL", "MongoDB", "AWS"]} />
      </div>

      {/* Work Section - Bento Grid Style */}
      <section id="work" className="py-32 px-6 z-10 relative max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t.selectedProjects}</h2>
            <p className={`max-w-md ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>{t.projectsDescription}</p>
          </div>
          <a href="#" className={`hidden md:flex items-center gap-2 transition-colors pb-2 border-b border-transparent ${
            theme === 'light'
              ? 'text-zinc-600 hover:text-zinc-900 hover:border-zinc-900'
              : 'text-zinc-400 hover:text-white hover:border-white'
          }`}>{t.viewAllGitHub} <Github size={16} /></a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <SpotlightCard key={idx} theme={theme} className={`group min-h-[400px] flex flex-col justify-between p-8 hover:border-zinc-500/50 transition-colors ${idx === 0 ? "lg:col-span-2" : ""}`}>
               <div className="mb-4">
                 <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${project.color} blur-xl opacity-20 group-hover:opacity-40 transition-opacity mb-4`}></div>
                 <div className="flex justify-between items-start">
                    <div>
                      <span className={`text-xs font-mono uppercase tracking-widest mb-2 block ${
                        theme === 'light' ? 'text-zinc-500' : 'text-zinc-500'
                      }`}>{project.category}</span>
                      <h3 className="text-3xl font-bold mb-3">{project.title}</h3>
                    </div>
                    <ArrowUpRight className={`group-hover:rotate-45 transition-all duration-300 ${
                      theme === 'light' ? 'text-zinc-400 group-hover:text-zinc-900' : 'text-zinc-600 group-hover:text-white'
                    }`} />
                 </div>
                 <p className={`text-lg ${theme === 'light' ? 'text-zinc-600' : 'text-zinc-400'}`}>{project.desc}</p>
               </div>
               
               <div className="flex flex-wrap gap-2 mt-auto">
                 {project.tags.map((tag, tIdx) => (
                   <span key={tIdx} className={`px-3 py-1 rounded-full border text-xs ${
                     theme === 'light'
                       ? 'border-zinc-200 text-zinc-600 bg-zinc-100'
                       : 'border-white/10 text-zinc-400 bg-white/5'
                   }`}>
                     {tag}
                   </span>
                 ))}
               </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 z-10 relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Coluna Lateral: Perfil e Estatísticas */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 animate-fade-in-up">
            <SpotlightCard theme={theme} className="p-10 text-center">
              {/* Foto com contorno rotativo */}
              <ProfileScanner />
              
              <h3 className="text-3xl font-black mt-10">Elias Araújo</h3>
              <p className="text-purple-500 font-mono text-xs uppercase tracking-[0.2em] mb-8">{t.fullstackDeveloper}</p>
              
              {/* Grid de Estatísticas */}
              <div className={`grid grid-cols-3 gap-4 border-y py-8 my-8 ${
                theme === 'light' ? 'border-zinc-200' : 'border-white/5'
              }`}>
                <div>
                  <div className="text-2xl font-black tracking-tighter">03+</div>
                  <div className={`text-[9px] uppercase font-bold leading-tight ${theme === 'light' ? 'text-zinc-400' : 'opacity-40'}`}>{t.years}</div>
                </div>
                <div>
                  <div className="text-2xl font-black tracking-tighter">15+</div>
                  <div className={`text-[9px] uppercase font-bold leading-tight ${theme === 'light' ? 'text-zinc-400' : 'opacity-40'}`}>{t.projects}</div>
                </div>
                <div>
                  <div className="text-2xl font-black tracking-tighter">10+</div>
                  <div className={`text-[9px] uppercase font-bold leading-tight ${theme === 'light' ? 'text-zinc-400' : 'opacity-40'}`}>{t.clients}</div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className="flex justify-center gap-3">
                <a 
                  href="https://github.com/eliasaraujo-dev" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border bg-white/5 border-white/10 hover:scale-110 hover:border-purple-500/50 transition-all duration-300"
                >
                  <Github size={20} />
                </a>
                <a 
                  href="https://linkedin.com/in/eliasaraujx/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl border bg-white/5 border-white/10 hover:scale-110 hover:border-purple-500/50 transition-all duration-300"
                >
                  <Linkedin size={20} />
                </a>
                <a 
                  href="mailto:eliasaraujx@gmail.com"
                  className="p-4 rounded-2xl border bg-white/5 border-white/10 hover:scale-110 hover:border-purple-500/50 transition-all duration-300"
                >
                  <Mail size={20} />
                </a>
              </div>
            </SpotlightCard>
          </div>

          {/* Coluna Principal: Biografia e Experiência */}
          <div className="lg:col-span-8 space-y-8 animate-fade-in-up">
            {/* Bloco de Biografia */}
            <SpotlightCard theme={theme} className="p-10">
              <div className="flex items-center gap-4 mb-6">
                <User className="text-purple-500" size={24} />
                <h4 className="text-xl font-black uppercase tracking-widest">{t.biography}</h4>
              </div>
              <p className={`text-xl leading-relaxed font-medium ${theme === 'light' ? 'text-zinc-600' : 'opacity-60'}`}>
                {t.bio}
              </p>
            </SpotlightCard>

            {/* Bloco de Experiência (Timeline) */}
            <SpotlightCard theme={theme} className="p-10">
              <div className="flex items-center gap-4 mb-10">
                <Briefcase className="text-purple-500" size={24} />
                <h4 className="text-xl font-black uppercase tracking-widest">{t.experience}</h4>
              </div>
              
              <div className="space-y-12">
                <div className="relative pl-10 border-l border-white/10 group">
                  {/* Indicador da Timeline */}
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-white/20 group-hover:bg-purple-500 transition-colors" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h5 className="text-2xl font-black tracking-tight">{t.exp1Title}</h5>
                    <span className="font-mono text-xs text-purple-500 font-bold">2022 - {t.present}</span>
                  </div>
                  <p className="text-purple-400 font-bold text-sm mb-4 uppercase tracking-widest">{t.freelanceProjects}</p>
                  <p className="opacity-50 leading-relaxed max-w-2xl">
                    {t.exp1Desc}
                  </p>
                </div>

                <div className="relative pl-10 border-l border-white/10 group">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-white/20 group-hover:bg-purple-500 transition-colors" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h5 className="text-2xl font-black tracking-tight">{t.exp2Title}</h5>
                    <span className="font-mono text-xs text-purple-500 font-bold">2020 - 2022</span>
                  </div>
                  <p className="text-purple-400 font-bold text-sm mb-4 uppercase tracking-widest">{t.techCompany}</p>
                  <p className="opacity-50 leading-relaxed max-w-2xl">
                    {t.exp2Desc}
                  </p>
                </div>

                <div className="relative pl-10 border-l border-white/10 group">
                  <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-white/20 group-hover:bg-purple-500 transition-colors" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h5 className="text-2xl font-black tracking-tight">{t.exp3Title}</h5>
                    <span className="font-mono text-xs text-purple-500 font-bold">2019 - 2020</span>
                  </div>
                  <p className="text-purple-400 font-bold text-sm mb-4 uppercase tracking-widest">{t.startup}</p>
                  <p className="opacity-50 leading-relaxed max-w-2xl">
                    {t.exp3Desc}
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
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
            <a href="mailto:eliasaraujx@gmail.com" className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-colors ${
              theme === 'light'
                ? 'bg-zinc-900 text-white hover:bg-zinc-800'
                : 'bg-white text-black hover:bg-zinc-200'
            }`}>
              <Mail size={20} /> {t.sayHello}
            </a>
            <div className="flex gap-4">
              <a href="https://github.com/eliasaraujo-dev" className={`p-4 rounded-xl border transition-all ${
                theme === 'light'
                  ? 'bg-zinc-100 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200'
                  : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800'
              }`}><Github /></a>
              <a href="https://linkedin.com/in/eliasaraujx" className={`p-4 rounded-xl border transition-all ${
                theme === 'light'
                  ? 'bg-zinc-100 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-200'
                  : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800'
              }`}><Linkedin /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className={`py-8 text-center text-sm border-t ${
        theme === 'light' 
          ? 'text-zinc-500 border-zinc-200' 
          : 'text-zinc-600 border-white/5'
      }`}>
        <p>© {new Date().getFullYear()} {t.footer}</p>
      </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
