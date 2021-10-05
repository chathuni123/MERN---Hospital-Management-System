const express = require("express");
const router = express.Router();

//import protected-routes middlewares
const { protectedDoctor} = require("../middlewares/route-authorization");

//import controllers
const {
    getDoctorDetails,
    updateDoctorDetails,
    updateProfilePicture,
    deleteDoctorDetails,
    getdoc,
    getsalary
    
} = require("../controllers/doctor-controller");

//Registration-routes
router.route("/getProfile").get(protectedDoctor, getDoctorDetails);
router.route("/editProfile").put(protectedDoctor, updateDoctorDetails);
router.route("/updatepic").put(protectedDoctor, updateProfilePicture);
router.route("/deleteprofile").delete(protectedDoctor, deleteDoctorDetails);
router.route("/get").get( getdoc);
router.route("/getsalary").get( getsalary);


;





module.exports = router;
