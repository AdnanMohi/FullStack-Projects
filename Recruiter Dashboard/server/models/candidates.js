
const { Schema, model } = require('mongoose');

const candidateSchema = new Schema({
    jobName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    minSalary: {
        type: Number,
        required: true
    },
    maxSalary: {
        type: Number,
        required: true
    },
    minExperience: {
        type: Number,
        required: true
    },
    maxExperience: {
        type: Number,
        required: true
    }
    });

const Candidate = model('candidate', candidateSchema);

module.exports = Candidate;