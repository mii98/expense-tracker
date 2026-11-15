import "./FinanceSummary.css"



function FinanceSummary({ transactions }) {
    
    // ========================
    const totalIncome = transactions.reduce((acc, curr) => {

        if (curr.type === 'income') {
            return acc + curr.amount;
        }

        return acc;
    }, 0)
    
    
    // ========================
    const totalExpenses = transactions.reduce((acc, curr) => {
        
        if (curr.type === 'expense') {
            return acc + curr.amount;
        };

        return acc;
    }, 0);
    

    // ========================
    const total = totalIncome - totalExpenses;
    

    return (
        <section className="finance-summary" aria-labelledby="summary-title">
            <div className="finance-summary__heading">
                <div>
                    <p className="finance-summary__eyebrow">Overview</p>
                    <h2 className="finance-summary__title" id="summary-title">
                        Financial summary
                    </h2>
                </div>

                <p className="finance-summary__description">
                    Your income, expenses, and current balance at a glance.
                </p>
            </div>

            <div className="finance-summary__grid">
                <article className="summary-card summary-card--balance">
                    <div className="summary-card__header">
                        <h3 className="summary-card__title">Current balance</h3>

                        <span className="summary-card__mark" aria-hidden="true">
                            =
                        </span>
                    </div>

                    <p className="summary-card__amount">€{total.toFixed(2)}</p>
                    <p className="summary-card__description">Income minus expenses</p>
                </article>

                <article className="summary-card summary-card--income">
                    <div className="summary-card__header">
                        <h3 className="summary-card__title">Total income</h3>

                        <span className="summary-card__mark" aria-hidden="true">
                            +
                        </span>
                    </div>

                    <p className="summary-card__amount">€{totalIncome.toFixed(2)}</p>
                    <p className="summary-card__description">Money added</p>
                </article>

                <article className="summary-card summary-card--expense">
                    <div className="summary-card__header">
                        <h3 className="summary-card__title">Total expenses</h3>

                        <span className="summary-card__mark" aria-hidden="true">
                            −
                        </span>
                    </div>

                    <p className="summary-card__amount">€{totalExpenses.toFixed(2)}</p>
                    <p className="summary-card__description">Money spent</p>
                </article>
            </div>
        </section>
    )
}

export default FinanceSummary