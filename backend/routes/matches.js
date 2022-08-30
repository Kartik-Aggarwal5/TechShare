// const express = require('express')
// const router = express.Router()
// const mongoose = require('mongoose')
// const Event = require('../models/Event');
// const User = require("../models/User")
// const jwt = require('jsonwebtoken')

// // TODO: save this secret in some environment variable that isn't public (or obfuscate code)
// const secretKey = "randomSecretVal"

// router.use('/create', verifyAuthToken)
// router.use('/signup', verifyAuthToken)

// // Create events
// router.route('/create')
//     .post(function (req, res, next) { 
        
//         const attributes = req.body

//         attributes['volunteers'] = []

//         const event = new Event(attributes);

//         event.save(function (err, Event) {
//             if (err) {
//                 res.send(err)
//                 console.log(err)
//             } else {
//                 console.log("successful create")
//                 res.json({message: "success", id: event._id})
//             }
//         });
//     })

// // Get events
// router.route('/get')
//     .get((req, res) => {
        
//         const query = req.query
//         console.log(req.params)
//         var idQuery = false

//         if ('startDate' in req.query) {
//             query['startDate'] = { $gt: req.query.startDate }
//             idQuery = true
//         }

//         if ('endDate' in req.query) {
//             query['endDate'] = { $lt: req.query.endDate }
//             idQuery = true
//         }
        
//         if ('tag' in req.query) {
//             query['tag'] = req.query.tag
//             idQuery = true
//         }
        
//         if (JSON.stringify(req.query) == JSON.stringify({})) {
//             idQuery = true
//         }

//         Event.find(req.query,).sort({'startDate': 'asc'}).exec((err, Event) => {
//             if (err) {
//                 console.log(err)
//                 res.sendStatus(404)
//             } else if (!idQuery) {
//                 console.log(`Single value for ID: ${Event[0]._id}`)
//                 res.json(Event)
//             } else {
//                 const currentDate = Date.now()
//                 const allEvents = {
//                     upcoming: [],
//                     ongoing: [],
//                     past: []
//                 }
//                 for (const event of Event) {
//                     if (event.startDate > currentDate) {
//                         allEvents.upcoming.push(event)
//                     } else if (event.endDate > currentDate) {
//                         allEvents.ongoing.push(event)
//                     } else {
//                         allEvents.past.push(event)
//                     }
//                 }
//                 res.json(allEvents)
//             }
//         })
//     })

// // Volunteer signup
// router.route('/signup')
//     .put((req, res) => {
//         Event.findByIdAndUpdate(req.body.id, {$push: {'volunteers': req.body.volunteer}}, (err, result) => {
//             if (err) {
//                 res.send(err)
//             } else {
//                 res.json(result)
//             }
//         })
//     })


// router.route('/leave')
//     .put((req, res) => {
//         Event.findByIdAndUpdate(req.body.id , {$pullAll: { volunteers: [req.body.volunteer]}}, (err, result) => {
//             if (err) {
//                 res.send(err)
//             } else {
//                 res.json(result)
//             }
//         })
//     })

// router.route('/delete')
//     .delete((req, res) => {
//         Event.findByIdAndDelete(req.query.id, (err) => {
//             if (err) res.send(err)
//             User.updateMany({}, {$pullAll: { events: [req.query.id]}}, (err) => {
//                 if (err) res.send(err)
//             })
//             User.updateMany({}, {$pullAll: {myEvents: [req.query.id]}}, (err) => {
//                 if(err) res.send(err)
//             })
//             res.json({succeeded: true})
//         })
//     })

// // middleware function that can be added to each route where a user is required (then inside the route you can access the user and check their account)
// // on postman, send in the auth token in the form "Bearer <token>" in the request headers
// function verifyAuthToken(req, res, next) {
//     const tokenString = req.headers['authorization']
//     if (tokenString) {
//         const token = tokenString.split(' ')[1]
//         jwt.verify(token, secretKey, (err, user) => {
//             if (err) {
//               return res.sendStatus(403)
//             } 
//             req.user = user
//             next() 
//           })
//     } else {
//         return res.sendStatus(403)
//     }
// }

// module.exports = router