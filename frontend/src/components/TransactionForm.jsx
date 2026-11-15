import { useState } from 'react';
import { categoryGroups } from '../data/categories';
import "./TransactionForm.css";



const initalFormData = {
    type: 'expense',
    title: '',
    amount: '',
    category: '',
    date: '',
}



function TransactionForm({ onHandleAdd }) {


    // =============================
    const [formData, setFormData] = useState(initalFormData);
    const [errors, setErrors] = useState({});
    const [submitError, setSubmitError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);



    // =============================
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }))

        if (errors[name]) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                [name]: '',
            }))
        }
    }


    // =============================
    function validateForm() {
        const newErrors = {};
        const cleanTitle = formData.title.trim();
        const amountValue = +formData.amount;

        if (!cleanTitle) {
            newErrors.title = 'Enter a transaction name.';
        }

        if (!formData.amount) {
            newErrors.amount = 'Enter an amount';
        } else if (amountValue <= 0) {
            newErrors.amount = 'Amount must be greater than zero.';
        }

        if (!formData.category) {
            newErrors.category = 'Select a category.';
        }

        if (!formData.date) {
            newErrors.date = 'Select a date.';
        }

        return newErrors;
    }


    // =============================
    async function handleSubmit(e) {
        e.preventDefault();

        if (isSubmitting) return;


        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const transData = {
            type: formData.type,
            title: formData.title.trim(),
            amount: +formData.amount,
            category: formData.category,
            date: formData.date,
        }


        setIsSubmitting(true);

        try {
            const wasSaved = await onHandleAdd(transData);

            if (!wasSaved) {
                setSubmitError(
                    "Something went wrong. Refresh the page and check your transactions before trying again."
                );
                return;
            }

            setFormData(initalFormData);
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <section className="transaction-panel" aria-labelledby="form-title">
            <div className="transaction-panel__intro">
                <p className="transaction-panel__eyebrow">New transaction</p>

                <h2 className="transaction-panel__title" id="form-title">
                    Add income or expense
                </h2>

                <p
                    className="transaction-panel__description"
                    id="form-description"
                >
                    Record a transaction by entering its type, name, amount, category,
                    and date.
                </p>
            </div>

            <form
                className="transaction-form"
                aria-describedby="form-description"
                onSubmit={handleSubmit}
                noValidate
            >
                <fieldset className="transaction-form__type">
                    <legend className="transaction-form__legend">
                        Transaction type
                    </legend>

                    <div className="transaction-form__type-options">
                        <input
                            className="transaction-form__radio"
                            type="radio"
                            name="type"
                            id="income"
                            value="income"
                            checked={formData.type === 'income'}
                            onChange={handleChange}
                        />

                        <label
                            className="transaction-form__type-label transaction-form__type-label--income"
                            htmlFor="income"
                        >
                            <span className="transaction-form__type-mark" aria-hidden="true">
                                +
                            </span>
                            Income
                        </label>

                        <input
                            className="transaction-form__radio"
                            type="radio"
                            name="type"
                            id="expense"
                            value="expense"
                            checked={formData.type === "expense"}
                            onChange={handleChange}
                        />

                        <label
                            className="transaction-form__type-label transaction-form__type-label--expense"
                            htmlFor="expense"
                        >
                            <span className="transaction-form__type-mark" aria-hidden="true">
                                −
                            </span>
                            Expense
                        </label>
                    </div>
                </fieldset>

                <div className="transaction-form__field">
                    <label className="transaction-form__label" htmlFor="title">
                        Transaction name
                    </label>

                    <input
                        className="transaction-form__input"
                        type="text"
                        id="title"
                        name="title"
                        placeholder="e.g. Monthly salary"
                        maxLength="60"
                        autoComplete="off"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.title)}
                        aria-describedby={errors.title ? "title-error" : undefined}
                    />

                    {
                        errors.title && (
                            <p
                                className="transaction-form__error"
                                id="title-error"
                                role="alert"
                            >
                                {errors.title}
                            </p>
                        )
                    }
                </div>

                <div className="transaction-form__field">
                    <label className="transaction-form__label" htmlFor="amount">
                        Amount
                    </label>

                    <div className="transaction-form__amount">
                        <span
                            className="transaction-form__currency"
                            aria-hidden="true"
                        >
                            €
                        </span>

                        <input
                            className="transaction-form__input transaction-form__input--amount"
                            type="number"
                            id="amount"
                            name="amount"
                            placeholder="0.00"
                            min="0.01"
                            step="0.01"
                            inputMode="decimal"
                            required
                            value={formData.amount}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.amount)}
                            aria-describedby={errors.amount ? "amount-error" : undefined}
                        />

                        {errors.amount && (
                            <p
                                className="transaction-form__error"
                                id="amount-error"
                                role="alert"
                            >
                                {errors.amount}
                            </p>
                        )}
                    </div>
                </div>

                <div className="transaction-form__field">
                    <label className="transaction-form__label" htmlFor="category">
                        Category
                    </label>

                    <select className="transaction-form__select" id="category" name="category"
                        required
                        value={formData.category}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.category)}
                        aria-describedby={
                            errors.category ? "category-error" : undefined
                        }>

                        <option value="" disabled>
                            Select a category
                        </option>

                        {categoryGroups.map((group) => (
                            <optgroup key={group.label} label={group.label}>
                                {group.categories.map((category) => (
                                    <option key={category.value} value={category.value}>
                                        {category.label}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>

                    {errors.category && (
                        <p
                            className="transaction-form__error"
                            id="category-error"
                            role="alert"
                        >
                            {errors.category}
                        </p>
                    )}
                </div>

                <div className="transaction-form__field">
                    <label className="transaction-form__label" htmlFor="date">
                        Date
                    </label>

                    <input
                        className="transaction-form__input"
                        type="date"
                        id="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.date)}
                        aria-describedby={errors.date ? "date-error" : undefined}
                    />

                    {errors.date && (
                        <p
                            className="transaction-form__error"
                            id="date-error"
                            role="alert"
                        >
                            {errors.date}
                        </p>
                    )}
                </div>

                <div className="transaction-form__actions">

                    <button className="transaction-form__submit" type="submit" disabled={isSubmitting}>
                        <span aria-hidden="true">+</span>
                        {isSubmitting ? "Saving…" : "Add transaction"}
                    </button>

                    {submitError && <p className="transaction-load-error" role="alert">{submitError}</p>}
                </div>
            </form>
        </section>
    )
}



export default TransactionForm