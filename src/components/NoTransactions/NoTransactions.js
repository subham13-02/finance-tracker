import React from "react";
import noTransactions from "../../assets/images/noTransactions-removebg-preview.png";

function NoTransactions() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        margin:"0"
      }}
    >
      <img src={noTransactions} style={{ minWidth: "320px", maxWidth: "50%",margin: "4rem" }} alt="NoTransations"/>
      
    </div>
  );
}

export default NoTransactions;