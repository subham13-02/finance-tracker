import React from "react";
import "./Profile.css";
//import blankImage from "../../../assets/images/profile-user.jpg";

const Profile=({user})=>{
    
    return(
        <React.Fragment>
            <img className="profileImage" src={(user.photoURL)?user.photoURL:require('../../../assets/images/profile-user.jpg')} alt="progile" />
        </React.Fragment>
    )
}
export default Profile;