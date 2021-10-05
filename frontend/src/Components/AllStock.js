import React,{useState,useEffect} from "react"
import Pharmacist_Navbar from "./Pharmacist_header";
import {Link} from 'react-router-dom';

import axios from "axios";
import "./PFoarm.css"
//import Items from "../../";
import jsPDF from 'jspdf'
import DatePicker from "react-datepicker";
import { DatePickerComponent, DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import "react-datepicker/dist/react-datepicker.css";
import autotable from 'jspdf-autotable'


function AllStockItem(){
    
    const[stockItems,setStockItems] = useState([]);
    let [searchTerm,setSearchTerm] =useState("")

    const handlepdf = (MediNames,Amounts,Costs,Companys,ManuDates,ExpireDates) =>{ 
      createPDF(MediNames,Amounts,Costs,Companys,ManuDates,ExpireDates);
    };

    useEffect(()=>{
        function getItems(){
            axios.get("http://localhost:6500/item/").then((res)=>{
                //console.log(res.data)
                setStockItems(res.data);

            }).catch((err)=>{
                alert(err.message)
            })
        }
        getItems();
    } , [])
    function DeleteIteme(id){
            const item_id = id;
            console.log(item_id)
            axios.delete("http://localhost:6500/item/delete/"+item_id).then(()=>{
             alert("Item deleted")
             window.location.reload();
           
           
            }).catch((err)=>{
                alert(err)
             })
    }

    //create pdf func
    const createPDF = (MediNames,Amounts,Costs,Companys,ManuDates,ExpireDates) =>{
      console.log(MediNames);
      console.log(Amounts);
      console.log(Costs);

  const unit = "pt";
  const size = "A4"; //page size
  const orientation = "landscape";
  const marginLeft = 40;
  const doc = new jsPDF( orientation , unit , size ); //create document


  const title = `| iCross  - Stock Details |-  `;
  const Medi_Name = ` Medicine Name: ${MediNames} `;
  const amount = `Amount: ${Amounts} `;
  const cost = `Cost: ${Costs} `;
  const company = `Company Name: ${Companys} `;
  const Manu_Date=`Manufatured Date :  ${ManuDates}`;
  const Expire_Date=`Expiry Date :  ${ExpireDates}`;
  const image =  "https://res.cloudinary.com/iplus/image/upload/v1627568386/SPM/logo_nmawad.png"; 
  const back ="https://res.cloudinary.com/iplus/image/upload/v1632938647/SPM/118-1184729_clipart-stock-animated-clip-art-clipartcow-clipartix-medicine_copy_i1wsbn.png";
  const left = 30;
  const top = 8;
  const imgWidth = 100;
  const imgHeight = 100;
 
  const lefts = 500;
  const tops = 300;
  const imgWidths = 300;
  const imgHeights = 250;
  doc.setFontSize( 20 );
  doc.text (150, 40,title);
  doc.text(150, 100,Medi_Name);
  doc.text(60, 200, amount);  
  doc.text(60, 250, cost);  
  doc.text(60, 300, company);  
  doc.text(60, 350, Manu_Date);
  doc.text(60, 400, Expire_Date);  
  doc.addImage(image, 'PNG', left, top, imgWidth, imgHeight);
  doc.addImage(back, 'PNG', lefts, tops, imgWidths, imgHeights);
     doc.save ("Stock.pdf")
}
  

    return(
        <div className="Allstockcontainer">
             <Pharmacist_Navbar/>
             <div className="StockTable">
             <h4 align="middle">Stock Items</h4><br/>
             <div className="searchndadbtn">
             <Link to="/pharmacist/stock/add">
                   <div className="addItembtn"> <button type="button" className="btn btn-primary">Add New Item</button></div>
            </Link>
            
           
           <input type="text" className="searchbx" placeholder="Search..." onChange={event=>{setSearchTerm(event.target.value)}}/>
           </div>
            <table className="table"> 
            
        <thead className="thead-dark">
          <tr>
            <th>Madicine Name</th>
            <th>Amount</th>
            <th>Cost</th>
            <th>Company Name</th>
            <th>Matufactured Date</th>
            <th>Expiry Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody> 
      { stockItems.filter((item)=>{
        if(searchTerm==""){
          return item
        }
        else if(item.MediName.toLowerCase().includes(searchTerm.toLowerCase())){
          return item
        }
        else if(item.CompanyName.toLowerCase().includes(searchTerm.toLowerCase())){
          return item
        }
        
        
      }).map(item => {
        return (
          <tr>
            <td>{item.MediName}</td>
            <td>{item.Amount}</td>
            <td>{item.Cost}</td> 
            <td>{item.CompanyName}</td> 
            <td><DatePickerComponent readOnly style={{ fontSize:"16px"}} value={item.ManuDate}></DatePickerComponent></td> 
            <td><DatePickerComponent readOnly style={{ fontSize:"16px"}} value={item.ExpireDate}></DatePickerComponent></td> 
            <div class="btn-toolbar"><td> <Link to={"/pharmacist/stock/edit/"+item._id}>
               <button type="button" className="btn btn-primary">Edit</button></Link>
                <button type="button"  class="btn btn-danger" onClick={()=>{DeleteIteme(item._id)}}>Delete</button>
               <button type="button" className="bt-sm " onClick = {()=>{handlepdf(item.MediName,item.Amount,item.Cost,item.CompanyName,item.ManuDate,item.ExpireDate)}} >Generate Report</button>
               
               
                
                  
            </td></div>
          </tr>
          
        )
      })}
     
    </tbody>
      </table>

        </div> </div>
    )
}

export default AllStockItem;

