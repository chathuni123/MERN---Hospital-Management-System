const express = require("express");
const router = express.Router();

const {
    getdoc
} = require("../controllers/PatientController");

router.route("/get").get(getdoc);

module.exports = router;