import dotenv from 'dotenv';
import app from './app.js';
import mongoose from 'mongoose';

dotenv.config();

const DB = process.env.DATEBASE.replace('<db_password>', process.env.DATEBASE_PASSWORD);



const port = process.env.PORT || 3000;

mongoose.connect(DB).then(() => {
    console.log('DB connected!');

    app.listen(port, () => {
        console.log(`Server is running on port ${port}...`);
    })
})
.catch((error) => {
    console.error("Database connection failed:", error.message);
})




