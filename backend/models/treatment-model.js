const mongoose = require("mongoose");

const TreatmentSchema = new mongoose.Schema({
    patientname:{
        type: String,
      },
      suggesions: {
        type: String,
        required: [true, "Please provide suggesions"],
      },
      medicines: {
        type: String,
        required: [true, "Please provide medicines"],
      },
      othernotes: {
        type: String,
      },
      noteduetoreport: {
        type: String,
      },
      docname: {
        type: String,
      },
  
});

const Treatment = mongoose.model("treatment", TreatmentSchema);
module.exports = Treatment;
