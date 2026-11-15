import "./Header.css"

function Header() {
    return (
        <header className="header">
            <div className="header__mark" aria-hidden="true">
                €
            </div>

            <div className="header__content">
                <p className="header__eyebrow">Personal finance dashboard</p>

                <h1 className="header__title">Expense Tracker</h1>

                <p className="header__description">
                    Track your income, understand your expenses, and keep your finances
                    organized in one place.
                </p>
            </div>
        </header>
    )
}

export default Header