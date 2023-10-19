import React from "react";
import "./Profile.css"

const Profile=({user})=>{
    
    return(
        <React.Fragment>
            {user.photoURL&&<img className="profileImage" src={user.photoURL} alt="SS" />}
        </React.Fragment>
    )
}
export default Profile;