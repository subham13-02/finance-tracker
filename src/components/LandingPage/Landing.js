import React from "react";
import "./Landing.css";
import Button from "../Button/Button"
import { useNavigate } from "react-router-dom";


const Landing=()=>{
    const navigate=useNavigate();
    const toLogin=()=>{
        navigate("/finance-tracker/login");
    }
    const toSignup=()=>{
        navigate("/finance-tracker/signup");
    }

    return(
        <div className="landingPage">
            <div className="left-headings">
                <h2 className="track-finance">TRACK FINANACE</h2>
                <h2 className="with-financely">with <span style={{color:"var(--theme)"}}>Financely.</span></h2>
                <p style={{color:"var(--grey)"}}>Welcome to Financely! Now track your personal finance.</p>
                <div className="auth-btns">
                    <Button content={"Login"} theme={true} onClick={toLogin}/>
                    <Button content={"Signup"} onClick={toSignup}/>
                </div>
            </div>
            <div className="right-styling">
                <iframe title="landingPage-image" src="https://lottie.host/?file=6ed830ea-865e-4c15-9fd1-06f9beab961d/mQmNxYkDdp.json" width="300" height="300" className="landingPage-image"></iframe>
            </div>
        </div>
    )
}
export default Landing;
