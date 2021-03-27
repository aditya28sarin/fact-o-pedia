const {gql} = require('apollo-server');

//All the type definitions for the graphql query/mutatuin/subscription will come here 
module.exports = gql`

    type Post {
        id:ID!,
        body:String!,
        createdAt:String!,
        username:String!
    }

    type Query{
        getPosts: [Post]
    }
`;