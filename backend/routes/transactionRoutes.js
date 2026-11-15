import express from 'express';
import { getAllTransactions, createTransaction, deleteTransaction } from '../controllers/transactionController.js';


const router = express.Router();



router.route('/').get(getAllTransactions).post(createTransaction)
router.route('/:id').delete(deleteTransaction)


export default router;



























