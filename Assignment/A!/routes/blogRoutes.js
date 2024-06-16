const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

const verify=function(req,res,next){
    let body=req.body;    
    
    if("title" in body){
        next();
    }
    else{
        res.json({"data":"Title required"});
    }
}

router.get('/', blogController.getAllBlogs);
router.post('/', verify,blogController.createBlog);
router.get('/:authorId', blogController.getBlogByAuthorId);

module.exports = router;