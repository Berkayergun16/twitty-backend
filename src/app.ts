import express, {Express,Request,Response} from 'express';
import mainRouter from './routes/routes';

const app:Express = express();

const PORT = 5000;

app.use('/api',mainRouter);

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

