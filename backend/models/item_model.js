const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const stockItem = new Schema({
   
    MediName :{
        type : String
      
       
    },
    Amount:{
        type : Number
        
    },
    Cost:{
        type : Number
        
    },
    CompanyName:{
        type : String
       
       
    },
    ManuDate:{
        type : String 
       
       
    },
    ExpireDate:{
        type : String
       
       
    }
})

const Items = mongoose.model("Stock_Item",stockItem);
module.exports=Items
