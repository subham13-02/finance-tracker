import {React,useState} from "react";
import Input from '../../../components/Input/Input';
import Button from "../../../components/Button/Button";
import "./Login.css";
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {auth,db,provider} from '../../../firebase';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';

const Login=()=>{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    const navigate=useNavigate();
    
    function googleAuth(e){
        e.preventDefault();
        setLoading(true);
        try{
            signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                navigate("/dashboard");
                toast.success("Login Successful!");
                createDoc(user);
                setLoading(false);
            }).catch((error) => {
                toast.error(error.message);
                setLoading(false);
            });
        }catch(e){
            toast.error(e.message);
            console.log("this error")
            setLoading(false);
        }
    }

    async function createDoc(user){
        setLoading(true);
        if(!user)return;
        const userRef =doc(db,"users",user.uid);
        const userData=await getDoc(userRef);
        if (!userData.exists()){
            const {displayName,email,photoURL}=user;
            const createdAt=new Date();
            const name=user.name;
            try{
                await setDoc(doc(db, "users", user.uid),{
                    name:displayName?displayName:name,
                    email,
                    photoURL:photoURL?photoURL:"",
                    createdAt,
                });
                setLoading(false);

            }catch(e){
                toast.error(e.message);
                setLoading(false);
            }
        }else{
            setLoading(false);
        }
    }

    const loginWithEmail=(e)=>{
        e.preventDefault();
        setLoading(true);

        if(email!==''&&password!==''){
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                setEmail("");
                setPassword("");
                toast.success("Signup Successful!");
                setLoading(false);
                navigate("/finance-tracker/dashboard");
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
                setLoading(false);
            });
        }else{
            toast.error("All fields are mendatory.");
            setLoading(false);
        }

    }
    
    return (
        <div className="loginForm">
            <div className="loginForm-container">
            <h2 style={{textAlign:"center",marginBottom:"1rem"}}>Login on <span style={{color:"var(--theme)"}}>Financely.</span></h2>
                <form className="form" onSubmit={loginWithEmail}>
                    <label htmlFor="email">Email</label>
                    <Input 
                      input={email} 
                      setInput={setEmail} 
                      type={'email'} 
                      placeholder={"subham@gmail.com"}
                    />

                    <label htmlFor="password">Password</label>
                    <Input 
                      input={password} 
                      setInput={setPassword} 
                      type={'password'} 
                      placeholder={"Password"}
                    />

                    <Button 
                      disable={loading} 
                      type={"submit"} 
                      content={loading?"Loading...":"Login using Email"}
                    />
                </form>
                <p style={{textAlign:"center"}}>Or</p>
                <form onSubmit={googleAuth}>
                    <Button 
                        disable={loading}
                        content={loading?"Loading...":"Login using Google "} 
                        theme={true}
                        icon={<FcGoogle style={{fontSize:"1rem"}}/>}
                    ></Button>
                </form>
                <p className="changeToSignup-container ">Or don't have an Account? <a href="/signup" className="changeToSignup">Click here</a></p>

            </div>
        </div>
    )
}
export default Login;