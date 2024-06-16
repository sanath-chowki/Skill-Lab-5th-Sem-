
const Author = require('../models/Author');

const authenticationMiddleware = async (req, res, next) => {
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized - User ID not provided' });
  }

  try {

    const author = await Author.findOne({ id: userId });

    if (!author) {
      return res.status(401).json({ error: 'Unauthorized - Invalid user ID' });
    }
    req.user = { id: author.id, username: author.username, subscribed: author.subscribed };
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = authenticationMiddleware;
