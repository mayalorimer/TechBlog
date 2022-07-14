const sequelize = require('../config/connection');
const { User, Posts, Comment } = require('../models');

const userData = require('./userData.json');
const postData = require('./postData.json');
const commmentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Posts.bulkCreate(postData, {
    individualHooks: true,
    returning: true,
  });

  await Comment.bulkCreate(commmentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();