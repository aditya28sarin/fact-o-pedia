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
    comments: [Comment]!
    likes: [Like]!
  }

  type Comment {
    id:ID!
    createdAt:String!
    username:String!
    body:String!
  }

  type Like{
    id:ID!
    createdAt:String!
    username:String!
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
        getPost(postId:ID!):Post
    },

    type Mutation{
        register(registerInput: RegisterInput): User!
        login(username:String!, password:String!): User!
        createPost(body:String!):Post!
        deletePost(postId:ID):String!
        createComment(postId:String!,body:String!): Post!
        deleteComment(postId:ID!, commentId:ID!):Post!
        likePost(postId:ID!):Post!
    }
`;