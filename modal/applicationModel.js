const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    jobTitle : {
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    qualification : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    phone : {
        type: String,
        required: true,
    },
    coverletter : {
        type: String,
        required: true,
    },
    resume : {
        type: String,
        required: true,
    },
})

const applications = mongoose.model('application',applicationSchema)

module.exports = applications