const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const recievedOrders = new Schema({
   
    PatientName :{
        type : String
      
       
    },
    MediList :{
        type : String
      
       
    },
    Address :{
        type : String
      
       
    },
    TeleNo:{
        type : Number
        
    },
    Status:{
        type : String,
        default:"Pending"
        
    }
})

const Orders = mongoose.model("recievedOrders",recievedOrders);
module.exports=Orders
