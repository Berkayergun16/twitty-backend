import express, {Express,Request,Response} from 'express';
import usersRouter from './usersRouter';
const router = express.Router();

router.use('/users',usersRouter);


export default router;