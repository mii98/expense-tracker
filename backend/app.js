import express from 'express';
import transactionRouter from './routes/transactionRoutes.js';


const app = express();
app.use(express.json());


app.use('/api/v1/transactions', transactionRouter);



export default app;






















