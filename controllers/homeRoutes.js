const router = require('express').Router();
const { User, Posts } = require('../models');


 router.get('/', async (req, res) => {
    try {
      const postData = await Posts.findAll({
        include: [
            {
                model: User,
                attributes: ['username'],
            },
        ],
      });
  
      const posts = postData.map((project) => project.get({ plain: true }));
      res.render('homepage', {
        posts
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }); 
/* 
  router.get('/', async (req, res) => {
    res.render('homepage');
  }); */


// render the login handlebar page
router.get('/login', (req, res) => {
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });


module.exports = router; 