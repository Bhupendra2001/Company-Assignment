const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fnanme : String,
    lname : String,
    
    email : String,
    password : String,
    admin : {
        type : Boolean,
        default : false
    }
},{timestamps : true}) 

module.exports = mongoose.model('user', userSchema)