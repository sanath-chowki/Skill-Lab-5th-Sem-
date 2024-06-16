const Blog = require('../models/Blog');

const blogController = {
  getAllBlogs: async (req, res) => {
    try {
      const blogs = await Blog.find();
      res.json({ blogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

 
  createBlog: async (req, res) => {
    try {
      const { title, content } = req.body;
      const authorId = req.cookies.userId; // Use the userId from the cookie

      const newBlog = await Blog.create({ title, content, author: authorId });
      res.json({ message: 'Blog created successfully.', blog: newBlog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getBlogByAuthorId: async (req, res) => {
    try {
      const authorId = req.params.authorId;
      const blogs = await Blog.find({ author: authorId });
      res.json({ blogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = blogController;