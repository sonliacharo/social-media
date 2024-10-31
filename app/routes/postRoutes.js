const express = require('express');
const PostagemController = require('../controllers/postController');
const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/post', verifyToken, PostagemController.createPost);
router.delete('/post/:id', verifyToken, PostagemController.deletePost);

module.exports = router;
