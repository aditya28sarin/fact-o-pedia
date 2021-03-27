const {AuthenticationError, UserInputError} = require('apollo-server');

const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');


module.exports = {
    Query :{
        async getPosts(){
             try{
                 const posts = await Post.find().sort({_id:-1});
                 return posts;
             }catch(err){
                 throw new Error(err);
             }
         },

         async getPost(_, {postId}){
            try{
                const post = await Post.findById(postId);
                if(post){
                    return post;
                }else{
                    throw new Error("Post not found");
                }
            }catch(err){
                throw new Error(err);
            }
         }
     },

     Mutation: {
         async createPost (_,{body}, context){
            const user = checkAuth(context);

            if(arguments.body.trim() === ''){
                throw new Error('Post body cannot be empty');
            }
            console.log(user);

            const newPost = new Post({
                body:body,
                user: user.id,
                username:user.username,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();

            return post;
         },

         async deletePost(_,{postId}, context){
            const user = checkAuth(context);

            try{
                const post = await Post.findById(postId);

                if(user.username === post.username)
                {
                    await post.delete();
                    return 'post deleted successfully';
                }else{
                    throw new AuthenticationError('Action not allowed');
                }
            }catch(err){
                throw new Error(err);
            }
         },

         async likePost(_, { postId }, context) {
            const { username } = checkAuth(context);
      
            const post = await Post.findById(postId);
            if (post) {
              if (post.likes.find((like) => like.username === username)) {
                // Post already likes, unlike it
                post.likes = post.likes.filter((like) => like.username !== username);
              } else {
                // Not liked, like post
                post.likes.push({
                  username,
                  createdAt: new Date().toISOString()
                });
              }
      
              await post.save();
              return post;
            } else throw new UserInputError('Post not found');
          }
     }
}