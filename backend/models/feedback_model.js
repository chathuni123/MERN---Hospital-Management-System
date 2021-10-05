const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const feedback = new Schema({
   
    Name :{
        type : String
      
       
    },
    Comment :{
        type : String
      
       
    }
})

const feedbacks = mongoose.model("feedback",feedback);
module.exports=feedbacks
