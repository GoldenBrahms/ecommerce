const User = require('../models/user');
const UserInvite = require('../models/user_invite');
const jwt = require('jsonwebtoken'); // generate sign token
const jwd = require('jsonwebtoken'); // generate sign token
const expressJwt = require('express-jwt'); //for authorization check
const { errorHandler } = require('../helpers/dbErrorHandlers');

exports.signup = (req, res) => {
    console.log("req.body", req.body)
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            console.log("erreur")
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.salt = undefined
        user.hashed_password = undefined
        res.json({
            user
        });
    })
};
exports.userinvite = (req, res) => {
    console.log("req.body", req.body)
    const user = new UserInvite(req.body)
    console.log(user)
    user.save((error, user) => {
        if (error) {
            console.log("erreur")
            return res.status(400).json({
                error: "mierda"
            });
        }
        res.json({
            user
        });
    })
   
};

exports.signin = (req, res) => {
    // find user based on email
    const {email, password} = req.body
    User.findOne({email}, (error, user) => {
        if (error || !user){
            return res.status(400).json({
                error: 'User with thah email does no t exists'
            })
        }
        // if user is found make sur the email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            })
        }

        //generate a sign token with used id and secret
        const token = jwt.sign({ _id: user._id}, process.env.JWT_SECRET)
        // persist token as 't' in cookie with expiry date
        res.cookie('t', token, {expire: new Date() + 9999})
        //return response with user and token to frontend client
        const {_id, name, prename, email, role} = user
        return res.json({ token, user: {_id, name, prename, email, role}})
    })
}

exports.signout = (req, res) => {
    res.clearCookie('t')
    res.json({ message: "Signout Success"})
}


exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
  });


  exports.isAuth = (req, res, next) => {
      let user = req.profile && req.auth && req.profile._id == req.auth._id;
      console.log("hello")
        if (!user) {
            return res.status(403).json({
                error: "Access denied"
            });
        }
      next();
  };

  exports.isAdmin = (req, res, next) => {
      if (req.profile.role === 0) {
          return res.status(403).json ({
              error: 'Admin ressource! Acces denied'
          })
      }
      next();
  }