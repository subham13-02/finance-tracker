import React from 'react';
import { Card, Row ,Popconfirm} from 'antd';
import Button from "../Button/Button";
import "./Cards.css";
import { useTheme } from '../../context/ThemeContext';
// import {firebase} from 'firebase/app';

const Cards = (props) => {
    let {showIncomeModal,showExpensesModal,resetAllTransactions,totalBalance,income,expense}=props;
    const { darkMode }= useTheme();
    
    
    const cancel = (e) => {
        console.log(e);
        console.log('Click on No');
    };
  

    return(
        <div className="cards" >
            <Row className="cards-row" >
                <Card title="Current Balance" style={darkMode ?{color:"#f5f5f5"}:{color:"#190d1b"}}>
                    <p>₹{totalBalance}</p>
                    <Popconfirm
                        title="Reset the Transaction"
                        description="Are you sure to reset the transactions?"
                        onConfirm={resetAllTransactions}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button content={"Reset Balance"} theme={true}/>
                    </Popconfirm>
                    
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