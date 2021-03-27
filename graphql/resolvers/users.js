const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const {SECRET} = require('../../config');


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
        async register(_,{registerInput: {username,email,password,confirmpassword}}){
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
