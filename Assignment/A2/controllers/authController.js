const Author = require('../models/Author');

const authController = {
  
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
      const author = await Author.findOne({ username, password });

      if (!author) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }
      res.cookie('userId', author.id, { httpOnly: true });
      res.json({ message: 'Login successful.', author });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  register: async (req, res) => {
    try {
      const {id, username, password,subscribed } = req.body;
      const existingAuthor = await Author.findOne({ username });
      if (existingAuthor) {
        return res.status(400).json({ error: 'Username already exists.' });
      }
      const newAuthor = await Author.create({id, username, password,subscribed });
      res.json({ message: 'Registration successful.', author: newAuthor });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },


    getAllUsers: async (req, res) => {
      try {
        
        const users = await Author.find();
        res.json(users);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    deleteUser: async (req, res) => {
      try {
        
        const userId = req.params.userId;
        const user = await Author.findById(userId);
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        await Author.findByIdAndDelete(userId);
        
        res.json({ message: 'User deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
    getUserById: async (req, res) => {
      try {
        
        const userId = req.params.userId;
  
        
        const user = await Author.findById(userId);
  
        if (!user) {
          return res.status(404).json({ error: 'User not found' });
        }
  
        res.json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    },
  
};

module.exports = authController;