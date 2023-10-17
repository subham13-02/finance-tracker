import {React,useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dasboard'
import { useTheme } from './context/ThemeContext';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './components/Authentication/LoginForm/Login';
import Signup from './components/Authentication/SignupForm/Signup';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const { darkMode }= useTheme();

  return (
      <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        
        <Router>
          <Header/>
          <Routes>
            <Route path="/" element={<Signup/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard />}/>
          </Routes>
        </Router>
        <ToastContainer theme={darkMode?'dark':'light'}/>
      </div>          
  );
}

export default App;
