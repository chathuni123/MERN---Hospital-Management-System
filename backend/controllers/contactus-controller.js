const ContactusModel = require('../models/contactus-model');


// add notice
exports.createContact = async (req, res) => {
  console.log("request eka awa");
    const { fullname,email,message} =
      req.body;
    
      try {    
        const contactus = await ContactusModel.create({
            fullname,
            email,
            message
        });
        res.status(201).json({ success: true, contactus });
      } catch (error) {
        res.status(500).json({
          success: false,
          desc: "Error in contactus controller" + error,
        });
      }  
  };

  //get all notices
  exports.getallcontacts = async (req,res) => {
    await ContactusModel.find({})
    .then(data => {
       res.status(200).send({ data: data});
    })
    .catch(error => {
      res.status(500).send({error: error.message});
    })
  }