const router = require("express").Router();
const feedback = require("../models/feedback_model");

//Add order
router.route("/add").post((req,res)=>{
    
    const Name = req.body.Name;
    const Comment = req.body.Comment;
    
   // console.log("Medicine name is:"+MediName)
 
    const newFeedback = new feedback({Name,Comment});
                   
                   //If successfully added
    newFeedback.save().then(()=>{
 
        res.json("Feedback Added")
        
         //If error occure 
    }).catch((err)=>{
        console.log(err);
    })
 
 })

 //View feedbacks
 router.route("/").get((req,res)=>{
    feedback.find().then((feedbacks)=>{
        res.json(feedbacks)
    }).catch((err)=>{
        console.log(err);
    })
 })

 module.exports = router;