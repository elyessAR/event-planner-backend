import express from 'express';
import { getPost, deletePost, getPosts, getPostsBySearch, createPost, updatePost, likePost } from '../controllers/posts.js';
import auth from '../middleware/auth.js';

const router = express.Router();
router.get('/', getPosts); // changing the order of these make a difference between router.get('/:id', getPost); and router.get('/search', getPostsBySearch);

router.get('/search', getPostsBySearch);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.get('/:id', getPost);

export default router;
