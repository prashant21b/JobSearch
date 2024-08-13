const mongoose = require('mongoose');
const { Schema } = mongoose;

const jobSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    postedOn: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    companyUrl: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    link: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
