import React , { useEffect, useState} from "react";
import Cards from "../../components/Cards/Cards"
import "./Dashboard.css"
import {ConfigProvider, theme} from "antd"
import AddIncome from "../../components/Modals/AddIncome";
import AddExpenses from "../../components/Modals/AddExpenses";
import { useTheme } from "../../context/ThemeContext";
import { toast } from 'react-toastify';
import {useAuthState} from "react-firebase-hooks/auth"
import {auth,db,doc} from "../../firebase"
import { addDoc,collection,getDocs,query, deleteDoc } from "firebase/firestore";
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

    //Expense add Modal display
    const showExpensesModal= () => {  
        setIsExpenseModalVisible(true);
    };

    //Income add Modal display
    const showIncomeModal = () => {
        setIsIncomeModalVisible(true);
    };

    //Modal hide
    const cancleExpensesModal = () => {
        setIsExpenseModalVisible(false);
    };

    //Modal hide
    const cancleIncomeModal = () => {
        setIsIncomeModalVisible(false);
    };

    //Reset the whole finance
    const resetAllTransactions=async (e) => {
        try {
          const docRef = doc(db, `users/${user.uid}`);
          const subcollectionRef = collection(docRef, "transactions");
    
          const subcollectionSnapshot = await getDocs(subcollectionRef);
    
          subcollectionSnapshot.forEach(async (subDoc) => {
            await deleteDoc(subDoc.ref);
          });
          window.location.reload();
          toast.success("Reset successfully.");
        } catch (error) {
          toast.error("Error while Reset");
        }
      };

    //Submitting Transaction details from Modal
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

    //Adding all the Transactions to firestore db
    async function addTransaction(transaction,many) {
        try {
         await addDoc(
            collection(db, `users/${user.uid}/transactions`),
            transaction
        );

        if (!many) toast.success("Transaction Added!");
        let newArr = transactions;
        newArr.push(transaction);
        setTransactions(newArr);
        calculateBalance();
        } catch (e) {
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

    //Callculating Balance
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

    //Fetching Transacctions from firestore db
    async function fetchTransactions() {
        setLoading(true);
        if (user) {
        const q = query(collection(db, `users/${user.uid}/transactions`));
        const querySnapshot = await getDocs(q);
        let transactionsArray = [];
        querySnapshot.forEach((doc) => {
            transactionsArray.push(doc.data());
        });
        setTransactions(transactionsArray);
        console.log("Transaction Array", transactionsArray);
        }
        setLoading(false);
    }

    //sorting all the transaction according to date
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
                resetAllTransactions={resetAllTransactions}
                totalBalance={totalBalance}
                income={income}
                expense={expense}
                user={user}
            />
            
            <ConfigProvider
                theme={{
                    //Implemeted theme for Ant Design Componenents
                    algorithm:darkMode?theme.darkAlgorithm: theme.compactAlgorithm,
                    
                    // Implement style throughout the Ant Design Componenents using token
                    token: {
                        colorPrimary: "rgb(164, 48, 231)",
                        borderRadius: 2,
                        fontSize: 14,
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
                    <>
                        <Charts sortedTransactions={sortedTransactions} />
                        <TransactionTable
                            transactions={transactions}
                            addTransaction={addTransaction}
                            fetchTransactions={fetchTransactions}
                        />
                    </>
                ) : (
                    <NoTransactions />
                )}
            </ConfigProvider>
            
            
            </div>}
        </>
    )
}
export default DashBoard;
