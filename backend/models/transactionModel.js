import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({

    type: {
        type: String,
        required: [true, "A transaction must have a type."],
        enum: {
            values: ['income', 'expense'],
            message: "Type must be income or expense.",
        }
    },

    title: {
        type: String,
        required: [true, "A transaction must have a title."],
        trim: true,
        maxLength: [
            60,
            "A transaction title must have 60 characters or fewer.",
        ]
    },

    amount: {
        type: Number,
        required: [true, "A transaction must have an amount."],
        minLength: [0.01, "Amount must be greater than zero."],
    },

    category: {
        type: String,
        required: [true, "A transaction must have a category."],
        enum: {
            values: ["salary", "freelance", "investment", "gift", "housing", "food", "transport", "shopping", "health", "entertainment", "other"],
            message: "Please select a valid category.",
        }
    },

    date: {
        type: Date,
        required: [true, "A transaction must have a date."],
    }
});



const Transaction = mongoose.model('Transaction', transactionSchema);


export default Transaction;



































