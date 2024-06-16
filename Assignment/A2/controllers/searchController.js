const Blog = require('../models/Blog');

const searchController = {
  getSuggestions: async (req, res) => {
    try {
      const letter = req.params.letter;
      
      const suggestions = await Blog.find({
        title: { $regex: letter, $options: 'i' },
      });

      res.json({ suggestions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
module.exports=searchController;