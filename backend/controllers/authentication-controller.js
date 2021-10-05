const DoctoeModel = require("../models/doctor-model");
const LabchemistModel = require("../models/labchemist-model");
const PatientModel = require("../models/patient-model");
const PharmasistModel = require("../models/pharmasist-model");
const AllUsersModel = require("../models/allusers-model");
const AdminModel =require("../models/admin-model");

// login controller
exports.login = async (req, res, next) => {
  const { email, password, role } = req.body;
  //check user
  let user;
  if (role === "doctor") {
    user = await DoctoeModel.findOne({ email: email }).select("+password");
  } else if (role === "labchemist") {
    user = await LabchemistModel.findOne({ email: email }).select("+password");
  } else if (role === "patient") {
    user = await PatientModel.findOne({ email: email }).select("+password");
  } else if (role === "pharmasist") {
    user = await PharmasistModel.findOne({ email: email }).select("+password");
  } else if (role === "admin") {
    user = await AdminModel.findOne({ email: email }).select("+password");
  } 
   else {
    res.status(422).json({
      success: false,
      desc: "Can not find the user - Please check again",
    });
  }
  //check password match
  try {
    const isMatch = await user.matchPasswords(password);

    if (!isMatch) {
      res.status(401).send({
        success: false,
        desc: "Invalid credentials - Please check again",
      });
    } else {
      sendToken(user, 200, res);
    }
  } catch (error) {
    next(error);
  }
};

// register new Doctor
exports.registerDoctor = async (req, res) => {
  const { username, email, password,fullname ,phone,specialist} =
    req.body;
  //check for users with same email address 
  let existingEmail = await findEmailDuplicates(email, res);

  if (existingEmail === null) {
    try {    
      const doctor = await DoctoeModel.create({
        username,
        email,
        password,
        fullname ,
        phone,
        specialist,
      });
      const token = await doctor.getSignedToken();
      addToAllUsers(username, email, "doctor");
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in doctor  controller-" + error,
      });
    }
  }
};

// register new Labchemist
exports.registerLabchemist = async (req, res) => {
  const { username, email, password,phone,qulifications,fullname } =
    req.body;
  //check for users with same email address 
  let existingEmail = await findEmailDuplicates(email, res);

  if (existingEmail === null) {
    try {    
      const labchemist = await LabchemistModel.create({
        username,
        email,
        password,
        phone,
        qulifications,
        fullname,
      });
      const token = await labchemist.getSignedToken();
      addToAllUsers(username, email, "labchemist");
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in labchemist  controller-" + error,
      });
    }
  }
};

// register new patient
exports.registerPatient = async (req, res) => {
  const { username, email, password,phone,fullname } =
    req.body;
  //check for users with same email address 
  let existingEmail = await findEmailDuplicates(email, res);

  if (existingEmail === null) {
    try {    
      const patient = await PatientModel.create({
        username,
        email,
        password,
        phone,
        fullname,
      });
      const token = await patient.getSignedToken();
      addToAllUsers(username, email, "patient");
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in patient  controller-" + error,
      });
    }
  }
};


// register new Pharmasist
exports.registerPharmasist = async (req, res) => {
  const { username, email, password,phone,fullname,license } =
    req.body;
  //check for users with same email address 
  let existingEmail = await findEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {    
      const pharmasist = await PharmasistModel.create({
        username,
        email,
        password,
        phone,
        fullname,
        license,
      });
      const token = await pharmasist.getSignedToken();
      addToAllUsers(username, email, "pharmasist");
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in pharmasist  controller-" + error,
      });
    }
  }
};

// register new admin
exports.registerAdmin = async (req, res) => {
  const { username, email, password,phone,fullname } =
    req.body;
  //check for users with same email address 
  let existingEmail = await findEmailDuplicates(email, res);
  if (existingEmail === null) {
    try {    
      const admin = await AdminModel.create({
        username,
        email,
        password,
        phone,
        fullname, 
      });
      const token = await admin.getSignedToken();
      addToAllUsers(username, email, "admin");
      res.status(201).json({ success: true, token });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in admin  controller-" + error,
      });
    }
  }
};

// find duplicated user emails before register new user
const findEmailDuplicates = async (email, res) => {
  try {
    const existingAccount = await AllUsersModel.findOne({ email: email });
    if (existingAccount) {
      res.status(401).json({
        success: false,
        desc: "Email already exist - Please check again",
      });
    } else {
      return existingAccount;
    }
  } catch (err) {
    res.status(422).json({
      success: false,
      desc: "Error occured in findUserByEmail segment-" + err,
    });
  }
};

const addToAllUsers = async (username, email, role,fullname) => {
  const createdAllUser = new AllUsersModel({
    username,
    email,
    role,
  });
  await createdAllUser.save();
};

//send response object to client if login success
const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ sucess: true, token, user });
};
