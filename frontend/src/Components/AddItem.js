import React,{useState} from "react";
import Pharmacist_Navbar from "./Pharmacist_header";
import axios from "axios";
import "./PFoarm.css"
import DatePicker from "react-datepicker";
import { DatePickerComponent} from "@syncfusion/ej2-react-calendars"

import "react-datepicker/dist/react-datepicker.css";


function AddItem(){
    const[Medi_Name,setMediName] = useState("");
    const[Amount,setAmount] = useState("");
    const[Cost,setCost] = useState("");
    const[Company_Name,setCompanyName] = useState("");
    const[ManuDate,setManuDate] = useState("");
    const[ExpireDate,setExpireDate] = useState("");

    // new Date(new Date().getFullYear(),new Date().getMonth(), 14)

     
    
    function sendData(e){
        e.preventDefault();
        
        console.log(ExpireDate)
        const newItem = {Medi_Name,Amount,Cost,Company_Name,ManuDate,ExpireDate}
        console.log(newItem)

        axios.post("http://localhost:6500/item/add/",newItem).then(()=>{
            console.log(newItem)
            alert("Item Added")
            window.location.reload();
           
           
        }).catch((err)=>{
            alert(err)
        })
    }

    
    return(
    
        <div  className="AddItemContainer">
        <Pharmacist_Navbar/>
       
            <br/>
            <div className="item-edit-form">
            <div className="rowEditItem">
             <div className="column1AddItem">
                 <h4 align="middle" >Add Item</h4><br/>
            <form onSubmit={sendData}>
                <div className="form-group">
                <label for="drugName">Medicine Name</label>
                <input type="text" class="form-control" id="drugName" required placeholder="Enter the drug name" 
                onChange={(e)=>{
                    setMediName(e.target.value);
                }}/> <br/>
                </div>
                <div className="form-group">
                <label for="Amount">Amount</label>
                <input type="number" className="form-control" id="Amount" required  placeholder="Enter Amount"
                 onChange={(e)=>{
                    setAmount(e.target.value);
                }}/> <br/>
                </div>
                <div className="form-group">
                <label for="cost">Cost (Rs.)</label>
                <input type="number" className="form-control" id="cost" required placeholder="Enter Cost"
                 onChange={(e)=>{
                    setCost(e.target.value);
                }}/> <br/>
                </div>
                <div className="form-group">
                <label for="Cname">Company Name</label>
                <input type="text" className="form-control" id="Cname" required placeholder="Enter Company Name"
                 onChange={(e)=>{
                    setCompanyName(e.target.value);
                }}/> <br/>
                </div>
                <div>
                <label for="mDate">Manufactured Date</label>    
                <DatePickerComponent
                 className="form-control" 
                 id='date' 
                 name="date" 
                 placeholder="" 
                 value={ManuDate}  
                 onChange={(date) => setManuDate(date.target.value)} 
                 style={{ backgroundColor: "white", color: "black", padding: "6px", fontSize: "15px" }}
                                    required
                 />
                </div> <br/>   
                <div>
                <label for="eDate">Expiry Date</label>    
                <DatePickerComponent 
                className="form-control" 
                id='date' 
                name="date" 
                placeholder="" 
                value={ExpireDate} 
                onChange={(edate) => setExpireDate(edate.target.value)} 
                style={{ backgroundColor: "white", color: "black", padding: "6px", fontSize: "15px" }}
                                    required/>
                </div>    
                <br/><button type="submit" className="btn btn-primary">Add</button><br/>
            </form>
            </div>
            <div className="column2AddItem">
                        
                    
                </div>  
            </div>
            </div>
                    </div>
    )
}
export default AddItem;