import express from 'express';
import {getAllUsers,getUserById,updateUser,deleteUser,loginUser} from '../controllers/usersController';
import { getAccessToRoute } from '../middlewares/auth';
const router = express.Router();


router.get('/',getAccessToRoute,getAllUsers);
router.get('/:id',getAccessToRoute,getUserById);
router.put('/:id',getAccessToRoute,updateUser);
router.delete('/:id',getAccessToRoute,deleteUser);


router.post('/login', loginUser);


export default router;