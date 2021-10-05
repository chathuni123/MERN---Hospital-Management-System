const mongoose = require('mongoose');

const MedicineOrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telNo: {
        type: Number,

    },
    gender: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    allergies: {
        type: String,

    },
    currentlyTakingMedications: {
        type: String,

    },
    existingMedicalProblems: {
        type: String,

    },
    userID: {
        type: String,
    },
    signature: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        default: "Pending",
    }

});

const MedicineOrder = mongoose.model(
    "ordermedicine",
    MedicineOrderSchema
);

module.exports = MedicineOrder;
