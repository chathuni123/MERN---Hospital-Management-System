import React,{useState,useEffect} from "react"
import Pharmacist_Navbar from "./Pharmacist_header";
import {Link} from 'react-router-dom';

import axios from "axios";
import { Image } from "cloudinary-react";
import "./PFoarm.css"

function AllOrders(){
    
    const[Orders,setOrders] = useState([]);
    const[searchTerm,setSearchTerm]=useState("");
  
    useEffect(()=>{
        function getOrders(){
            axios.get("http://localhost:6500/order/").then((res)=>{
               // console.log(res.data)
                setOrders(res.data)
                 
            }).catch((err)=>{
                alert(err.message)
            })
        }
        getOrders();
    } , [])
    

    return(
        <div className="AllOrdercontainer">
             <Pharmacist_Navbar/>
             <div className="OrderTable">
             <h4 align="middle">All Orders</h4><br/>
        
             <input type="text" className="searchbx" placeholder="Search..." onChange={event=>{setSearchTerm(event.target.value)}}/>
             <div className="tableOrder">
            <table className="table"> 
        <thead className="thead-dark">
          <tr>
            <th>Patient Name</th>
            <th>Address</th>
            <th>Telephone No.</th>
            <th>Drug List</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="data">
          { Orders.filter((Order)=>{
        if(searchTerm==""){
          return Order
        }
        else if(Order.name.toLowerCase().includes(searchTerm.toLowerCase())){
          return Order
        }
        else if(Order.address.toLowerCase().includes(searchTerm.toLowerCase())){
          return Order
        }
        else if(Order.status.toLowerCase().includes(searchTerm.toLowerCase())){
          return Order
        }
        
        
      }).map(Order => {
          return (
            <tr>
              
              <td style={{paddingTop:"12vh"}}>{Order.name}</td>
              {/* <td>{Order.MediList}</td> */}
              <td style={{paddingTop:"12vh"}}>{Order.address}</td> 
              <td style={{paddingTop:"12vh"}}>{Order.telNo}</td>
              <td ><Image className="img" 
                  cloudName="/iplus/image/upload/" publicId={Order.photo}/>
              </td> 
              <td style={{paddingTop:"12vh"}}>{Order.status}</td> 
              <div className="btn-tb"><td> <Link to={"/pharmacist/orders/delivery/"+Order._id}> <button type="button" className="btn btn-primary">Deliver</button></Link>
               
              </td></div>
              
            </tr>
            
          )
        })}
          </tbody>
      </table>
     
        </div>
        </div> </div>
        
    )
}

export default AllOrders;

