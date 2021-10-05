const LabreportsModel = require('../models/labreport-model');

// add report
exports.createLabreport = async (req, res) => {
    const {testId,chemistName,docName,date,testName,patientName,patientEmail,description} =
      req.body;
    
      try {    
        const report = await LabreportsModel.create({
             testId,
             chemistName,
             docName,
             date,
             testName,
             patientName,
             patientEmail,
             description
        });
        res.status(201).json({ success: true, report });
      } catch (error) {
        res.status(500).json({
          success: false,
          desc: "Error in labreportAdd in controller" + error,
        });
      }  
  };

    //get all labreports
    exports.getallLabreports = async (req,res) => {
        await LabreportsModel.find({})
        .then(data => {
           res.status(200).send({ data: data});
        })
        .catch(error => {
          res.status(500).send({error: error.message});
        })
      }

    //delete labreport
    exports.deleteLabreport = async (req,res) => {
    let testId =req.params.id;
    await LabreportsModel.findByIdAndDelete(testId)
    .then(() => {
      console.log('succesfully deleted');
      res.status(200).send({status: "Report Deleted"})
    }).catch((error) => {
      res.status(500).send({status: "error in deleting Labreport",error: error.message})
    })
  }

  
  //get specific lab report
exports.getLabreport = async(req,res) => {
  console.log(req.params.id);
  let LabreportId = req.params.id;
  await LabreportsModel.findById(LabreportId)
  .then((labreport) => {
    res.status(200).send({status:"Lab report Fetched", labreport});
  }).catch((err) => {
    res.status(500).send({status: "error",error: err.message});
  })
}

//edit notice
exports.editLabreport = async (req,res) =>{
 console.log("worked");
 let LabreportId = req.params.id;
 const{testId,chemistName,docName,date,testName,patientName,patientEmail,description} =req.body;

 //create an object to update
 const updateLabreport ={
  testId,
  chemistName,
  docName,
  date,
  testName,
  patientName,
  patientEmail,
  description
 }

 await LabreportsModel.findByIdAndUpdate(LabreportId,updateLabreport)
 .then(() => {
   console.log('succesfully updated '+testId+' lab report.');
   res.status(200).send({status: "Succesfully updated " +testId+" lab report."})
 }).catch((error) => {
   res.status(500).send({status: "error in updating labreport",error: error.message})
 })
}