import React from "react";
import "./Input.css"
const Input=(props)=>{
    const {input, setInput, type, placeholder}=props;
    return(
        <>
            <input className={"custom-input "+ input} value={input} type={type} placeholder={placeholder} onChange={(e)=>{setInput(e.target.value)}}/>
        </>
    )

}
export default Input;