const router = require('express').Router();
const { Posts, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/:id', withAuth, async (req, res) => {
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
  router.post('/post', withAuth, async (req, res) => {
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
router.post('/comment', withAuth, async (req, res) => {
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


// /api/post/:id
router.put('/:id', withAuth, async (req, res) => {
  console.log(req.params.id, "test");
  try{
    const updatedPost = await Posts.update({
      title: req.body.title,
      description: req.body.description
    }, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Posts.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  module.exports = router; 