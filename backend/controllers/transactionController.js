import Transaction from '../models/transactionModel.js';



// ===============================
const getAllTransactions = async (req, res) => {

    try {
        
        const transactions = await Transaction.find();

        res.status(200).json({
            status: 'success',
            results: transactions.length,
            data: {
                transactions,
            }
        })

    } catch (error) {
        
        res.status(500).json({
            status: 'error',
            message: 'Could not load transactions.',
        })
    }
}



// ===============================
const createTransaction = async (req, res) => {

    try {

        const { type, title, amount, category, date } = req.body ?? {};

        const transaction = await Transaction.create({
            type,
            title,
            amount,
            category,
            date,
        });

        res.status(201).json({
            status: 'success',
            data: {
                transaction,
            }
        })
        

    } catch (error) {
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                status: 'fail',
                message: error.message,
            })
        };

        res.status(500).json({
            status: 'error',
            message: 'Could not create the transaction.',
        });
    }
}



// ===============================
const deleteTransaction = async (req, res) => {

    try {
        
        const transaction = await Transaction.findByIdAndDelete(req.params.id);

        if (!transaction) {
            return res.status(404).json({
                status: 'fail',
                message: 'Transaction not found.',
            })
        };


        res.status(204).send();

    } catch (error) {
        
        if (error.name === 'CastError') {
            return res.status(400).json({
                status: 'fail',
                message: 'Invalid transaction ID.',
            })
        };

        res.status(500).json({
            status: 'error',
            message: 'Could not delete the transaction.',
        });
    }
}




export { getAllTransactions, createTransaction, deleteTransaction };



// {
//   "type": "expense",
//   "title": "Namirnice",
//   "amount": 24.50,
//   "category": "food",
//   "date": "2026-11-07"
// }




























