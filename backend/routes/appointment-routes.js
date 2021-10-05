
const express = require("express");
const router = express.Router();

// import controllers
const {
    addappointment,
    getapointment,
    updateapointment,
    deleteapointment,
    getapointments
} = require("../controllers/PatientController");

// use routes
router.route("/addappointments/:id").post(addappointment);
router.route("/getapointments/:id").get(getapointment);
router.route("/updateapointments").put(updateapointment);
router.route("/deleteapointments/:id").delete(deleteapointment);
router.route("/getapointments").get(getapointments);





module.exports = router;