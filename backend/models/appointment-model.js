const mongoose = require("mongoose");

const ApointmentSchema = new mongoose.Schema({

  appointmentDate: {
    type: String,
  },
  appointmentTime: {
    type: String,
  },
  physician: {
    type: String,
  },
  gender: {
    type: String,
  },

  userID: {
    type: String,
  },

  fullname: {
    type: String,
  },
  appointmentNote: {
    type: String,
  }

});

const Apointment = mongoose.model("appointments", ApointmentSchema);
module.exports = Apointment;



