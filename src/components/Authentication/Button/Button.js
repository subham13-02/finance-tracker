import React from "react";
import "./Button.css"
const Button=(props)=>{
    const {content,blue}=props;
    return(
        <div className="button">
           { blue?
                <button className="authBtn" type="submit" style={{backgroundColor:"var(--theme)",color:"white"}}>{content}</button>
                :<button className="authBtn" type="submit" >{content}</button>
            }
        </div>
    )

}
export default Button;