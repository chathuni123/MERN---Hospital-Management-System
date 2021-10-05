import React, { useState , useEffect} from "react";
import { Card, Button,Modal,Form ,Col,Container,Row} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

import "./appointment.css";
const Appointment = (props) => {
  const [fullname, setfullname] = useState("");
  const [appointments, setapointment] = useState([]);
  const [patientname, setpatientname] = useState("");
  const [suggesions, setsuggesions] = useState("");
  const [medicines, setmedicines] = useState("");
  const [othernotes, setothernotes] = useState("");
  const [docname, setdocname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const [show, setShow] = useState(false);
  
  
  const handledelete = (id) =>{ 
    deleteApointment(id);
  };


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOk2 = () => {
    addtreatmant();   

  };
 
  const addtreatmant = async () => {
  
    let dataObject = {
      patientname,
      suggesions,
      medicines,
      othernotes,
      docname
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

  useEffect(() => {
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
     
    const getAppointment= async () => {
      try {
        await axios
          .get(
            " http://localhost:6500/codebusters/api/patientpvt/appointment/getapointments"
          )
          .then((res) => {
            setapointment(res.data.apointment);
          })
          .catch((err) => {
            alert(err.message);
          });
      } catch (err) {
        alert("error :" + err);
      }
    };

    GetDoctorName();
    getAppointment();
  }, []);

  const deleteApointment = async (id) => {
    console.log(id);
    try {
        var option = window.confirm("Are you sure you want to delete this appointment ? ")
        if (option) {
            await axios.delete(`http://localhost:6500/codebusters/api/patientpvt/appointment/deleteapointments/${id}`)
                .then((res) => {
                    alert("Appointment Successfully Deleted");
                    window.location.reload(true);
                })
                .catch((err) => {
                    alert("Error occurred" + err);
                });
        }
    } catch (error) {
        alert("Error occurred" + error);
    }
  };
 

  return (  
    <div style={{paddingBottom:"4vh"}}>



      {appointments.map((appointment,index)=>
      (
        <div  key={index}>
 {appointment.physician === fullname && (
          <div style={{paddingTop:"1vh",paddingRight:"2vh"}}>
<Card 
className="hoover"
>
  <Card.Header as="h5">Name: {appointment.fullname}</Card.Header>
  <Card.Body>
    <Card.Title>Date: {appointment.appointmentDate}</Card.Title>
    <Card.Title>Time: {appointment.appointmentTime}</Card.Title>
    
    <Card.Text>
      Gender: {appointment.gender}
    </Card.Text>
    <Card.Text>
    {appointment.appointmentNote}
    </Card.Text>
    <Button variant="success" onClick={handleShow}>Give Treatmant </Button>{" "}
    <Button variant="danger" onClick={()=>handledelete(appointment._id)}>Delete </Button>{" "}

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
          <option value={appointment.physician}>{appointment.physician}</option>
      
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
          <option value={appointment.fullname}>{appointment.fullname}</option>
      
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
          <Link
           to={{
            pathname: "/report",
            data: appointment.fullname // Data
          }}
          >
          <Button variant="outline-dark" >
            Request Lab Report
          </Button>
        </Link>
          <Button variant="outline-primary" onClick={handleOk2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
</div>
 )}
        </div>

        
      )
      )}



    </div>
    
  );
};

export default Appointment;
