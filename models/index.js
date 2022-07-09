const User = require('./User');
const Posts = require('./Posts');
const Comment = require('./Comment');
const Post = require('./Posts');

User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Project.belongsTo(User, {
    foreignKey: 'user_id'
}); 

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: "CASCADE"
})

Comment.belongsTo(Posts, {
    foreignKey: 'post_id',
    onDelete: "CASCADE"
})

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});





module.exports = { User, Posts, Comment };