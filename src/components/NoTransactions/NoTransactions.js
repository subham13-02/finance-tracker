import React from "react";
import noTransactions from "../../assets/images/noTransactions-removebg-preview.png";

function NoTransactions() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        flexDirection: "column",
        marginBottom: "2rem",
      }}
    >
      <img src={noTransactions} style={{ minWidth: "400px", minWidth: "50%",margin: "4rem" }} alt="NoTransations"/>
      
    </div>
  );
}

export default NoTransactions;