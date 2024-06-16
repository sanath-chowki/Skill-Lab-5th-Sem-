const Blog = require("../models/Blog");
const NodeCache = require("node-cache");
const blogCache = new NodeCache();

const blogController = {
  getAllBlogs: async (req, res) => {
    try {
      const cachedBlogs = blogCache.get("allBlogs");

      if (cachedBlogs) {
        console.log("Retrieving from cache");
        res.json({ blogs: cachedBlogs });
      } else {
        const blogs = await Blog.find();
        const blogsData = blogs.map((blog) => blog.toObject());
        blogCache.set("allBlogs", blogsData);
        console.log("Data stored in cache:", blogsData);

        res.json({ blogs: blogsData });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  createBlog: async (req, res) => {
    try {
      const { title, content, category, reviews } = req.body;
      const authorId = req.cookies.userId;
      const newBlog = await Blog.create({
        title,
        content,
        author: authorId,
        category,
      });

      if (reviews && Array.isArray(reviews)) {
        newBlog.reviews = reviews.map((review) => ({
          user: authorId,
          rating: review.rating,
        }));
        await newBlog.save();
      }

      res.json({ message: "Blog created successfully.", blog: newBlog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getBlogByAuthorId: async (req, res) => {
    try {
      const authorId = req.params.authorId;
      const blogs = await Blog.find({ author: authorId });
      res.json({ blogs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getBlogsByCategory: async (req, res) => {
    try {
      const category = req.params.category;
      const blogs = await Blog.find({ category });

      res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getBlogBySAuthorId: async (req, res) => {
    try {
      const authorId = req.params.authorId;
      const blogs = await Blog.find();

      if (req.user && req.user.subscribed) {
        res.json({ blogs });
      } else {
        const filteredBlogs = blogs.map((blog) => ({
          _id: blog._id,
          title: blog.title,
        }));
        res.json({ blogs: filteredBlogs });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = blogController;
