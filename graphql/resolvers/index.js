const postsResolvers = require('./posts');
const usersResolvers = require('./users');

// all the query/mutation.subscription logic will come under here
module.exports = {
    Query: {
        ...postsResolvers.Query
    },

    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation
    },
}