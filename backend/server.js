require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require('express-fileupload')

//import routes

const authenticationRoutes = require("./routes/authentication-routes");
const doctorRoutes = require("./routes/doctor-routes");
const notificationRoute=require("./routes/notification-routes");
const adminRoutes=require("./routes/admin-routes");
const treatmentRoutes=require("./routes/treatment-routes");
const appointmentRoutes=require("./routes/appointment-routes");
const reportrequest=require("./routes/reportrequest-routes");
const labreportRoutes=require("./routes/labreport-routes");
const labchemistRoutes = require("./routes/labchemist-routes");
const noticeRoutes = require("./routes/notices-routes");
const contactusRoutes = require("./routes/contactus-routes");
const reportrequests=require("./routes/reportrequest-routes copy");
const chemistSalary = require("./routes/chemsalary-routes");
const pharmacistRoutes = require("./routes/pharmacist_routes");
const patientDetailsRoutes = require("./routes/PatientRoute/PatientRoute");
const search = require("./routes/search-route");

const app = express();

app.use(fileUpload({
  useTempFiles: true
}))

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGODB_URI;

mongoose
  .connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("MongoDB Connection Success");
  })
  .catch((err) => {
    console.log("Connection Failed - " + err);
  });

//use routes
app.use("/codebusters/api/auth", authenticationRoutes);
app.use("/codebusters/api/doctorpvt", doctorRoutes);

app.use("/codebusters/api/doctorpvt/treatment", treatmentRoutes);
app.use("/codebusters/api/doctorpvt/reportrequest", reportrequest);
app.use("/codebusters/api/patientpvt/appointment", appointmentRoutes);

app.use("/codebusters/api/notification", notificationRoute);
app.use("/codebusters/api/admin",adminRoutes);
app.use("/codebusters/api/labreport",labreportRoutes());


app.use("/codebusters/api/labchemistpvt",labchemistRoutes);
app.use("/notice", noticeRoutes());
app.use("/contactus",contactusRoutes());
// app.use("/labreport",labreportRoutes());
app.use("/codebusters/api/doctorpvt/reportrequest", reportrequests);
app.use("/chemist/salary",chemistSalary);


app.use("/codebusters/api/pharmacistpvt", pharmacistRoutes);

//Stock item rotes
const itemRoutes = require("./routes/item_routes");
app.use("/item",itemRoutes)

//Pharmacist Order routes
const DeliveryRoutes = require("./routes/recieved-order-routes");
app.use("/order",DeliveryRoutes)

//Feedback routes
const FeedbackRoutes = require("./routes/feedback_routes")
app.use("/feedback",FeedbackRoutes)


app.use("/patient", patientDetailsRoutes);
app.use("/codebusters/api/patientpvt/Doctor", search);

//event loop for server
app.listen(PORT, () => {
  console.log(`Backend Server is running on port ${PORT}`);
});
