import React, { useEffect} from "react";
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import "./Header.css";
import { useNavigate } from "react-router-dom";
import {auth} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { toast } from 'react-toastify';
import { signOut } from "firebase/auth";
import Profile from "./Profile/Profile"

const Header=()=>{
    const [user, loading] = useAuthState(auth);
    
    const navigate=useNavigate();
    useEffect(()=>{
        if(user){
            navigate("/dashboard");
        }
    },[user,loading,navigate]);
    const toLogin=()=>{
        navigate("/login");
    }
    const logoutToLogin=()=>{
        
        try{
            signOut(auth).then(()=>{
                toast.success("Logout Successful!")
                navigate("/login");
            }).catch((error)=>{
                toast.error(error.message);
            });
        }catch(e){
            toast.error(e.message);
        }   
    }
    return(
        <div className="Header">
            <div className="logo" >Financely.</div>
            <div className="nav">
                <div><ThemeToggle/></div>
                {user&&<div className="log" onClick={logoutToLogin}>Logout</div>}
                {!user&&<div className="log" onClick={toLogin}>Login</div>}
                {user&&<Profile user={user} />}
            </div>
        </div>
    );
}
export default Header;