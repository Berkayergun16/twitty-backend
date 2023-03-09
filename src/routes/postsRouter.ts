import express from 'express';
import { getAccessToRoute } from '../middlewares/auth';
import { getAllPosts } from '../controllers/postsController';

const router = express.Router();

router.get('/all-posts', getAccessToRoute, getAllPosts);

export default router;