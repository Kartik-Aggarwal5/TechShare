const express = require("express");
const bodyParser = require("body-parser"); 
const authRouter = require('./routes/auth.js')
const profileRouter = require('./routes/Profile.js')
const User = require('./models/User');

const InitiateMongoServer = require("./config/db");
InitiateMongoServer();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())


app.get("/", (req, res) => {
  User.find({}).exec((error, users) => {
    if (error) {
      console.log(error)
      return res.send(500)
    } else {
      console.log("API Working!")
      return res.json({Allusers: users})
    }
  })
})
app.use('/auth', authRouter)
app.use('/Profile', profileRouter)

app.listen(PORT, (req,res) => {
  console.log(`Server Started at PORT ${PORT}`);
});



























// const mongoose = require('mongoose')


// const db = mongoose.connection
// const url = "mongodb://127.0.0.1:27017/projectDatabase"

// mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

// const Schema = mongoose.Schema
// const publicUserSchema = new Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     realname: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     matches: {
//         type: [String],
//         required: false
//     },
//     profilepic: {
//         type: String,
//         required: false,
//         default: ""
//     },
//     skills: {
//         type: [String],
//         required: false,
//     },
//     skills_to_learn: {
//         type: [String],
//         required: false
//     }
// }, {collection: 'publicUserCollection'})

// const publicUser = mongoose.model('publicUser', publicUserSchema)

// const userSchema = new Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     realname: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     likes: {
//         type: [String],
//         required: false,
//     },
//     dislikes: {
//         type: [String],
//         required: false,
//     },
//     matches: {
//         type: [String],
//         required: false
//     },
//     profilepic: {
//         type: String,
//         required: false,
//         default: ""
//     },
//     skills: {
//         type: [String],
//         required: false,
//     },
//     skills_to_learn: {
//         type: [String],
//         required: false
//     }
// }, {collection: 'authCollection'})
// const user = mongoose.model('user', userSchema)


// // setting up express and our app object
// const express = require('express')
// const app = express()
// const router = express.Router();

// app.use(express.json())
// app.use(express.urlencoded())

// const port = 3000
//  app.post("/", function(err, res) 
//  { res.status(200);
//   res.send('working');
//   var userDetails = new publicUser({
//     username: req.body.name,
//     realname: req.body.realname,
//     email: req.body.email,
//   });
//   userDetails.save((err) => {
//     if (err) {
//       res.status(400).json({error: err, message: "save error"})
//     } else {
//       res.status(200).json({message: "success"})
//     }
//   });
// });

// app.get("/", function (req, res) {
//   // GET "/" should return a list of all APOD images stored in our database
//   publicUser.find({}).exec((error, users) => {
//     if (error) {
//       console.log(error)
//       res.send(500)
//     } else {
//       res.json({users})
//     }
//   })
// });

// app.post("/add", function (req, res) {
//   // POST "/add" adds an APOD image to our database
// });

// app.delete("/delete", function (req, res) {
//   // DELETE "/delete" deletes an image according to the title
// });

// // CODE GOES Here

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`)
// })