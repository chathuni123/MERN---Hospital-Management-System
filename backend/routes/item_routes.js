const router = require("express").Router();
let Item = require("../models/item_model");

   //Add item
router.route("/add").post((req,res)=>{
    console.log(req)
   const MediName = req.body.Medi_Name;
   const Amount = Number(req.body.Amount);
   const Cost = Number(req.body.Cost);
   const CompanyName = req.body.Company_Name;
   const ManuDate = req.body.ManuDate;
   const ExpireDate = req.body.ExpireDate;
   
   //console.log(ManuDate);
   //console.log(ExpireDate);
   
   console.log("Medicine name is:"+MediName)

   const newItem = new Item({MediName,Amount,Cost,CompanyName,ManuDate,ExpireDate});
                  
                  //If successfully added
   newItem.save().then(()=>{

       res.json(" Item Added")
       
        //If error occure 
   }).catch((err)=>{
       console.log(err);
   })

})

//View items 
router.route("/").get((req,res)=>{
    Item.find().then((items)=>{
        res.json(items)
    }).catch((err)=>{
        console.log(err);
    })
}) 

//update items
router.route("/update/:id").put(async(req,res) => {
    let userId=req.params.id;
    const {MediName,Amount,Cost,CompanyName,ManuDate,ExpireDate}=req.body;

    const updateItem = {
        MediName,
        Amount,
        Cost,
        CompanyName,
        ManuDate,
        ExpireDate
    }
    const update = await Item.findByIdAndUpdate(userId, updateItem).then(()=>{
        res.status(200).send({status:"Item updated"})
   }).catch((err)=>{
       res.status(500).send({status:"Error in updating Item", error: err.message})
       console.log(err.message);
   })
})

//delete item

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    console.log(userId)
    await Item.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status: "Item deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error in delte item",error:err.message});
    })
})

//Fetch an item using id
router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;
    //console.log(userId)
    const item = await Item.findById(userId).then((fitem)=>{
        res.status(200).send({status:"Item fetched",fitem})
        //console.log("success")
    }).catch((err)=>{
        res.status(500).send({status:"Item fetching failed", error: err.message})
        console.log(err.message)
    })
})

module.exports = router;