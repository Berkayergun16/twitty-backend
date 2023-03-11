import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, } from '../controllers/usersController';
import { getAccessToRoute } from '../middlewares/auth';
const router = express.Router();


router.get('/', getAccessToRoute, getAllUsers);
router.get('/:id', getAccessToRoute, getUserById);
router.put('/:id', getAccessToRoute, updateUser);
router.delete('/:id', getAccessToRoute, deleteUser);



export default router;