const {ApolloServer, PubSub } = require("apollo-server");
const mongoose = require('mongoose');


const {MONGODB} = require('./config.js');
const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs');

const pubsub = new PubSub();
const PORT = process.env.port || 5000;

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({req}) => ({req, pubsub})
});


mongoose.connect(MONGODB, {useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{
    console.log("MongoDB connected.")
    return server.listen({port:PORT});
}).then(res=>{
    console.log(`Server running at ${res.url}`)
}).catch(err=>{
    console.error(err);
});