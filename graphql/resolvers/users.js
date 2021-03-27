const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const {SECRET} = require('../../config');
const {UserInputError} = require('apollo-server');
const  {validateRegisterInput} = require('../../utils/validators');

function generateToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username
      },
      SECRET,
      { expiresIn: '1h' }
    );
  }

module.exports = {
    Mutation: {
       
        async register(_,{registerInput: {username,email,password,confirmPassword}}){

            //validate user 
            const { valid, errors } = validateRegisterInput(
                username,
                email,
                password,
                confirmPassword
              );
              if (!valid) {
                throw new UserInputError('Errors', { errors });
              }

            //make sure there is not multiple user with same username  
            const user = await User.findOne({username:username});
            if(user){
                throw new  UserInputError('Username is taken', {
                    error:{
                        username: 'This username is taken'
                    }
                })
            }

             //register a user into the DB 
            password = await bcrypt.hash(password,12);
            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
              });
        
              const res = await newUser.save();
        
              const token = generateToken(res);
        
              return {
                ...res._doc,
                id: res._id,
                token
              };
        }
    }
}
