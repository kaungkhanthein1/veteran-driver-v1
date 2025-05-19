import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Try to get the saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark'; // Default to dark if no theme is saved
  });

  const toggleTheme = (newTheme) => {
    setTheme(newTheme);
    // Save the theme choice to localStorage
    localStorage.setItem('theme', newTheme);
    // Update the data-theme attribute
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  // Apply the theme when the component mounts
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}