const Author = require('../models/Author');

const authController = {
  
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const author = await Author.findOne({ username, password });

      if (!author) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }

      // Set a cookie with the author's ID
      res.cookie('userId', author._id, { httpOnly: true });

      res.json({ message: 'Login successful.', author });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  register: async (req, res) => {
    try {
      const { username, password } = req.body;
      const existingAuthor = await Author.findOne({ username });
      if (existingAuthor) {
        return res.status(400).json({ error: 'Username already exists.' });
      }
      const newAuthor = await Author.create({ username, password });
      res.json({ message: 'Registration successful.', author: newAuthor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = authController;