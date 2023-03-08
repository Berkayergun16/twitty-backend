import express from 'express';
import { getAccessToRoute } from '../middlewares/auth';
import {loginUser,registerUser} from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;