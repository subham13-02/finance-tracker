import {React,useState} from "react";
import Input from '../../../components/Input/Input';
import Button from "../../../components/Button/Button";
import "./Signup.css"
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth,db,provider} from '../../../firebase';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';


const Signup=()=>{
    
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [loading,setLoading]=useState(false);

    //Google Authentication-------
    function googleAuth(e){
        e.preventDefault();
        setLoading(true);
        try{
            signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                createDoc(user);
                toast.success("Successful!")
                setLoading(false);
            }).catch((error) => {
                toast.error(error.message);
                setLoading(false);
            });
        }catch(e){
            toast.error(e.message)
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
    
    const signupWithEmail=(e)=>{
        e.preventDefault();
        setLoading(true);
        
        if(name!==''&& email!==''&& password!==''&& confirmPassword!==''){
            if(password===confirmPassword){
                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setName("");
                    setPassword("");
                    setConfirmPassword("");
                    setEmail("");
                    toast.success("Signup Successful!");
                    createDoc(user);
                    setLoading(false);
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    toast.error(errorMessage);
                    setLoading(false);
                });
            }else{
                toast.error("Password and Confirm Password don't match.");
                setLoading(false);
            }
            
        }else{
            toast.error("All fields are mendatory.");
            setLoading(false);
        }

    }
    
    return (
        <div className="signupForm">
            <div className="signupForm-container">
                <h2 style={{textAlign:"center",marginBottom:"1rem"}}>Sign Up on <span style={{color:"var(--theme)"}}>Financely.</span></h2>
                <form className="form" onSubmit={signupWithEmail}>
                    <label htmlFor="name">Full Name</label>
                    <Input 
                        input={name} 
                        setInput={setName} 
                        type={'text'} 
                        placeholder={"Subham Sahu"}
                    />

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

                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Input 
                        input={confirmPassword} 
                        setInput={setConfirmPassword} 
                        type={'password'} 
                        placeholder={"Confirm Password"}
                    />

                    <Button 
                        disable={loading}
                        content={loading?"Loading...":"Signup using Email"}
                    />
                </form>
                <p style={{textAlign:"center"}}>Or</p>
                <form onSubmit={googleAuth}>
                    <Button 
                        disable={loading}
                        content={loading?"Loading...":"Signup using Google"} 
                        theme={true}
                        icon={<FcGoogle style={{fontSize:"1rem"}}/>}
                    />
                </form>
                <p className="changeToLogin-container">Or having an Account Already? <a href="/finance-tracker/login" className="changeToLogin">Click here</a></p>                
            </div>
        </div>
    )
}
export default Signup;