const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true 
    },

    Subject : {
        type : String,
        required : true
    },

    Marks : {
        type : Number,
        required : true
    },

},{timestamps : true})

module.exports = mongoose.model('Student', StudentSchema)

