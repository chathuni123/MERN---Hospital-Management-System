const NoticesModel = require('../models/notices-model');


// add notice
exports.createNotice = async (req, res) => {
    const { topic,date,description} =
      req.body;
    
      try {    
        const notice = await NoticesModel.create({
             topic,
             date,
             description
        });
        res.status(201).json({ success: true, notice });
      } catch (error) {
        res.status(500).json({
          success: false,
          desc: "Error in addappointment controller in patient-" + error,
        });
      }  
  };

  //get all notices
  exports.getallNotices = async (req,res) => {
    await NoticesModel.find({})
    .then(data => {
       res.status(200).send({ data: data});
    })
    .catch(error => {
      res.status(500).send({error: error.message});
    })
  }

  //delete notice
  exports.deleteNotices = async (req,res) => {
    let noticeId =req.params.id;
    await NoticesModel.findByIdAndDelete(noticeId)
    .then(() => {
      console.log('succesfully deleted');
      res.status(200).send({status: "Notice Deleted"})
    }).catch((error) => {
      res.status(500).send({status: "error in deleting notice",error: error.message})
    })
  }

  //get specific notice
exports.getOneNotice = async(req,res) => {
     let noticeId = req.params.id;
     await NoticesModel.findById(noticeId)
     .then((notice) => {
       res.status(200).send({status:"Notice Fetched", notice});
     }).catch((err) => {
       res.status(500).send({status: "error",error: err.message});
     })
}

  //edit notice
  exports.editNotices = async (req,res) =>{
    console.log("worked");
    let noticeId = req.params.id;
    const{topic,date,description} =req.body;

    //create an object to update
    const updatedNotice ={
      topic,
      date,
      description
    }

    await NoticesModel.findByIdAndUpdate(noticeId,updatedNotice)
    .then(() => {
      console.log('succesfully updated'+topic);
      res.status(200).send({status: "Notice Update Success"})
    }).catch((error) => {
      res.status(500).send({status: "error in updating notice",error: error.message})
    })
  }