const {gql} = require('apollo-server');

//All the type definitions for the graphql query/mutatuin/subscription will come here 
// type --> is to define a type of something that is returned
// input --> is the type for something that is passed as a paramter 
module.exports = gql`

type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }

    type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

    input RegisterInput {
        username:String!,
        password:String!,
        confirmPassword:String!,
        email:String!
    },

    type Query{
        getPosts: [Post]
    },

    type Mutation{
        register(registerInput: RegisterInput): User!
    }
`;