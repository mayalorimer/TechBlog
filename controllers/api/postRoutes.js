const router = require('express').Router();
const { Posts, User, Comment } = require('../../models');

router.get('/:id', async (req, res) => {
    try {
     const postData = await Posts.findByPk(req.params.id, {
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment', 'post_id', 'user_id'],
                include: {
                  model: User,
                  attributes: ['username']
                }
              }
        ]
     });
  
     const post = postData.get({ plain: true });
    // figure out where to send this data
     res.render('posts', {
      post,
      logged_in: req.session.logged_in,
     });
  
    } catch (err) {
      res.status(500).json(err); 
    }
  });



  module.exports = router; 