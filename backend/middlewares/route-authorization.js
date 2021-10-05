const jwt = require("jsonwebtoken");
const DoctorModel = require("../models/doctor-model");
const LabchemistModel = require("../models/labchemist-model");
const PatientModel = require("../models/patient-model");
const PharmasistModel = require("../models/pharmasist-model");

exports.protectedDoctor = async (req, res, next) => {
  let token;
  token = tokenValidate(req);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await DoctorModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedLabchemist = async (req, res, next) => {
  let token;
  token = tokenValidate(req);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await LabchemistModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedPatient = async (req, res, next) => {
  let token;
  token = tokenValidate(req);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await PatientModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};
exports.protectedPharmasist = async (req, res, next) => {
  let token;
  token = tokenValidate(req);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await PharmasistModel.findById(decoded.id);
    if (!user) {
      noUserResponse(res);
    } else {
      req.user = user;
      next();
    }
  } catch (err) {
    invalidUserResponse(res, err);
  }
};



const tokenValidate = (reqObj) => {
  let token;
  if (
    reqObj.headers.authorization &&
    reqObj.headers.authorization.startsWith("Bearer")
  ) {
    token = reqObj.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401).json({ success: false, desc: "Not Authorized to Access" });
  }
  return token;
};

const noUserResponse = (res) => {
  res.status(404).json({ success: false, desc: "No user found with this ID" });
};

const invalidUserResponse = (res, err) => {
  res
    .status(401)
    .json({ success: false, desc: "Something went wrong, Frobidden-" + err });
};
