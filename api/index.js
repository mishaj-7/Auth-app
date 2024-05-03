import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
import userRoutes from './routes/user.route.js'

mongoose.connect(process.env.MONGO).then(() => {
     console.log('databse connected...')
}).catch((err) => {
    console.log(err);
 })

const app = express();

app.listen(3001, () => {
    console.log('server listening on port 3001');
});

app.use('/api/user', userRoutes);
