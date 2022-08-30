const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')
const PublicUser = require('../models/PublicUser')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const isImageUrl = require('is-image-url');

// TODO: save this secret in some environment variable that isn't public (or obfuscate code)
const secretKey = "randomSecretVal"

router.route('/register')
    .post((req, res) => {
        console.log("requested register")

        User.findOne({ username: req.body.username}, function (err, user) {
            if (err) {
                res.status(400).json({error: err})
            } else {
                if (user) {
                    res.status(400).json({error: err})
                } else {
                    bcrypt.hash(req.body.password, saltRounds, function(err, hashedPwd) {
                        if (err) {
                            res.status(400).json({error: err, message: "encryption error"})
                        }
                        else {
                            const user = new User({
                                username: req.body.username,
                                password: hashedPwd,
                                realname: req.body.realname,
                                email: req.body.email
                            })

                            const publicUser = new PublicUser({
                                username: req.body.username,
                                realname: req.body.realname,
                                email: req.body.email
                            })


                            let picture = req.body.pfp
                            if (picture != "") {
                                if (isImageUrl(picture)) {
                                    user.profilepic = picture
                                }
                            } 
                            
                            user.save((err)=>{
                                if (err){
                                    res.status(400).json({error: err, message: "save error"})
                                }else{
                                    res.status(200).json({message: "success"})
                                }
                
                            });

                            publicUser.save((err)=>{
                                if (err){
                                    res.status(400).json({error: err, message: "save error"})
                                }else{
                                    res.status(200).json({message: "success"})
                                }
                
                            });
                        }
                    })
                    
                }
            }
        });


      
    }
)

router.route('/login')
    .post((req, res) => {
        console.log("requested login")
        const password = req.body.password
        User.findOne({ username: req.body.username}, function (err, user) {
            if (err) {
                res.status(400).json({error: err})
            } else {
                if (user) {
                    hashedPwd = user.password
                    bcrypt.compare(req.body.password, hashedPwd, function(err, correct) {
                        if (err) {
                            res.status(400).json({error: err})
                        } else {
                            if (correct) {
                                jwt.sign({uid: user.id}, secretKey, (err, token) => {
                                    res.status(200).json({message: "success", token: token, user: user})
                                })
                            } else {
                                res.status(401).json({error: "Incorrect Password!"})
                            }
                        }
                    });
                } else {
                    res.status(401).json({error: "Incorrect Username!"})
                }
            }
        });
        
    }
)



module.exports = router