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
import Loading from './components/Loading/Loading';

function App() {
  const { darkMode }= useTheme();
  let [loading,setLoading]=useState(true);
  setTimeout(()=>{
    setLoading(false);
  },1000);

  return (
      <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Router>
          <Header/>
          {loading?
            <Loading/>
            :<Routes>
              <Route path="/" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/dashboard" element={<Dashboard />}/>
            </Routes>
          }
        </Router>
        <ToastContainer theme={darkMode?'dark':'light'}/>
      </div>          
  );
}

export default App;


