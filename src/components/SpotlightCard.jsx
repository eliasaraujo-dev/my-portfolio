import React, { useState, useRef } from 'react';

const SpotlightCard = ({ children, className = "", theme = 'dark' }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const themeStyles = theme === 'light'
    ? 'border-zinc-200 bg-white/80'
    : 'border-white/10 bg-zinc-900/50';

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative rounded-3xl border overflow-hidden ${themeStyles} ${className}`}
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

export default SpotlightCard;
