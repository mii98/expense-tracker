import TransactionItem from "./TransactionItem.jsx"
import "./TransactionList.css"




function TransactionList({ transactions, handleDelete }) {


    return (
        <section className="transaction-list" aria-labelledby="transactions-title">
            <div className="transaction-list__heading">
                <div>
                    <p className="transaction-list__eyebrow">Recent activity</p>

                    <h2 className="transaction-list__title" id="transactions-title">
                        Transactions
                    </h2>
                </div>

                <span className="transaction-list__count">{transactions.length} {transactions.length === 1 ? 'transaction' : 'transactions'} </span>
            </div>

            {transactions.length > 0 ? (

                <ul className="transaction-list__items">

                    {transactions.map((transaction) => (
                        <li key={transaction.id}>

                            <TransactionItem
                                id={transaction.id}
                                type={transaction.type}
                                title={transaction.title}
                                amount={`€${transaction.amount.toFixed(2)}`}
                                category={transaction.category}
                                date={transaction.date}
                                dateTime={transaction.date}
                                handleDelete={handleDelete}
                            />
                        </li>
                    ))}

                </ul>
                
            ) : (
                <p className="transaction-list__empty">
                    No transactions yet. Add your first transaction above.
                </p>
            )}
        </section >
    )
}

export default TransactionList