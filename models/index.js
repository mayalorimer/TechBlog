const User = require('./User');
const Posts = require('./Posts');
const Comment = require('./Comment');


User.hasMany(Posts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Posts.belongsTo(User, {
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

Posts.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE'
});





module.exports = { User, Posts, Comment };