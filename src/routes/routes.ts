import express from 'express';
import usersRouter from './usersRouter';
import authRouter from './authRouter';
const router = express.Router();

router.use('/users',usersRouter);
router.use('/auth', authRouter);

router.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Page not found'
    });
});


export default router;