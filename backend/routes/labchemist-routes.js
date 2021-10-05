const express = require("express");
const router = express.Router();

//import protected-routes middlewares
const { protectedLabchemist} = require("../middlewares/route-authorization");

//import controllers
const{
    getLabChemDetails,
    deleteLabchemistDetails,
    updateLabchemDetails
} = require("../controllers/labchemist-controller");

router.route("/getProfile").get(protectedLabchemist,getLabChemDetails);
router.route("/editProfile").put(protectedLabchemist, updateLabchemDetails);
router.route("/deleteprofile").delete(protectedLabchemist, deleteLabchemistDetails);


module.exports = router;