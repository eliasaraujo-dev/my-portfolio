import React from 'react';

const InfiniteMarquee = ({ items, speed = 20, theme = 'dark' }) => {
  const textGradient = theme === 'light' 
    ? 'from-zinc-400 to-zinc-600' 
    : 'from-zinc-400 to-zinc-600';

  return (
    <div 
      className="relative flex overflow-hidden w-full"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)',
      }}
    >
      <div className="animate-marquee whitespace-nowrap py-3 flex gap-6">
        {[...items, ...items].map((item, idx) => (
          <span 
            key={idx} 
            className={`text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${textGradient} uppercase tracking-tighter`}
          >
            {item}
          </span>
        ))}
      </div>
      <style>{`
        .animate-marquee { animation: marquee ${speed}s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
};

export default InfiniteMarquee;
