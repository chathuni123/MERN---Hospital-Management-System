const express = require("express");
const router = express.Router();

// import controllers
const {
  updateNotification,
  deleteNotification,
  getnotification,
  getsalary
} = require("../controllers/notification-controller");

// use routes
router.route("/editNotification").put(updateNotification);
router.route("/deleteNotification").delete(deleteNotification);
router.route("/getnotification").get(getnotification);
router.route("/getsalary").get(getsalary);




module.exports = router;
