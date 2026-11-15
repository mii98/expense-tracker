import { useState } from "react"
import "./TransactionItem.css"

function TransactionItem({
    id,
    type,
    title,
    amount,
    category,
    date,
    dateTime,
    handleDelete,
}) {

    const sign = type === "income" ? "+" : "−";

    const [isDeleting, setIsDeleting] = useState(false);


    async function handleDeleteClick () {
        if (isDeleting) return;
        
        setIsDeleting(true);

        try {
            await handleDelete(id);
        } finally {
            setIsDeleting(false);
        }
    }
    

    return (
        <article className="transaction-item" data-type={type}>
            <span className="transaction-item__mark" aria-hidden="true">
                {sign}
            </span>

            <div className="transaction-item__content">
                <div className="transaction-item__heading">
                    <h3 className="transaction-item__title">{title}</h3>

                    <span className="transaction-item__category">{category}</span>
                </div>

                <time className="transaction-item__date" dateTime={dateTime}>
                    {date}
                </time>
            </div>

            <div className="transaction-item__side">
                <p
                    className="transaction-item__amount"
                    aria-label={`Amount: ${sign}${amount}`}
                >
                    {sign}
                    {amount}
                </p>

                <div className="transaction-item__actions">
                    <button
                        className="transaction-item__button transaction-item__button--delete"
                        type="button"
                        aria-label={`${isDeleting ? "Deleting" : "Delete"} ${title}`}
                        onClick={handleDeleteClick}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Deleting…" : "Delete"}
                    </button>
                </div>
            </div>
        </article>
    )
}

export default TransactionItem