const router = require("express").Router();
//let Order = require("../models/recieved-order-model")
let Order= require("../models/medicine-order-model")

//Add order
router.route("/add").post((req,res)=>{
    
    const PatientName = req.body.PatientName;
    const MediList = req.body.MediList;
    const Address = req.body.Address;
    const TeleNo = Number(req.body.TeleNo);
    const Status = req.body.Status;
    
    
   // console.log("Medicine name is:"+MediName)
 
    const newOrder = new Order({PatientName,MediList,Address,TeleNo,Status});
                   
                   //If successfully added
    newOrder.save().then(()=>{
 
        res.json(" Order Added")
        
         //If error occure 
    }).catch((err)=>{
        console.log(err);
    })
 
 })
 
 //View items 
 router.route("/").get((req,res)=>{
     Order.find().then((Orders)=>{
         res.json(Orders)
     }).catch((err)=>{
         console.log(err);
     })
})
//Get one order
router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
    //console.log(userId)
    //console.log(req.data)
    const order = await Order.findById(userId).then((forder)=>{
        res.status(200).send({status:"Order fetched",forder})
        //console.log("success")
    }).catch((err)=>{
        res.status(500).send({status:"Order fetching failed", error: err.message})
        console.log(err.message)
    })
})

//Set delivery status
router.route("/deliver/:id").put(async(req,res) => {
    let userId=req.params.id;
    //console.log(req.body)
    const status=(req.body.status)
    const name=(req.body.name)
    const address=(req.body.address)
    const photo=(req.body.photo)
    const telNo=Number(req.body.telNo)
    const age = Number(req.body.age)
    const email = (req.body.email)
    const gender = (req.body.gender)
    const allergies=(req.body.allergies)
    const currentlyTakingMedications =(req.body.currentlyTakingMedications)
    const existingMedicalProblems =(req.body.existingMedicalProblems)
    const userID =(req.body.userID)
    const signature =(req.body.signature)
    console.log({status,name,address,photo})
   
    const updateStatus = {
        status,
        name,
        age,
        email,
        gender,
        address,
        allergies,
        currentlyTakingMedications,
        existingMedicalProblems,
        userID,
        signature,
        photo,
        telNo
        
    }
    console.log(updateStatus)
    console.log(status);
        const update = await Order.findByIdAndUpdate(userId, updateStatus).then(()=>{
        res.status(200).send({status:"Order Delivered"})
   }).catch((err)=>{
       res.status(500).send({status:"Error in Delivery", error: err.message})
       console.log(err.message);
   })
})



//Search
router.route("/search/:keyword").get(async(req,res)=>{
    let keyword = req.body.keyword;
    const serchedOrders = await Order.findOne(keyword).then((sresults)=>{
        res.json(sresults)
        //console.log("success")
    }).catch((err)=>{
        res.status(500).send({status:"No result", error: err.message})
        console.log(err.message)
    })
})

module.exports = router;