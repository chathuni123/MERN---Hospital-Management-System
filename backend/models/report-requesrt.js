const mongoose = require("mongoose");

const ReportrequestSchema = new mongoose.Schema({
      docname:{
           type: String,
      },docemail:{
            type: String,
           },
        patient:{
          type: String,
        },
        patientsdescription: {
          type: String,
          required: [true, "Please provide description"],
        },
        docnote: {
          type: String,  
        },
        reporttype1: {
          type: String,
          required: [true, "Please provide report type"],
        },    
        reporttype2: {
          type: String,
          
        },
        othertype: {
          type: String,
        },
      
});

const Report = mongoose.model("reportrequest", ReportrequestSchema);
module.exports = Report;
