import express from 'express';
import cors from 'cors';
import transactionRouter from './routes/transactionRoutes.js';


const app = express();

app.use(cors({ origin: "https://https://expense-tracker-8aoo.onrender.com" }));

app.use(express.json());


app.use('/api/v1/transactions', transactionRouter);



export default app;






















