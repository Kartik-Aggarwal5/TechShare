const mongoose = require('mongoose')
const Schema = mongoose.Schema

const publicUserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    realname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    matches: {
        type: [String],
        required: false
    },
    profilepic: {
        type: String,
        required: false,
        default: ""
    },
    skills: {
        type: [String],
        required: false,
    },
    skills_to_learn: {
        type: [String],
        required: false
    }
}, {collection: 'publicUserCollection'})
// renamed to authCollection because of conflicts with mongo internal function
module.exports = mongoose.model('PublicUser', publicUserSchema)