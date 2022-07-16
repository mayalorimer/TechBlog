const router = require('express').Router();
const { Posts, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

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
                attributes: ['id', 'comment', 'post_id', 'user_id', 'dateCreated'],
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

 // /api/post/post
  router.post('/post', async (req, res) => {
    try {
      const newComment = await Posts.create({
        title: req.body.title,
        description: req.body.description,
        user_id: req.session.user_id
      });
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  // /api/post/comment
router.post('/comment', async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment: req.body.comment,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});






  module.exports = router; 