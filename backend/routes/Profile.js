const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/User')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const isImageUrl = require('is-image-url');
const PublicUser = require('../models/PublicUser')

// TODO: save this secret in some environment variable that isn't public (or obfuscate code)
const secretKey = "randomSecretVal"

router.use(verifyAuthToken)

router.route('/myprofile')
    .get(async (req, res) => {
        User.findById(req.user.uid, (err, userProfile) => {
            if (err) res.json(err)
            res.json(userProfile)
        
        })
    })

router.route('/updateProfilePic')
    .post((req, res) => {
        let picture = req.body.pfp
        console.log("UPDATE PROFILE PIC")
        console.log(picture)
        if (picture != "") {
            if (isImageUrl(picture)) {
                User.findByIdAndUpdate(req.user.uid, { profilepic: picture }, (err, result) => {
                    if (err) {
                        res.send(err)
                    } else {
                        console.log("found")
                        res.json({message: "success", result})
                    }
                })
            } else {
                res.statusCode(404)
            } 
        } else {
            res.statusCode(404)
        }
        

    }
)

//user joins event
router.route('/like')
    .put((req, res) => {
        User.findByIdAndUpdate(req.body.id, {$push: {'likes': req.body.username}}, (err, result) => {
            if (err) {
                res.send(err)
            } else {
                console.log("found")
                res.json(result)
            }
        })
    })

router.route("/dislike")
    .put((req, res) => {
        User.findByIdAndUpdate(req.body.id, {$push : {"dislikes": [req.body.username]}}, (err, result) => {
            if (err) { 
                res.send(err)
            } else {
                res.json(result)
            }
        })
    })


router.route('/get-people')
    .get((req, res) => {
        User.findById(req.query.id, (err, userProfile) => {
            const allProfiles = {
                profiles: []
            }
            PublicUser.find({'_id': { $nin: userProfile.likes}}, (err, Profiles) => {
                for (const profile of Profiles) {
                    if (!userProfile.dislikes.includes(profile.username)) {
                        allProfiles.profiles.push(profile)
                    } 
                }
                res.json(allProfiles)
            })
            
        })
    })

// router.route("/create")
//     .put((req, res) => {
//         User.findByIdAndUpdate(req.body.id, {$push: {"myEvents": req.body.event}}, (err, userProfile) => {
//             if (err) {
//                 res.send(err)
//             } else {
//                 res.json(userProfile)
//             }
//         })
//     })

// router.route("/get-myevents")
//     .get((req, res) => {
//         User.findById(req.query.id, (err, user) => {
//             Event.find({'_id': {$in: user.myEvents}}, (err, Events) => {
//                 if (err) {
//                     res.send(err)
//                 } else {
//                     res.json(Events)
//                 }
//             })
//         })
//     })
// middleware function that can be added to each route where a user is required (then inside the route you can access the user and check their account)
// on postman, send in the auth token in the form "Bearer <token>" in the request headers
function verifyAuthToken(req, res, next) {
    const tokenString = req.headers['authorization']
    if (tokenString) {
        const token = tokenString.split(' ')[1]
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                console.log("FAKE")
              return res.sendStatus(403)
            } 
            req.user = user
            next() 
          })
    } else {
        return res.sendStatus(403)
    }
}


module.exports = router