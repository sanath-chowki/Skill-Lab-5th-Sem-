
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/aggController');
const authenticationMiddleware = require('../middleWares/authenticationMiddleware');


// router.get('/registered-users', blogController.getBlogsForRegisteredUsers);
router.get('/performance', blogController.getPerformance);
router.get('/subscribed-users',authenticationMiddleware, blogController.getBlogsForUsers);
router.get('/reviews-rating', blogController.getReviewsAndRating);
router.get('/date-range', blogController.getBlogsInDateRange);
router.get('/category/:category', blogController.getBlogsByCategory);

module.exports = router;
