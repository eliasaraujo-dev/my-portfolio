import { useState, useEffect } from 'react';

const useScrollSpy = (sections, offset = 300) => {
  const [activeSection, setActiveSection] = useState(sections[0]);

  useEffect(() => {
    const handleScroll = () => {
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -offset && rect.top <= offset;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, offset]);

  return activeSection;
};

export default useScrollSpy;
