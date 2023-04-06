import express from 'express';
import { getAllUsers, getUserById, updateUser, deleteUser, followUser} from '../controllers/usersController';
import { getAccessToRoute } from '../middlewares/auth';
const router = express.Router();


router.get('/', getAccessToRoute, getAllUsers);
router.get('/:id', getAccessToRoute, getUserById);
router.put('/:id', getAccessToRoute, updateUser);
router.delete('/:id', getAccessToRoute, deleteUser);

router.get('/follow/:id', getAccessToRoute, followUser);



export default router;