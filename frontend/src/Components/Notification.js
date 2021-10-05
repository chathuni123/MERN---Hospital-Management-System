import React, { useState, useEffect } from "react";

import { Card, Button} from "react-bootstrap";

import axios from "axios";
const Notification = (props) => {
  const [doctors, setdoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
 
  useEffect(() => {
    setLoading(true);

    const getTreatments = async () => {
     
      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/doctorpvt/getsalary/",
          )
          
          .then((res) => {
            setdoctors(res.data.salary);                        
          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
        } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    getTreatments();
  }, []);
  
 
  return (
    <div style={{paddingBottom:"4vh"}}>
      
  <input 
          className="form-control"
          type="text"
          value={search}
          placeholder="Search from date"
          name="searchQuery"
          onChange ={(e) =>{
            setSearch(e.target.value);
          }}
        style= {{ width:"40vh"}}
        />
  
    {doctors.filter(Notification => {
                          if(search == ""){
                              return Notification
                          }
                          else if(Notification.date.toLowerCase().
                          includes(search.toLowerCase())){
                            return Notification
                        }
                       
                      }).map((Notification,index)=>
    {
      return(
      <div  key={index}>
        
{Notification.userId === props.resid && (
  
        <div style={{paddingTop:"1vh",paddingRight:"2vh"}}>

<Card >

          <Card.Body>
    <Card.Title>{Notification.date}</Card.Title>
    <Card.Text>
    Salary :{Notification.salary}
    </Card.Text>
  </Card.Body>
</Card>

</div>
)}
      </div>      
    )}
    )}
  </div>
  );
};

export default Notification;
