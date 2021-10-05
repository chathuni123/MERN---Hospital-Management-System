
const express = require("express");
const router = express.Router();

// import controllers
const {
    addtreatment,
    getTreatment,
    updatetreatment,
    removetreatmentdata
} = require("../controllers/doctor-controller");

// use routes
router.route("/addtreatments").put(addtreatment);
router.route("/gettreatments").get(getTreatment);
router.route("/updatetreatments").put(updatetreatment);
router.route("/removetreatmentdata/:id").delete(removetreatmentdata);



module.exports = router;
