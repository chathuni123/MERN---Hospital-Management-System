const express = require("express");
const router = express.Router();

// import controllers
const {getrepoertrequest} = require("../controllers/reportrequest-controller");

// use routes
router.route("/getreportrequest").get( getrepoertrequest);

module.exports = router;
