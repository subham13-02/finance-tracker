import React from "react";
import "./Button.css";

const Button=(props)=>{
    const {content,theme,icon,onClick}=props;
    return(
        <div className="button">
           { theme?
                <button className="globalBtn" type="submit" style={{backgroundColor:"var(--theme)",color:"white"} } onClick={onClick}> {content}  {icon} </button>
                :<button className="globalBtn " type="submit" onClick={onClick}>{content}</button>
            }
        </div>
    )

}
export default Button;