const {ApolloServer} = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require('mongoose');


const {MONGODB} = require('./config.js');
const Post = require('./models/Post');



//All the type definitions for the graphql query/mutatuin/subscription will come here 
const typeDefs = gql`

    type Post {
        id:ID!,
        body:String!,
        createdAt:String!,
        username:String!
    }

    type Query{
        getPosts: [Post]
    }
` 
// all the query/mutation.subscription logic will come under here
const resolvers = {
    Query :{
       async getPosts(){
            try{
                const posts = await Post.find();
                return posts;
            }catch(err){
                throw new Error(err);
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
});


mongoose.connect(MONGODB, {useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{
    console.log("MongoDB connected.")
    return server.listen({port:5000});
}).then(res=>{
    console.log(`Server running at ${res.url}`)
});