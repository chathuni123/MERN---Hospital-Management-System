import React,{Component,useEffect,useState} from "react"
import { useParams } from "react-router";
import Pharmacist_Navbar from "./Pharmacist_header";
import axios from "axios"
import "./PFoarm.css"


function OrderDeliver(e){
    const[name,setname] = useState("");
    const[address,setaddress] = useState("");
    const[photo,setphoto] = useState("");
    const[telNo,settelNo] = useState("");
    const[status,setstatus] = useState("");
    const [age,setage]= useState("");
    const [email,setemail]= useState("");
    const [gender,setgender]= useState("");
    const [allergies,setallergies]= useState("");
    const [currentlyTakingMedications,setcurrentlyTakingMedications]= useState("");
    const [existingMedicalProblems,setexistingMedicalProblems]= useState("");
    const [userID,setuserID]= useState("");
    const [signature,setsignature]= useState("");
  
    
    const order_id = useParams();
   
        getOrder();
        function getOrder(){
         
           
            axios.get(`http://localhost:6500/order/get/${order_id.id}`).then((res)=>{
                
                setname(res.data.forder.name)
                setaddress(res.data.forder.address)
                settelNo(res.data.forder.telNo)
                setstatus("Delivered")
                setphoto(res.data.forder.photo)
                setage(res.data.forder.age)
                setallergies(res.data.forder.allergies)
                setcurrentlyTakingMedications(res.data.forder.currentlyTakingMedications)
                setemail(res.data.forder.email)
                setgender(res.data.forder.gender)
                setexistingMedicalProblems(res.data.forder.existingMedicalProblems)
                setuserID(res.data.forder.userID)
                setsignature(res.data.forder.signature)

               
               

            }).catch((err)=>{
                alert(err.message)
              
            })
        }
       
    
        function StatusChange(e){
            e.preventDefault();
           
          
            const deliveredOrder={status,name,age,email,gender,address,allergies,currentlyTakingMedications,existingMedicalProblems,userID,signature,photo,telNo}
            console.log(deliveredOrder)
            axios.put(`http://localhost:6500/order/deliver/${order_id.id}`,deliveredOrder).then(()=>{
                
                alert("Order Delivered")
                window.location = "/pharmacist/orders";
               
               
            }).catch((err)=>{
                alert(err)
            })
        }
   

return(
    <div className="OrderDEliveryContainer">
             <Pharmacist_Navbar/>
             <div className="formset">
             <div className="rowEditItem">
             <div className="column1EditItem">
             <h4 align="middle">Order Deliver</h4>
            <form  onSubmit={StatusChange}>
                <div className="form-group">
                <label for="PatientName">Patient Name</label>
                <input type="text" class="form-control" id="PatientName" required placeholder="" value={name}
                onChange={(e)=>{
                    setname(e.target.value);
                }}/>
                </div><br/>
                <div className="form-group">
                <label for="Address">Address</label>
                <input type="text" className="form-control" id="Address" required  placeholder="" value={address}
                 onChange={(e)=>{
                    setaddress(e.target.value);
                }}/>
                </div><br/>
                <div className="form-group">
                <label for="TeleNo">Telephone Number</label>
                <input type="number" className="form-control" id="TeleNo"  placeholder="" defaultValue={telNo}
                 onChange={(e)=>{
                    settelNo(e.target.value);
                }}/>
                </div><br/>
                <div className="form-group">
                <label for="bill">Bill Amount</label>
                <input type="number" className="form-control" id="Bill" required placeholder="Insert the bill amount" 
                 onChange={(e)=>{
                    setstatus("Delivered");
                }}/><br/>
                </div>
  
                <button type="submit" className="btn btn-primary">Deliver</button>
            </form>
                    </div>
                    <div className="column2EditItem">
                        
                    
                </div>  

                    </div>

            </div>
                    </div>
)
}
export default OrderDeliver;