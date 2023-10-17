import React, { useEffect } from "react";
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import "./Header.css";
import { useNavigate } from "react-router-dom";
import {auth} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { toast } from 'react-toastify';
import { signOut } from "firebase/auth";
import Login from "../Authentication/LoginForm/Login"

const Header=()=>{
    const [user, loading] = useAuthState(auth);
    const navigate=useNavigate();
    
    useEffect(()=>{
        if(user){
            navigate("/dashboard");
        }
    },[user,loading]);

    const logoutToSignup=()=>{
        
        try{
            signOut(auth).then(()=>{
                toast.success("Logout Successful!")
                navigate("/");
            }).catch((error)=>{
                toast.error(error.message);
            });
        }catch(e){
            toast.error(e.message);
        }   
    }

    if(loading){
        return (
            <> <Login/></>
        );
    }
    if(user){
        return(
            <div className="Header">
                <div className="logo" >Financely.</div>
                <div className="nav">
                    <div><ThemeToggle/></div>
                    {user&&<div className="logout" onClick={logoutToSignup}>Logout</div>}
                </div>
            </div>
        );
    }
    
}
export default Header;