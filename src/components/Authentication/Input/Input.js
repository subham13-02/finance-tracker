import React from "react";
import "./Input.css"
const Input=(props)=>{
    const {input, setInput, type, placeholder}=props;
    return(
        <div className="input">
            <input className={input} value={input} type={type} placeholder={placeholder} onChange={(e)=>{setInput(e.target.value)}}/>
        </div>
    )

}
export default Input;