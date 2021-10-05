const express = require('express');
const router = express.Router();
const { protectedPatient} = require("../../middlewares/route-authorization");

const {
    updatePatientDetails,
    getPatientDetails,
    addAppoinment
} = require("../../controllers/PatientController");

router.route('/getPatientDetails/:id').get(protectedPatient, getPatientDetails);
router.route('/updatePatientDetails').put(updatePatientDetails,protectedPatient);
router.route('/addAppoinment/:id').put(addAppoinment,protectedPatient);


module.exports=router;




