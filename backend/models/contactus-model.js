const mongoose = require('mongoose');

const ContactusSchema = new mongoose.Schema({

    fullname: {
        type: String,
        required: [true, "Please provide a fullname"],
      },

      email: {
        type: String,
        required: [true, "Please provide a email"],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide a valid email"],
      },

      message: {
          type:String,
          required: [true,"please provide a message"]
      }
});

const contactus = mongoose.model('contactus',ContactusSchema);
module.exports = contactus;