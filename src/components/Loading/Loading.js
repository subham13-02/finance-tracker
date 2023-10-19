import React from "react";
import "./Loading.css";
import { InfinitySpin } from  'react-loader-spinner';


const Loading=()=>{
    return (<div className="loading"> 
                <InfinitySpin 
                    width='200'
                    color="var(--theme)"
                />
    </div>)
}
export default Loading;