// Modules
import express from 'express';

// Controllers
import { getAllPosts , getSinglePost, createPost} from '../controllers/postsController';

// Middlewares
import { getAccessToRoute } from '../middlewares/auth';

const router = express.Router();
// Routers
router.get('/all-posts', getAccessToRoute, getAllPosts);
router.get('/:id', getAccessToRoute, getAllPosts);
router.post('/create-post', getAccessToRoute, createPost);

export default router;