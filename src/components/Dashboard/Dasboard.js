import React , { useEffect, useState} from "react";
import Cards from "./Cards/Cards"
import "./Dashboard.css"
import {ConfigProvider, theme} from "antd"
import AddIncome from "./Modals/AddIncome";
import AddExpenses from "./Modals/AddExpenses";
import { useTheme } from "../../context/ThemeContext";
import { toast } from 'react-toastify';
import moment from "moment";
import {useAuthState} from "react-firebase-hooks/auth"
import {auth,db} from "../../firebase"
import { addDoc,collection,getDocs,query } from "firebase/firestore";
import Loading from "../Loading/Loading";

const DashBoard=()=>{

    const [user]=useAuthState(auth);
    const [transactions,setTransactions]=useState([]);
    const [isExpansesModalVisible,setIsExpansesModalVisible]=useState(false);
    const [isIncomeModalVisible,setIsIncomeModalVisible]=useState(false);
    const { darkMode }= useTheme();
    const [loading,setLoading]=useState(false);

    const [income,setIncome]=useState(0);
    const [expense,setExpense]=useState(0);
    const [totalBalance,setTotalbalance]=useState(0);

    const showExpensesModal=()=>{
        setIsExpansesModalVisible(true);
    }
    const showIncomeModal=()=>{
        setIsIncomeModalVisible(true);
    }
    const cancleExpensesModal=()=>{
        setIsExpansesModalVisible(false)
    }
    const cancleIncomeModal=()=>{
        setIsIncomeModalVisible(false)
    }
    const onFinish=(values,type)=>{
        const newTransaction={
            type:type,
            date:moment(values.date).format("YYYY-MM-DD"),
            amount:parseFloat(values.amount),
            name:values.name,
        }
        
        addTransaction(newTransaction);
    }
    async function addTransaction(transaction){
        try{
            const docRef=await addDoc(
                collection(db, `users/${user.uid}/transactions`),
                transaction
            );
            console.log("doc with id=>",docRef.id)
            toast.success("Transaction Added!")
        }catch(e){
            console.log("adding doc to fire",e)
            toast.error("Transaction not Added!")
        }
    }
    useEffect(()=>{
        fetchTransactions();
    },[]);
    
    async function fetchTransactions(){
        setLoading(true)
        if(user){
            const q=query(collection(db, `users/${user.uid}/transactions`));
            const querySnapshot = await getDocs(q);
            let transactionsArray=[];
            
            querySnapshot.forEach((doc)=>{
                transactionsArray.push(doc.data);
            });
            setTransactions(transactionsArray);
            console.log("array",transactionsArray)
            toast.success("Transactions Fetched!")
        }else{
            toast.success("Transactions not Fetched!")
        }
        setLoading(false)
    }
    useEffect(()=>{
        calculateBalance();
    },[transactions]);

    const calculateBalance=()=>{
        let incomeTotal=0;
        let expensesTotal=0;

        transactions.forEach((transaction)=>{
            if(transaction.type==='income'){
                console.log(transaction)
                incomeTotal+=transaction.amount;
            }else{
                expensesTotal += transaction.amount;
            }
        })
        console.log(transactions[0],incomeTotal,expensesTotal);
        setIncome(incomeTotal);
        setExpense(expensesTotal);
        setTotalbalance(incomeTotal-expensesTotal);
    }

    return(
        <>
        {loading?
            <Loading/> 
            :<div className="dashBoard">
            <Cards 
                showIncomeModal={showIncomeModal}
                showExpensesModal={showExpensesModal} 
                totalBalance={totalBalance}
                income={income}
                expense={expense}
            />
            <ConfigProvider
                theme={{
                    //Implemeted theme for Ant Design Componenents
                    algorithm:darkMode?theme.darkAlgorithm: theme.compactAlgorithm,
                    
                    // Implement style throughout the Ant Design Componenents using token
                    token: {
                        
                        colorPrimary: "rgb(207, 56, 245)",
                        borderRadius: 2,
                
                        // Alias Token
                        colorBgContainer: 'transparent',
                    }
                }}
            >
                <AddIncome 
                    cancleIncomeModal={cancleIncomeModal} 
                    isIncomeModalVisible={isIncomeModalVisible} 
                    onFinish={onFinish}
                />
                <AddExpenses 
                    cancleExpensesModal={cancleExpensesModal} 
                    isExpansesModalVisible={isExpansesModalVisible}  
                    onFinish={onFinish}
                />

            </ConfigProvider>
            
            
            </div>}
        </>
    )
}
export default DashBoard;
