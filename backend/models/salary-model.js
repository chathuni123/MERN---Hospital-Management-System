const mongoose = require('mongoose');

const SalarySchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true, 
    },
    date: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
})

const Salary = mongoose.model(
    "salary",
    SalarySchema
);

module.exports = Salary;