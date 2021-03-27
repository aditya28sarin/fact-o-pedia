const postsResolvers = require('./posts');
const usersResolvers = require('./users');
const commentResolvers =require('./comments');

// all the query/mutation.subscription logic will come under here
module.exports = {

    Post:{
        likeCount(parent){
            console.log(parent);
            return parent.likes.length;
        },
        
        commentCount(parent){
            console.log(parent);
            return parent.comments.length;
        }
    },

    Query: {
        ...postsResolvers.Query
    },

    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentResolvers.Mutation
    },

    Subscription: {
        ...postsResolvers.Subscription
    }
};