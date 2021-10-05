import React, { useState , useEffect} from "react";
import { Card, Button,Modal,Form ,Col,Container,Row} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import "./appointment.css";
const Labreport = (props) => {
  const [labreports, setlabreport] = useState([]);
  const [fullname, setfullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [patientname, setpatientname] = useState("");
  const [suggesions, setsuggesions] = useState("");
  const [medicines, setmedicines] = useState("");
  const [othernotes, setothernotes] = useState("");
  const [docname, setdocname] = useState("");
  const [noteduetoreport, setnoteduetoreport] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOk2 = () => {
    addtreatmant();   

  };
  useEffect(() => {   
    const labreport= async () => {
      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/doctorpvt/reportrequest/getlabreport"
          )
          .then((res) => {
            setlabreport(res.data.labreport);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };
    const GetDoctorName = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/doctorpvt/getProfile",
            config
          )
          
          .then((res) => {           
            setfullname(res.data.doctor.fullname);
          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    GetDoctorName();
    labreport();
  }, []);

  const deletereport = async (_id) => {
     console.log(_id);
    try {
      await axios
        .delete(
          "http://localhost:6500/codebusters/api/labreport/delete/"+_id
        )
        .then((res) => {
          alert(" data deleted Successfully!");
          window.location.reload();})
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
  const addtreatmant = async () => {
  
    let dataObject = {
      patientname,
      suggesions,
      medicines,
      othernotes,
      docname,
      noteduetoreport
    };

    try {
      await axios
        .put(
          "http://localhost:6500/codebusters/api/doctorpvt/treatment/addtreatments",
          dataObject,
        )
        .then((res) => {
          alert("Treatment data added Successfully!");
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert("Error Occured-" + error);
    }
  };

  return ( 
    <div style={{paddingBottom:"4vh"}}>

{labreports.map((labreport,index)=>
    {
      return(
      <div  key={index}>
        
{labreport.docName === fullname && (
  
        <div style={{paddingTop:"1vh",paddingRight:"2vh"}}>

          
<Card 
border="secondary" style={{ width: '42rem' }} 
style={{paddingLeft:"2vh",paddingTop:"1vh"}}
>
<Card.Title as="h3" style={{paddingLeft:"2vh",paddingTop:"1vh",color:"darkblue"}} >Patient Name: {labreport.patientName}    TestID: {labreport.testId}</Card.Title>
<Card.Body>
  <Card.Text as="h4">Test Name: {labreport.testName}</Card.Text>
  <Card.Text as="h5" style={{paddingTop:"0.1vh"}}>Description: {labreport.description}</Card.Text>
  
  <Card.Text as="p">
  Chemist Name: {labreport.chemistName}
  </Card.Text>
  <Card.Text as="p">
Date : {labreport.date}
  </Card.Text>
  <Button variant="outline-danger"  style={{paddingTop:"1.5vh"}} onClick={()=>deletereport(labreport._id)} >Delete</Button>{"   "}
  <Button variant="outline-success"  style={{paddingTop:"1.5vh"}} onClick={handleShow} >Re-Arange Treatment</Button>{"   "}
</Card.Body>
</Card>


<Modal show={show} onHide={handleClose} size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Treatmant</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Container>
            <Row>
              <Col>
               <Form.Group  controlId="doc">
              <Form.Label>Doctor name :- </Form.Label>
              <Form.Control
          as="select"
          required={true}
          custom
          onChange={(e) => {
            setdocname(e.target.value); }}>
            <option value="not selected">Select Doctor Name</option>
          <option value={fullname}>{fullname}</option>
      
        </Form.Control>   
            </Form.Group>
              <Form.Group  controlId="pname">
              <Form.Label>patient name :- </Form.Label>
              <Form.Control
          as="select"
          required={true}
          custom
          onChange={(e) => {
            setpatientname(e.target.value); }}>
            <option value="not selected">Select Patient Name</option>
          <option value={labreport.patientName}>{labreport.patientName}</option>
      
        </Form.Control>   
            </Form.Group>
            <Form.Group  controlId="topic">
              <Form.Label>Suggesions</Form.Label>
              <Form.Control
              as="textarea"
              required={true}
              rows="5"
                placeholder="Add Sugessions"
                value={suggesions}
                onChange={(e) => {
                  setsuggesions(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group  controlId="topic">
              <Form.Label> Note Due To Report</Form.Label>
              <Form.Control
                as="textarea"
                required={true}
                rows="5"
                placeholder="Note Due To Report"
                value={noteduetoreport}
                onChange={(e) => {
                  setnoteduetoreport(e.target.value);
                }}
              />
            </Form.Group>
              </Col>
              <Col>
              <Form.Group  controlId="topic">
              <Form.Label>Medicines</Form.Label>
              <Form.Control
               as="textarea"
               required={true}
               rows="5"
                placeholder="Add medicines"
                value={medicines}
                onChange={(e) => {
                  setmedicines(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group  controlId="topic">
              <Form.Label>Other Notes</Form.Label>
              <Form.Control
                as="textarea"
                required={true}
                rows="5"
                placeholder="Add Note"
                value={othernotes}
                onChange={(e) => {
                  setothernotes(e.target.value);
                }}
              />
            </Form.Group>
           
              </Col>

            </Row>

            </Container>
           
          
        </Form>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        
          <Button variant="outline-primary" onClick={handleOk2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
</div>
)}
      </div>         
    )}
    )}



</div>
    
  );
};

export default Labreport;
