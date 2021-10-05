const PatientModel = require("../models/patient-model");
const AllUsersModel = require("../models/allusers-model");
const Apointment = require("../models/appointment-model");
const MedicineOrder = require('../models/medicine-order-model');
const DoctorModel = require('../models/doctor-model');
const cloudinary = require('cloudinary')
require("dotenv").config();
const fs = require('fs')
const path = require('path')
const pdf = require('html-pdf')

const pdfTemplate = require('./documents')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.updatePatientDetails = async (req, response) => {
  const body = req.body;
  console.log(body)

  try {
    await AllUsersModel.findOneAndUpdate(
      { email: body.email },
      { email: body.email },
      { omitUndefined: true }
    );

    await PatientModel.findByIdAndUpdate({ _id: body.userId }, {
      gender: body.gender,
      bloodGroup: body.bloodGroup,
      address: body.address,
      zipcode: body.zipcode,
      nicNumber: body.nicNumber,
      fullname: body.fullname,
      phone: body.phone,
      avatar: body.avatar
    })

    response.send({ success: true, message: "Successfully Updated" })
  } catch (e) {
    response.send({ success: false, message: "Didn't Update" })
  }
}

exports.getPatientDetails = async (req, res) => {
  const id = req.params.id;

  try {
    const profileDetails = await PatientModel.findOne({ _id: id }).exec();
    res.send({ data: profileDetails, success: true })
  } catch (e) {
    console.log(e)
  }
}

exports.upload = (req, res) => {
  try {
    console.log(req)
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: 'No files were uploaded.' })

    const file = req.files.file;
    console.log(file)
    if (file.size > 1024 * 1024 * 3) { // file size above 3MB
      removeTmp(file.tempFilePath)
      return res.status(400).json({ msg: "Size too large" })
    }

    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      removeTmp(file.tempFilePath)
      return res.status(400).json({ msg: "File format is incorrect." })
    }

    cloudinary.v2.uploader.upload(file.tempFilePath, { folder: "test" }, async (err, result) => {
      if (err) throw err;

      removeTmp(file.tempFilePath)

      res.json({ public_id: result.public_id, url: result.secure_url })
    })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

//delete patient profile
exports.deletePatientDetails = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    await PatientModel.findOneAndDelete({ email: req.params.id });
    await AllUsersModel.findOneAndDelete({ email: req.params.id });

    res.status(200).send({
      status: true,
      desc: "deleted from the db",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in delete Doctorr Details controller-" + error,
    });
  }
};

// add appointment
exports.addappointment = async (req, res) => {
  const id = req.params.id
  const body = req.body;

  try {
    const patient = await PatientModel.findOne({ _id: id }).exec();

    console.log(patient);

    const appointmentDate = body.appointmentDate
    const appointmentTime = body.appointmentTime
    const physician = body.physician
    const gender = body.gender
    const userID = id
    const fullname = patient.fullname
    const appointmentNote = body.appointmentNote

    const apointment = new Apointment({
      appointmentDate,
      appointmentTime,
      physician,
      gender,
      userID,
      fullname,
      appointmentNote
    });

    console.log(apointment)

    await apointment.save();

    res.send({ success: true, apointment });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in addappointment controller in patient-" + error,
    });
  }
};

//fetch all apointment
exports.getapointment = async (req, res) => {
  const userID = req.params.id
  try {
    const apointment = await Apointment.find({ userID: userID }).exec();
    // const apointment = await Apointment.find();
    res.status(200).send({
      success: true,
      apointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getapointment controller-" + error,
    });
  }
};


//fetch all apointment
exports.getapointments = async (req, res) => {
  try {
    const apointment = await Apointment.find();
    res.status(200).send({
      apointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getapointment controller-" + error,
    });
  }
};
// generate pdf
exports.getmyapointment = async (req, res) => {
  const appoinmentid = req.params.id
  try {
    const apointment = await Apointment.findOne({ _id: appoinmentid }).exec();
    // const apointment = await Apointment.find();
    console.log(apointment)
    pdf.create(pdfTemplate(apointment.appointmentDate, apointment.appointmentTime, apointment.physician, apointment.gender, apointment.fullname, apointment.appointmentNote, apointment._id), {}).toFile('result.pdf', err => {
      if (err) {
        res.status(500).json({
          success: false,
          desc: "Error in getpdf controller-" + error,
        });
      }
      res.send(Promise.resolve())
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getapointment controller-" + error,
    });
  }
};

// get pdf
exports.getpdf = async (req, res) => {
  try {
    console.log('getting pdf...')
    res.sendFile(path.join(__dirname, '../', 'result.pdf'))
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getpdf controller-" + error,
    });
  }
}

// edit apointment
exports.updateapointment = async (req, res) => {
  let { appointmentDate, appointmentTime, physician, appointmentNote, id } = req.body;
  console.log(appointmentDate, appointmentTime, physician, appointmentNote, id)
  try {
    await Apointment.findByIdAndUpdate({ _id: req.body.id }, {
      appointmentDate: req.body.appointmentDate,
      appointmentTime: req.body.appointmentTime,
      physician: req.body.physician,
      appointmentNote: req.body.appointmentNote
    })
    res.send({ success: true, message: "Successfully Updated" })
  } catch (error) {
    res.send({ success: false, message: "Didn't Update" })
  }
};



//remove apointment data

exports.deleteapointment = async (req, res) => {

  //console.log(backend)

  let appointmentID = req.params.id;
  const deletedApointment = await Apointment.findByIdAndDelete(
    appointmentID).exec((err) => {
      if (err) {
        return res.status(400).json({
          message: "Appointment Deleted Unsuccessfully", err
        });
      }
      return res.json({
        message: "Appointment Deleted Successfully", deletedApointment
      });
    });

}

// order medicine
exports.orderMedicine = async (req, res) => {
  console.log(req.params)
  console.log(req.body)

  try {

    const name = req.body.name
    const age = req.body.age
    const email = req.body.email
    const telNo = req.body.telNo
    const gender = req.body.gender
    const address = req.body.address
    const allergies = req.body.allergies
    const currentlyTakingMedications = req.body.currentlyTakingMedications
    const existingMedicalProblems = req.body.existingMedicalProblems
    const userID = req.params.Id
    const signature = req.body.signature
    const photo = req.body.photo

    const medicineOrder = new MedicineOrder({
      name,
      age,
      email,
      telNo,
      gender,
      address,
      allergies,
      currentlyTakingMedications,
      existingMedicalProblems,
      userID,
      signature,
      photo
    });

    console.log(medicineOrder)
    console.log('saving');
    await medicineOrder.save();
    console.log('saved');
    res.send({ success: true, medicineOrder });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in medicine order controller in patient-" + error,
    });
  }

}
// get medicine orders by user
exports.getMyMedicineOrders = async (req, res) => {
  try {
    const orders = await MedicineOrder.find({ userID: req.params.Id }).exec();
    console.log(orders)
    res.status(200).send({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in medicine order controller in patient-" + error,
    });
  }
}

// update medicine order
exports.updateMedicineOrders = async (req, res) => {

  try {

    await MedicineOrder.findByIdAndUpdate({ _id: req.body.id }, {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      telNo: req.body.telNo,
      gender: req.body.gender,
      address: req.body.address,
      allergies: req.body.allergies,
      currentlyTakingMedications: req.body.currentlyTakingMedications,
      existingMedicalProblems: req.body.existingMedicalProblems,
      signature: req.body.signature,
      photo: req.body.photo
    })
    console.log(req.body)

    res.send({ success: true, message: "Successfully Updated" })
  } catch (e) {
    res.send({ success: false, message: "Didn't Update" })
  }
}

exports.deleteMedicineOrder = async (req, res) => {

  //console.log(backend)

  let orderID = req.params.Id;
  console.log(orderID)
  const deletedApointment = await MedicineOrder.findByIdAndDelete(
    orderID).exec((err) => {
      if (err) {
        return res.status(400).json({
          message: "Appointment Deleted Unsuccessfully", err
        });
      }
      return res.json({
        message: "Appointment Deleted Successfully", deletedApointment
      });
    });

}

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await DoctorModel.find()
    console.log(doctors)
    res.status(200).send({
      success: true,
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getDoctor controller in patient-" + error,
    });
  }
}


const removeTmp = (path) => {
  fs.unlink(path, err => {
    if (err) throw err;
  })
}

// get doc details
exports.getdoc = async (req, res) => {
  try {
    const doc = await DoctorModel.find();
    res.status(200).send({
      doc,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getdoc controller-" + error,
    });
  }
}


