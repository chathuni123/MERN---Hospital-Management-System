const PharmacistModel = require("../models/pharmasist-model");
const AllUsersModel = require("../models/allusers-model");
const NotificationModel=require("../models/notification-model");
const { cloudinary } = require("../utils/cloudinary");

//CRUD operations of doctor 

//fetch pharmacist details
exports.getPharmacistDetails = async (req, res) => {
  console.log("backend")
    try {
      if (!req.user) {
        res.status(422).json({
          success: false,
          desc: "Can not find the user - Please check again",
        });
      } else {
        res.status(200).send({
          pharmacist: req.user,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in get pharmacist Data controller-" + error,
      });
    }
  };

  //update Pharmacist
exports.updatePharmacistDetails = async (req, res) => {
    const { username, email,license,phone,
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
    
      const updatePharmacist = await PharmacistModel.findByIdAndUpdate(
        req.user.id,
        {
          username,
          email,
          phone,
          fullname, 
          license
         
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
        updatePharmacist,
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
      const destroyedImage = await cloudinary.uploader.destroy(
        req.user.profileImage.imagePublicId
      );
      if (destroyedImage) {
        try {
          const uploadedResponse = await cloudinary.uploader.upload(fileEnc, {
            upload_preset: "doctor-profile-pictures",
          });
  
          try {
            const updatedPharmacist = await PharmacistModel.findByIdAndUpdate(
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
              updatedPharmacist,
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
      } else {
        res.status(500).json({
          success: false,
          desc: "Error in previous image remove-" + error,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in updateProfile Picture controller-" + error,
      });
    }
  };
  
  //delete pharmcisr profile
exports.deletePharmacistDetails = async (req, res) => {
    try {
      await PharmacistModel.findByIdAndDelete(req.user._id);
      await AllUsersModel.findOneAndRemove({ email: req.user.email });
      
  
      res.status(200).send({
        status: true,
        desc: "deleted from the db",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        desc: "Error in delete Pharmacist Details controller-" + error,
      });
    }
  };

  const sendNotification = async (data, res) => {
    try {
      const newNotification = await NotificationModel.create({
        from: {
          userRole: "pharmasist",
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
  
  