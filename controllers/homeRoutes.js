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

  router.get('post/:id', async (req, res) => {
    try {
     const postData = await Posts.findByPk(req.params.id);
  
     const post = postData.get({ plain: true });
    // figure out where to send this data
     res.render('homepage', {
      post,
    //  logged_in: req.session.logged_in,
     });
  
    } catch (err) {
      res.status(500).json(err); 
    }
  });

  router.get('/dashboard', (req, res) => {
    // If the user is already logged in, redirect the request to another route
  //  if (req.session.logged_in) {
      res.render('dashboard');
  //    return;
  //  }

  //  res.redirect('/');
  
  }); 

  //get all posts based on a user ID

module.exports = router; 