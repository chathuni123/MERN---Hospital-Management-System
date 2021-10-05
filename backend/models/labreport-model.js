const mongoose = require("mongoose");


const LabreportSchema = new mongoose.Schema({

    testId: {
        type: Number,
        required: [true, "Please provide the test id"],
        length: 4,
    },
    chemistName: {
        type: String,
        required: [true, "Please provide test done chemist name"],
    },
    docName: {
        type: String,
        required: [true, "Please provide channeled doctor name"],
    },
    date: {
        type: Date,
        default: Date.now
    },
    testName: {
        type: String,
        required: [true, "Please provide a test name"],
    },
    patientName: {
        type: String,
        required: [true, "Please provide the patientName"],
    },

    patientEmail: {
        type: String,
        required: [true, "Please provide patient's email"],
        unique: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide a valid email"],
    },

    description: {
        type: String,
        required: [true, "Please provide a description"],
    }


});

const labreports = mongoose.model('labreports', LabreportSchema);
module.exports = labreports;