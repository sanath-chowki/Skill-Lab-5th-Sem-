const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const authenticationMiddleware = require('../middleWares/authenticationMiddleware');


router.get('/', blogController.getAllBlogs);
router.post('/', express.json(), blogController.createBlog);
router.get('/:authorId', blogController.getBlogByAuthorId);
router.get('/category/:category', blogController.getBlogsByCategory);
router.get('/sub/:authorId', authenticationMiddleware, blogController.getBlogBySAuthorId);

module.exports = router;