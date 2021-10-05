const express = require("express");
const router = express.Router();

//import protected-routes middlewares
const { protectedPharmasist} = require("../middlewares/route-authorization");

//import controllers
const {
    getPharmacistDetails,
    updatePharmacistDetails,
    updateProfilePicture,
    deletePharmacistDetails,
    getsalary
} = require("../controllers/pharmacist_controller");

//Registration-routes
router.route("/getProfile").get(protectedPharmasist,getPharmacistDetails);
router.route("/editProfile").put(protectedPharmasist, updatePharmacistDetails);
router.route("/updatepic").put(protectedPharmasist, updateProfilePicture);
router.route("/deleteprofile").delete(protectedPharmasist, deletePharmacistDetails);






module.exports = router;
