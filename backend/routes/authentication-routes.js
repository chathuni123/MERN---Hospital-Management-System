const express = require("express");
const router = express.Router();

// import controllers
const {
  registerDoctor,
  registerLabchemist,
  registerPatient,
  registerPharmasist,
  registerAdmin,
  login,
} = require("../controllers/authentication-controller");

// Registration-routes
router.route("/reg-doctor").post(registerDoctor);
router.route("/reg-labchemist").post(registerLabchemist);
router.route("/reg-patient").post(registerPatient);
router.route("/reg-pharmasist").post(registerPharmasist);
router.route("/reg-admin").post(registerAdmin);


// Login-routes
router.route("/login").post(login);

module.exports = router;
