import { useState, useEffect } from "react";
import Header from "./components/Header";
import FinanceSummary from './components/FinanceSummary';
import TransactionForm from './components/TransactionForm';
import TransactionList from "./components/TransactionList";
import "./App.css";




function App() {

    const [transactions, setTransaction] = useState([]);
    const [loadError, setLoadError] = useState('');
    const [deleteError, setDeleteError] = useState('');


    useEffect(() => {

        async function loadTransactions () {
            try {
                
                const response = await fetch('/api/v1/transactions');

                if (!response.ok) {
                    throw new Error(`Could not load transactions. HTTP ${response.status}`);
                };

                const result = await response.json();


                const loadedTransactions = result.data.transactions.map(transaction => ({
                    ...transaction,
                    id: transaction._id,
                    date: transaction.date.slice(0, 10),
                }));


                setTransaction(loadedTransactions);

            } catch (error) {
                console.error(error);
                setLoadError('Could not load transactions. Refresh the page to try again.');
            }
        };

        loadTransactions();

    }, []);



    // ===============================
    async function handleAdd (transactionData) {

        try {
            
            const response = await fetch('/api/v1/transactions', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(transactionData)
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || `HTTP ${response.status}`);
            };


            const saved = result.data.transaction;
            const transaction = {
                ...saved,
                id: saved._id,
                date: saved.date.slice(0, 10),
            };

            setTransaction((prev) => [transaction, ...prev]);
            return true;

        } catch (error) {
            console.error(error);
            return false;
        }
    };


    // ===============================
    async function handleDelete (id) {
        
        setDeleteError('');

        try {
            
            const response = await fetch(`/api/v1/transactions/${id}`, {
                method: "DELETE",
            });


            if (!response.ok) {
                throw new Error(`Could not delete transaction. HTTP ${response.status}`);
            };

            setTransaction(prev => {
                return prev.filter(transaction => transaction.id !== id);
            });

        } catch (error) {
            console.error(error);
            setDeleteError('Could not confirm deletion. Refresh the page to check your transactions.');
        }
    }



    return (
        <div className="app">
            <main className="app__content">
                <Header />
                <FinanceSummary transactions={transactions} />
                <TransactionForm onHandleAdd={handleAdd} />

                {
                    (loadError || deleteError) ? 
                    (
                        <p className="transaction-load-error" role="alert">{loadError || deleteError}</p>
                    ) 
                    
                    : 

                    (
                        <TransactionList transactions={transactions} handleDelete={handleDelete} />
                    )
                }
                
            </main>
        </div>
    )
}

export default App