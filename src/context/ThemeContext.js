import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const AuthProvider = ({ children }) => {
  const [login, setLogin] = useState(() => {
    return login === true ? true : false;
  });

  useEffect(() => {
    setLogin(login === 'true' ? false : true);
  }, [login]);
}

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    // Load the theme mode from local storage or set a default value
    return localStorage.getItem('theme') === 'dark' ? true : false;
  });

  useEffect(() => {
    // Update local storage when theme mode changes
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
