import React from 'react';
import "./ThemeToggle.css"
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = (props) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={`toggle-switch ${darkMode ? 'toggle-dark' : 'toggle-light'}`}>
      <input
        type="checkbox"
        className="toggle-checkbox"
        id="toggle"
        checked={darkMode}
        onChange={toggleTheme}
      />
      <label className="toggle-label" htmlFor="toggle">
        <div className="toggle-circle">
          {!darkMode ? <FiMoon size={15} style={{color:"white"} }/> : <FiSun size={16} style={{color:"black"}}/>}
        </div>
      </label>
    </div>
  );

};

export default ThemeToggle;