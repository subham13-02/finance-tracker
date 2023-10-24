import React from 'react';
import { Card, Row } from 'antd';
import Button from "../Button/Button";
import "./Cards.css";
import { useTheme } from '../../context/ThemeContext';


const Cards = (props) => {
    let {showIncomeModal,showExpensesModal,totalBalance,income,expense}=props;
    const { darkMode }= useTheme();

    return(
        <div className="cards" >
            <Row className="cards-row" >
                <Card title="Current Balance" style={darkMode ?{color:"#f5f5f5"}:{color:"#190d1b"}}>
                    <p>₹{totalBalance}</p>
                    <Button content={"Reset Balance"} theme={true}/>
                </Card>
                
                <Card title="Total Income" style={darkMode ?{color:"#f5f5f5"}:{color:"#190d1b"}} >
                    <p>₹{income}</p>
                    <Button content={"Add Income"} onClick={showIncomeModal}/>
                </Card>

                <Card title="Total Expenses" style={darkMode ?{color:"#f5f5f5"}:{color:"#190d1b"}}>
                    <p>₹{expense}</p>
                    <Button content={"Add Expenses"} onClick={showExpensesModal}/>
                </Card>
            </Row>
        </div>
    )
}
export default Cards;