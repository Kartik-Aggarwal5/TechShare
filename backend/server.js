const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const router = express.Router()

const app = express()


const db = mongoose.connection

const cors = require('cors')
// const url = 'urlForAWSDatabaseEventually'
const url = "mongodb://127.0.0.1:27017/projectDatabase"
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })

// schema is created here

app.use(bodyParser.urlencoded())
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
const port = process.env.PORT || 3030 

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
//         type: [userSchema],
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

// const publicUser = mongoose.model('publicUsers', publicUserSchema)

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

// app.get("/", function (req, res) {
//     // GET "/" should return all users now for testing purposes.
//       publicUser.find().sort.exec((error, images) => {
//       if (error) {
//         console.log(error)
//         res.send(500)
//       } else {
//         res.json({})
//       }
//     })
//   })

// api is here

app.use(cors())
app.options('*', cors()) // Allow options on all resources










// CODE GOES Here

router.get('/', function (req, res) {
    res.json({hello : "hello"})
})

app.use("/", router)


const authRouter = require('./routes/auth.js')
app.use('/auth', authRouter)

const profileRouter = require('./routes/profile.js');
app.use('/profile', profileRouter)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})