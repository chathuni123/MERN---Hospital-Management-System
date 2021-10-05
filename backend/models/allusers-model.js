const mongoose = require("mongoose");

const AllUsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  
});

const AllUsers = mongoose.model("alluser", AllUsersSchema);
module.exports = AllUsers;
