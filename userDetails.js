const mongoose = require("mongoose");
const {Schema} = mongoose

const userDetailsSchema = new Schema({
    fname: String,
    lname: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

const userDetails = mongoose.model('user', userDetailsSchema)

module.exports = userDetails