import React , { useEffect, useState} from "react";
import Cards from "../../components/Cards/Cards"
import "./Dashboard.css"
import {ConfigProvider, theme} from "antd"
import AddIncome from "../../components/Modals/AddIncome";
import AddExpenses from "../../components/Modals/AddExpenses";
import { useTheme } from "../../context/ThemeContext";
import { toast } from 'react-toastify';
import {useAuthState} from "react-firebase-hooks/auth"
import {auth,db} from "../../firebase"
import { addDoc,collection,getDocs,query } from "firebase/firestore";
import Loading from "../../components/Loading/Loading";
import TransactionTable from "../../components/Table/TransactionTable";
import Charts from "../../components/Charts/Charts";
import NoTransactions from "../../components/NoTransactions/NoTransactions";

const DashBoard=()=>{ 

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user] = useAuthState(auth);
    const [isExpensesModalVisible, setIsExpenseModalVisible] = useState(false);
    const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
    const { darkMode }= useTheme();

    const [income, setIncome] = useState(0);
    const [expense, setExpense] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);

    const showExpensesModal= () => {
        setIsExpenseModalVisible(true);
    };

    const showIncomeModal = () => {
        setIsIncomeModalVisible(true);
    };

    const cancleExpensesModal = () => {
        setIsExpenseModalVisible(false);
    };

    const cancleIncomeModal = () => {
        setIsIncomeModalVisible(false);
    };

    const onFinish = (values, type) => {
        const newTransaction = {
        type: type,
        date: values.date.format("YYYY-MM-DD"),
        amount: parseFloat(values.amount),
        tag: values.tag,
        name: values.name,
        };
        console.log("New Transaction", newTransaction);
        addTransaction(newTransaction);
    };

    async function addTransaction(transaction,many) {
        try {
        const docRef = await addDoc(
            collection(db, `users/${user.uid}/transactions`),
            transaction
        );
        console.log("Document written with ID: ", docRef.id);

        if (!many) toast.success("Transaction Added!");
        let newArr = transactions;
        newArr.push(transaction);
        setTransactions(newArr);
        calculateBalance();
        } catch (e) {
        console.error("Error adding document: ", e);

        if (!many) toast.error("Couldn't add transaction");
        }
    }

    useEffect(() => {
        //Get all docs from a collection
        fetchTransactions();
    }, [user]);

    useEffect(() => {
        calculateBalance();
    }, [transactions]);

    function calculateBalance() {
        let incomeTotal = 0;
        let expensesTotal = 0;

        transactions.forEach((transaction) => {
        if (transaction.type === "income") {
            incomeTotal += transaction.amount;
        } else {
            expensesTotal += transaction.amount;
        }
        });

        setIncome(incomeTotal);
        setExpense(expensesTotal);
        setTotalBalance(incomeTotal - expensesTotal);
    }

    async function fetchTransactions() {
        setLoading(true);
        if (user) {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        let transactionsArray = [];
        querySnapshot.forEach((doc) => {
            //doc.data() is never undefined for query doc snapshots
            transactionsArray.push(doc.data());
        });
        setTransactions(transactionsArray);
        console.log("Transaction Array", transactionsArray);
        toast.success("Transactions Fetched!");
        }
        setLoading(false);
    }

    let sortedTransactions = transactions.sort((a, b) => {
        return new Date(a.date) - new Date(b.date);
      });

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
                    isExpensesModalVisible={isExpensesModalVisible}  
                    onFinish={onFinish}
                />
                {transactions && transactions.length !== 0 ? (
                    <Charts sortedTransactions={sortedTransactions} />
                ) : (
                    <NoTransactions />
                )}
                <TransactionTable
                    transactions={transactions}
                    addTransaction={addTransaction}
                    fetchTransactions={fetchTransactions}
                />

            </ConfigProvider>
            
            
            </div>}
        </>
    )
}
export default DashBoard;
