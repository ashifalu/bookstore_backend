const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    jobTitle :{
        type: String,
        required: true
    },
    location :{
        type: String,
        required: true
    },
    jobType :{
        type: String,
        required: true
    },
    salary :{
        type: String,
        required: true
    },
    qualification :{
        type: String,
        required: true
    },
    experiance :{
        type: String,
        required: true
    },
    description :{
        type: String,
        required: true
    }
})

const jobs = mongoose.model('jobs',jobSchema)
module.exports = jobs