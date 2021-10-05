const express = require('express');
const router = express.Router();



// import controllers
const {getsalarychemist} = require("../controllers/chemsalary-controller");

// use routes
router.route("/notifications").get( getsalarychemist);

module.exports = router;

// module.exports = function () {
//     router.get('/',controller.getsalarychemist);
//     return router;
// }