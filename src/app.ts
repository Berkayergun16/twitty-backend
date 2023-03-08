import express, { Express } from 'express';
import dotenv from 'dotenv';
import mainRouter from './routes/routes';
import connectToDb from './config/database/connectToDb';

const app: Express = express();

dotenv.config();
connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', mainRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

