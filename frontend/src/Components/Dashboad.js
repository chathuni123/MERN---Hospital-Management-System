import React, { useState, useEffect }  from "react";
import "./sidebar.css";
import axios from "axios";

import {Container,Row,Col,Table,ListGroup} from 'react-bootstrap'
const Dashboad = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [alluser, setallusers] = useState([]);
    const [profile, setprofile] = useState([]);

    useEffect(() => {
        setLoading(true);
    
        const GetUsers = async () => {
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
          try {
            await axios
              .get(
                "http://localhost:6500/codebusters/api/admin/allusers",
                config
              )
              
              .then((res) => {  
                setallusers(res.data.allusers);                        
                console.log(res.data.allusers);         
                
              })
              .catch((err) => {
                alert("Error occured!!! : " + err);
              });
          } catch (error) {
            alert("Error occured!!! : " + error);
          }
        };
    
        const getprofile= async () => {
         
          try {
            await axios
              .get(
                "http://localhost:6500/codebusters/api/admin/getprofile",
              )
              
              .then((res) => {
                setprofile(res.data.admindetails);
                console.log(res.data.admindetails);
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
        GetUsers();
        getprofile();
      }, []);
 
    
 
    return (
      <div style={{paddingBottom:"4vh",paddingTop:"3vh"}}>
      <div style={{paddingBottom:"4vh"}}>

      {profile.map((admindetails,index)=>
      (
        <div  key={index}>
        <h3>Hello {admindetails.username} </h3>
          <div style={{ paddingTop:"4vh",paddingBottom:"4vh",paddingLeft:"4vh"}} >
          <ListGroup as="ul" style={{width:"60vh"}}>
        <ListGroup.Item as="li" active action variant="dark">
       Full Name :  {admindetails.fullname}      
       
         </ListGroup.Item><ListGroup.Item as="li" disabled>
Role : {admindetails.role}  </ListGroup.Item>
  <ListGroup.Item as="li"> Email : {admindetails.email} </ListGroup.Item>
  
</ListGroup>
</div>

  </div>
      ))}

</div>
<div style={{paddingBottom:"1vh"}}>

 <Row>
    <Col>

<h3>Doctors</h3>
{alluser.map((allusers,index)=>
      (
        <div  key={index}>

<Container>

{allusers.role === "doctor" && (
 
 <Table striped bordered hover >
 <thead>
   <tr>
     <th>User Name</th>
     <th>Email</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>{allusers.username}</td>
     <td>{allusers.email}</td>
   </tr>   
 </tbody>
</Table>   
  )}
</Container>
</div> ))}
</Col>
   <Col>

   <h3>Pharmasists</h3>
{alluser.map((allusers,index)=>
      (
        <div  key={index}>

<Container>

{allusers.role === "pharmasist" && (
 
 <Table striped bordered hover >
 <thead>
   <tr>
     <th>User Name</th>
     <th>Email</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>{allusers.username}</td>
     <td>{allusers.email}</td>
   </tr>   
 </tbody>
</Table>   
  )}
</Container>
</div> ))}



   </Col>
  </Row>
</div>
  <Row>
    <Col>

<h3>Lab Chemists</h3>
{alluser.map((allusers,index)=>
      (
        <div  key={index}>

<Container>

{allusers.role === "labchemist" && (
 
 <Table striped bordered hover >
 <thead>
   <tr>
     <th>User Name</th>
     <th>Email</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>{allusers.username}</td>
     <td>{allusers.email}</td>
   </tr>   
 </tbody>
</Table>   
  )}
</Container>
</div> ))}
</Col>
   <Col>

   <h3>patients</h3>
{alluser.map((allusers,index)=>
      (
        <div  key={index}>

<Container>

{allusers.role === "patient" && (
 
 <Table striped bordered hover >
 <thead>
   <tr>
     <th>User Name</th>
     <th>Email</th>
   </tr>
 </thead>
 <tbody>
   <tr>
     <td>{allusers.username}</td>
     <td>{allusers.email}</td>
   </tr>   
 </tbody>
</Table>   
  )}
</Container>
</div> ))}



   </Col>
  </Row>
    </div>

  );
};

export default Dashboad;