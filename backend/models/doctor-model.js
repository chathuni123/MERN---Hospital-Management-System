const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const DoctorSchema = new mongoose.Schema({
  role: {
    type: String,
    default: "doctor",
  },
  username: {
    type: String,
    required: [true, "Please provide a username"],
  },
  fullname: {
    type: String,
    required: [true, "Please provide a username"],
  },
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 6,
    select: false,
  },
  phone: {
    type: Number,
    required: [true, "Please provide a contact number"],
    length: 10,
  },
specialist:{
  type: String,
  required: [true, "Please provide the field of specialist"],
},
profileImage: {
  imagePublicId: {
    type: String,
 
  },
  imageSecURL: {
    type: String,
 
  },
},

  university: {
    type: String,
  },
  other: {
    type: String,

  },
  experience: {
    type: String,
  },


});

//by using "pre save" we run this code segment before mongoose save data on db
DoctorSchema.pre("save", async function (next) {
  //check whether the password has already been hashed or not by using isModified
  if (!this.isModified("password")) {
    next();
  }

  //hash password before passing it to db save query through the model
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt); //this.password reffers to password that contains within request object

  next();
});

//to compare hashed passwords in login scenarios
DoctorSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password); //password refers to user providing one and this.password refers to one that get from db
};

DoctorSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const Doctor = mongoose.model("doctor", DoctorSchema);

module.exports = Doctor;
