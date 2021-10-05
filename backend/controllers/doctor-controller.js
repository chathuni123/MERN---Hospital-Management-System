const DoctorModel = require("../models/doctor-model");
const AllUsersModel = require("../models/allusers-model");
const NotificationModel=require("../models/notification-model");
const PatientModel=require("../models/patient-model");
const AppointmentModel=require("../models/appointment-model");
const TreatmentModel=require("../models/treatment-model");
const { cloudinary } = require("../utils/cloudinary");
const Reportrequest=require("../models/report-requesrt");
const LabReport=require("../models/labreport-model");
const Salary=require("../models/salary-model");
//CRUD operations of doctor 

//fetch doctor details
exports.getDoctorDetails = async (req, res) => {
    try {
      if (!req.user) {
        res.status(422).json({
          success: false,
          desc: "Can not find the user - Please check again",
        });
      } else {
        res.status(200).send({
            doctor: req.user,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in get doctor Data controller-" + error,
      });
    }
  };

  //update doctor
exports.updateDoctorDetails = async (req, res) => {
    const { username, email,university,other,experience,phone,
      fullname } = req.body; 
    if (email) {   
      try {
        await AllUsersModel.findOneAndUpdate(
          { email: req.user.email },
          { email: email },
          { omitUndefined: true }
        );
      } catch (error) {
        res.status(500).json({
          success: false,
          desc:
            "Error in updatedoctor-update AllUsers controller-" + error,
        });
      }
    }  
    try {   
      const updatedoctor = await DoctorModel.findByIdAndUpdate(
        req.user.id,
        {
          username,
          email,
          university,
          phone,
          other,
          experience,
          fullname, 
         
        },
        {
          new: true,
          upsert: false,
          omitUndefined: true,
        }
      );
      res.status(200).send({
        success: true,
        desc: " updated successfully",
        updatedoctor,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in update doctor controller-" + error,
      });
    }
  };
  
  //Update doctor profile photo
exports.updateProfilePicture = async (req, res) => {
    const { fileEnc } = req.body; 
    try {      
        try {
          const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
            upload_preset: "doctor-profile-pictures",
          });
  
          try {
            const updatedDoctor = await DoctorModel.findByIdAndUpdate(
              { _id: req.user._id },
              {
                profileImage: {
                  imagePublicId: uploadedResponse.public_id,
                  imageSecURL: uploadedResponse.secure_url,
                },
              },
              {
                new: true,
                upsert: false,
              }
            );
            res.status(200).send({
              success: true,
              desc: " updated successfully",
              updatedDoctor,
            });
          } catch (error) {
            res.status(500).json({
              success: false,
              desc: "Error in updating doctor profileImage data-" + error,
            });
          }
        } catch (error) {
          res.status(500).json({
            success: false,
            desc: "Error in uploading new image-" + error,
          });
        }
    
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in updateProfile Picture controller-" + error,
      });
    }
  };
  
  //delete doctor profile
exports.deleteDoctorDetails = async (req, res) => {
    try {
      await DoctorModel.findByIdAndDelete(req.user._id);
      await AllUsersModel.findOneAndRemove({ email: req.user.email });
      
  
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

// ..........................................................................................

// add treatment
exports.addtreatment = async (req, res) => {
  const { patientname, suggesions, medicines, othernotes,noteduetoreport,docname} =
    req.body;
  
    try {    
      const doctor = await TreatmentModel.create({
        patientname, 
        suggesions, 
        medicines, 
        othernotes,
        noteduetoreport,
        docname
      });
      res.status(201).json({ success: true, doctor });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in doctor  controller-" + error,
      });
    }  
};

//fetch Treatment
exports.getTreatment = async (req, res) => {
  try {
    const Treatment = await TreatmentModel.find();
    res.status(200).send({
      Treatment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getAlluserDetails controller-" + error,
    });
  }
};

// edit treatment
exports.updatetreatment = async (req, res) => {
  let { tID, suggesions, medicines, othernotes, noteduetoreport } = req.body;
  try {
    const updatedtreatment = await TreatmentModel.findByIdAndUpdate(
      tID,
      {
        $set: {
          suggesions, 
          medicines, 
          othernotes, 
          noteduetoreport
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).send({
      success: true,
      desc: "Treatment data updated successfully",
      updatedtreatment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in updatetreatment controller-" + error,
    });
  }
};

//remove treatmant data
exports.removetreatmentdata= async (req, res) => {
  try {
    const tid=req.params.id;

    await TreatmentModel.findByIdAndDelete(tid);
    
    res.status(200).send({
      status: true,
      desc: "deleted from the db",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in deletedata  controller-" + error,
    });
  }
};


// ..........................................................................................

// add repoertrequest
exports.addrepoertrequest = async (req, res) => {
  const { docname,docemail,patient, patientsdescription, docnote, reporttype1,reporttype2,othertype} =
    req.body;
  
    try {    
      const reportrequest = await Reportrequest.create({
        docname,
        docemail,
        patient, 
        patientsdescription, 
        docnote, 
        reporttype1,
        reporttype2,
        othertype
      });
      res.status(201).json({ success: true, reportrequest });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in addrepoertrequest  controller-" + error,
      });
    }  
};

//fetch repoertrequest
exports.getrepoertrequest = async (req, res) => {
  try {
    const Repoertrequest = await Reportrequest.find();
    res.status(200).send({
      Repoertrequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in gettrepoertrequest controller-" + error,
    });
  }
};

// edit repoertrequest
exports.editrepoertrequest = async (req, res) => {
  let { tID,patient, patientsdescription, docnote, reporttype1,reporttype2,othertype} = req.body;
  try {
    const updatedrepoertrequest = await Reportrequest.findByIdAndUpdate(
      tID,
      {
        $set: {
          patient, patientsdescription, docnote, reporttype1,reporttype2,othertype
        },
      },
      {
        new: true,
        upsert: false,
        omitUndefined: true,
      }
    );
    res.status(200).send({
      success: true,
      desc: "repoert request data updated successfully",
      updatedrepoertrequest,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in repoertrequest controller-" + error,
    });
  }
};


//remove delete repoertrequest data
exports.deleterepoertrequest= async (req, res) => {
  try {
    const tid=req.params.id;

    await Reportrequest.findByIdAndDelete(tid);
    
    res.status(200).send({
      status: true,
      desc: "deleted from the db",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in deleterepoertrequest  controller-" + error,
    });
  }
};

exports.deletedata = async (req, res) => {
  try {
    const rid=req.params.id;

    await AppointmentModel.findByIdAndDelete(rid);
    
    res.status(200).send({
      status: true,
      desc: "deleted from the db",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in deletedata  controller-" + error,
    });
  }
};

//fetch labreports
exports.getlabreport = async (req, res) => {
  try {
    const labreport = await LabReport.find();
    res.status(200).send({
      labreport,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getlabreport controller-" + error,
    });
  }
};

//remove removelabreport data
exports.removelabreport= async (req, res) => {
  try {
    const lid=req.params.id;
    await LabReport.findByIdAndDelete(lid);    
    res.status(200).send({
      status: true,
      desc: "deleted from the db",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in deletedata  controller-" + error,
    });
  }
};

//delete labreport
exports.deleteLabreport = async (req,res) => {
  let testId =req.params.id;
  await LabReport.findByIdAndDelete(testId)
  .then(() => {
    res.status(200).send({status: "Report Deleted"})
  }).catch((error) => {
    res.status(500).send({status: "error in deleting Labreport",error: error.message})
  })
}

const sendNotification = async (data, res) => {
  try {
    const newNotification = await NotificationModel.create({
      from: {
        userRole: "doctor",
        userid: data.fromId,
      },
      to: {
        userRole: "admin",
      },
      subject: data.subject,
      patientname: data.desc,
    });
    return newNotification;
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in sendNotification in doctor controller - " + error,
    });
  }
};

//get doc details
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
};

//fetch salary
exports.getsalary = async (req, res) => {
  try {
    const salary = await Salary.find();
    res.status(200).send({
      salary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      desc: "Error in getlabreport controller-" + error,
    });
  }
};
