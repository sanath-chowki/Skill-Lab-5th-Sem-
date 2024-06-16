
const Blog = require('../models/Blog');

const aggController = {

  getPerformance: async (req, res) => {
    try {
      const result = await Blog.find().explain('executionStats');
      res.json(result);
    } catch (error) {
      console.error('Error performing analysis:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getBlogsForUsers: async (req, res) => {
    try {
      const isRegisteredUser = req.user && !req.user.subscribed;
  
      console.log('isRegisteredUser:', isRegisteredUser);
  
      const pipeline = [
        {
          $addFields: {
            content: {
              $cond: {
                if: {
                  $and: [
                    isRegisteredUser,
                    { $ne: ['$content', null] }, 
                  ],
                },
                then: '$content',
                else: null,
              },
            },
          },
        },
        {
          $project: {
            title: 1,
            content: 1,
          },
        },
        
      ];
  
      const blogs = await Blog.aggregate(pipeline).exec();
  
      console.log('Fetched blogs:', blogs);
  
      res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  
      
  getReviewsAndRating: async (req, res) => {
    try {
      const pipeline = [
        {
          $unwind: '$reviews',
        },
        {
          $group: {
            _id: '$_id',
            totalReviews: { $sum: 1 },
            overallRating: { $avg: '$reviews.rating' },
          },
        },
        {
          $project: {
            _id: 1,
            totalReviews: 1,
            overallRating: { $round: ['$overallRating', 2] },
          },
        },
      ];

      const result = await Blog.aggregate(pipeline).exec();
      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getBlogsInDateRange: async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const pipeline = [
        {
          $match: {
            createdAt: {
              $gte: new Date(startDate),
              $lte: new Date(endDate),
            },
          },
        },
      
      ];

      const blogs = await Blog.aggregate(pipeline).exec();
      res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getBlogsByCategory: async (req, res) => {
    try {
      const { category } = req.params;
      const pipeline = [
        {
          $match: {
            category,
          },
        },
        
      ];

      const blogs = await Blog.aggregate(pipeline).exec();
      res.json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = aggController;
