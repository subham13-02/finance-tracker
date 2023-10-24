import {React,useState} from 'react';
import './App.css';
import Header from './components/Header/Header';
import Dashboard from './Pages/Dashboard/Dasboard'
import { useTheme } from './context/ThemeContext';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from './Pages/Authentication/LoginForm/Login';
import Signup from './Pages/Authentication/SignupForm/Signup';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading/Loading';
import Landing from './components/LandingPage/Landing';

function App() {
  const { darkMode }= useTheme();
  let [loading,setLoading]=useState(true);
  setTimeout(()=>{
    setLoading(false);
  },2000);

  return (
      <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
        <Router>
          <Header/>
          {loading?
            <Loading/>
            :<Routes>
              <Route path="/finance-tracker" element={<Landing/>}/>
              <Route path="finance-tracker/signup" element={<Signup/>}/>
              <Route path="finance-tracker/login" element={<Login/>}/>
              <Route path="finance-tracker/dashboard" element={<Dashboard />}/>
            </Routes>
          }
        </Router>
        <ToastContainer theme={darkMode?'dark':'light'}/>
      </div>          
  );
}

export default App;


