const mongoose = require('mongoose');

const NoticesSchema = new mongoose.Schema({
    topic: {
        type: String,
        required: [true, "Please provide a topic"],
    },

    date: {
        type: Date,
        default: Date.now
    },

    description:{
        type: String,
        required: [true, "Please provide a description"],
    }


});

const notice = mongoose.model('notices',NoticesSchema);
module.exports = notice;