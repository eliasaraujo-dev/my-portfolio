import { useState, useEffect } from 'react';

const useTheme = (defaultTheme = 'dark') => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme };
};

export default useTheme;
