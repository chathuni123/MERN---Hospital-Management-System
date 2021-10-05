const Adminmodal = require("../models/admin-model");
const Allusers =require("../models/allusers-model");

//Fetch admin details
  exports.getAdminDetails = async (req, res) => {
    try {
      const admindetails = await Adminmodal.find();
      res.status(200).send({
        admindetails
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in getAdminDetails controller-" + error,
      });
    }
  };

//Fetch all User details
exports.getAlluserDetails = async (req, res) => {
    try {
      const allusers = await Allusers.find();
      res.status(200).send({
        allusers
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in getAlluserDetails controller-" + error,
      });
    }
  };


  // payment
  exports.savepayments = async (req, res) => {
  
    try {
      doctors = await Doctors.find()
      pharmasist = await Pharmasist.find()
      chemist = await Chemist.find()
      
      var id;
      var salary;
      var date = new Date().toISOString().slice(0, 10)
      var salaryRecord;
      
  
      for (const key in doctors){
        userId = doctors[key]._id
        salary = req.body.doctorSalary
        date = date
        role = 'doctor'
  
        salaryRecord = new Salarymodal({
          userId,
          salary,
          date,
          role
        })
  
        await salaryRecord.save()
        console.log({userId, salary, date, role})
      }
  
      for (const key in pharmasist){
        id = pharmasist[key]._id
        salary = req.body.pharmasistSalary
        date = date
        role = 'pharmasist'
  
        salaryRecord = new Salarymodal({
          userId,
          salary,
          date,
          role
        })
  
        await salaryRecord.save()
        console.log({userId, salary, date, role})
  
      }
  
      for (const key in chemist){
        id = chemist[key]._id
        salary = req.body.chemistSalary
        date = date
        role = 'labchemist'
  
        salaryRecord = new Salarymodal({
          userId,
          salary,
          date,
          role
        })
  
        await salaryRecord.save()
        console.log({userId, salary, date, role})
  
        res.send({ success: true });
    }
    } catch (err) {
      res.send({ success: false });
    }
  
  }