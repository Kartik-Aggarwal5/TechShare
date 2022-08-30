const express = require('express')
const { check, validationResult } = require('express-validator');
const router = express.Router()
const User = require('../models/User')
const PublicUser = require('../models/PublicUser')
const isImageUrl = require('is-image-url');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const saltRounds = 1
// const res = require('express/lib/response');


router.post(
    '/register',
    async (req, res) => {
            console.log("requested register")
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array()
                });
            }

            // we look up user by username, not email
            User.findOne({ username: req.body.username}, async function (err, user) {
                if (err) {
                    res.status(400).json({error: err})
                } else {
                    if (user) {
                        return res.status(400).json({error: err, msg: "User already exists"})
                    } else {
                        const user = new User({
                            username: req.body.username,
                            password: req.body.password,
                            realname: req.body.realname,
                            email: req.body.email
                        })

                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);

                        // await user.save();

                        
                   
                        
                        // will change to profile
                        const publicUser = new PublicUser({
                            username: req.body.username,
                            realname: req.body.realname,
                            email: req.body.email
                        })
                        
                        let picture = req.body.pfp

                        if (picture != "") {
                            if (isImageUrl(picture)) {
                                user.profilepic = picture
                                publicUser.profilepic = picture
                            }
                        } 

                        // organized in this way so that we don't send two responses upon success
                        // save public profile first
                        publicUser.save((err)=>{
                            if (err) {
                                return res.status(400).json({error: err, message: "public user save error"})
                            } else {
                                // save account info as well now and return auth token for account
                                user.save((err)=>{
                                    if (err) {
                                        return res.status(400).json({error: err, message: "private account save error"})
                                    } else {
                                        const payload = {
                                            user: {
                                                id: user._id
                                            }
                                        };
                            
                                        jwt.sign(
                                            payload,
                                            "randomString", {
                                                expiresIn: 10000
                                            },
                                            (err, token) => {
                                                if (err) throw err;
                                                res.status(200).json({
                                                    token, message:  "success of saving private and public and sending token"
                                                });
                                            }
                                        );
                                    }
                    
                                });

                            }
            
                        });
                    }
                }
            })
        })
                    
                        


    router.post('/login',   async (req, res) => {
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
          return res.status(400).json({
            errors: errors.array(),
          });
        }
    
        const { username, password } = req.body;
        try {
          let user = await User.findOne({
            username,
          });
          if (!user)
            return res.status(400).json({
              message: 'User Not Exist',
            });
    
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch)
            return res.status(400).json({
              message: 'Incorrect Password !',
            });
    
          const payload = {
            user: {
              id: user._id,
            },
          };
    
          jwt.sign(
            payload,
            'randomString',
            {
              expiresIn: 3600,
            },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                token,
              });
            }
          );
        } catch (e) {
          console.error(e);
          res.status(500).json({
            message: 'Server Error',
          });
        }
      }
      )


      const auth = require('../middleware/verify');


router.get(
    '/myaccount',
    async (req,res) => {
      const token = req.header("token");
  if (!token) return res.status(401).json({ message: "Auth Error" });

    jwt.verify(token, "randomString", (err, user) => {
      if (err) {
        res.status(500).send({ message: "Invalid Token" });

      } else {
        req.user = user
        User.findById(req.user.id, (err, userAccount) => {
          if (err) {
            res.json({message: "not working", err})
          } else { res.json(userAccount)}
        })
      }

    } );
  //   req.user = decoded.user;
  //   req.user.findById(req.user.uid, (err, userAccount) => {
  //     if (err) {
  //          res.json({message: "not working", err})
  //         } else { res.json({msg: "hey", userAccount}) }
      
  
  // })
    }
)

function verifyIt(req,res,next) {
  const tokenString = req.headers['token']
  if (tokenString) {
    const token = tokenString.split(' ')[1]
    jwt.verify(token, "randomString", (err, user) => {
      if (err) {
        res.status(500).send({ message: "Invalid Token" });
      } 
      req.user = user
      next()

    })
  } else {
    return res.sendStatus(403)
  }
}

  
    module.exports = router
     