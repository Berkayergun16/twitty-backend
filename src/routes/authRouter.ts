import express from 'express';
import { getAccessToRoute } from '../middlewares/auth';
import {loginUser,logoutUser,registerUser} from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', getAccessToRoute, logoutUser);

export default router;