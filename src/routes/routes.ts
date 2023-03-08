import express from 'express';
import usersRouter from './usersRouter';
import authRouter from './authRouter';
const router = express.Router();

router.use('/users',usersRouter);
router.use('/auth', authRouter);


export default router;