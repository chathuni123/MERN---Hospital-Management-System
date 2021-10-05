
const express = require("express");
const router = express.Router();

// import controllers
const {
    addrepoertrequest,
    getrepoertrequest,
    editrepoertrequest,
    deleterepoertrequest,
    getlabreport,
    removelabreport,deleteLabreport
} = require("../controllers/doctor-controller");

// use routes
router.route("/addreportrequest").put( addrepoertrequest);
router.route("/updatereportrequest").put(editrepoertrequest);
router.route("/removereportrequest/:id").delete( deleterepoertrequest);
router.route("/getreportrequest").get( getrepoertrequest);
router.route("/getlabreport").get( getlabreport);
router.route("/removelabreport/:id").delete(removelabreport);
router.route("/delete/:id").delete(deleteLabreport);

module.exports = router;
