import React,{useState} from "react";
import Pharmacist_Navbar from "./Pharmacist_header";
import axios from "axios";
import "./PFoarm.css"



function AddFeedback(){
    const[Name,setName] = useState("");
    const[Comment,setComment] = useState("");
   

    function sendData(e){
        e.preventDefault();
       
        const newFeedback = {Name,Comment}
        console.log(newFeedback)

        axios.post("http://localhost:6500/feedback/add/",newFeedback).then(()=>{
            console.log(newFeedback)
            alert("Feedback Added")
            window.location.reload();
           
           
        }).catch((err)=>{
            alert(err)
        })
    }

    return(
   
        <div className="containerfeed">
             <div className="feedimgcontain">
             <div className="formsetfeed">
    
            <div className=""> <h4 align="middle">Feedback</h4>
            <p style={{fontWeight:"bold"}}>Your feedbacks are essential to guide and inform our decision making and influence innovations and changes to our service.
                 It's also essential for measuring your satisfaction among our current customers.
                 Getting a handle on how you view our service and supportis valuable. Please feel free to send your ideas about our service.</p>
            <form onSubmit={sendData}>
                <div className="form-group">
                <label for="Name">Name</label>
                <input type="text" class="form-control" id="Name" required placeholder="" 
                onChange={(e)=>{
                    setName(e.target.value);
                }}/> <br/>
                </div>
                <div className="form-group">
                <label for="Comment">Comment</label>
                <input type="text" className="form-control" style={{paddingBottom:'10vh'}} id="Comment" required  placeholder=""
                 onChange={(e)=>{
                    setComment(e.target.value);
                }}/> <br/>
                </div>
  
                <br/><button type="submit" className="btn btn-primary">Add Feedback</button>
            </form>
            </div>
                    </div></div></div>
    )
}
export default AddFeedback;