import React, { useState } from "react";
import { ListGroup, Button, Col,Row, Form,Modal } from "react-bootstrap";
import "./doctorDetails.css";
import { Image } from "cloudinary-react";
import axios from "axios";
import FileBase from "react-file-base64";
import image from '../imagess/pharm.jpg'

const PharmacistDetails = (props) => {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  
  const [show2,setShow2] = useState(false);
  const handleClose1 = () => setShow2(false);

  const [show3,setShow3] = useState(false);
  const handleClose2 = () => setShow3(false);


  const [confirmloading, setConfirmLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [license, setlicense] = useState("");
 
  const[emailErr,setEmailErr]=useState({});
  const[phnErr,setPhnErr]=useState({});
  
  
  const [base64, setEnc2Data] = useState(null);
  const [error] = useState("");

  

  

  const handleOk1 = () => {
    setConfirmLoading(true);

    const isValid = formValidation();
     if (isValid){
    updatepharmacistHandeler();
     
    setTimeout(() => {
      setShow(false);
      setConfirmLoading(false);
    }, 3000); }
  };

  const formValidation=()=>{
  const emailErr= {};
  const phnErr={};
  let isValid = true;


  if(!email.includes('@')){
        emailErr.nonAt="Can't insert email without @ sign. Please check the email again"
        isValid = false;
  }
  if((phone.length > 10) || (phone.length <10)){
        phnErr.invalidPhn= "Invalid phone number. Please insert a valid phone number"
        isValid=false;
  }
  setEmailErr(emailErr);
  setPhnErr(phnErr);
  return isValid;
  }

  const handleOk2 = () => {
    setConfirmLoading(true);
    updatepic();
    setTimeout(() => {
      setShow2(false);
      setConfirmLoading(false);
    }, 3000);
  };

  const handleOk3 = () => {
    setConfirmLoading(true);
    deletepharmacistHandler();
    setTimeout(() => {
      setShow3(false);
      setConfirmLoading(false);
    }, 3000);
  };

 

 
//Delete profile
  const deletepharmacistHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .delete(
          "http://localhost:6500/codebusters/api/pharmacistpvt/deleteprofile",
          config
        )
        .then((res) => {
          localStorage.removeItem("authToken");
          localStorage.removeItem("userRole");
          window.location = "/";
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert("Error Occured-" + error);
    }
  };

  //Update Propic
  const updatepic = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    let datapic = {
      fileEnc:base64
      
    };

    try {
      await axios
        .put(
          "http://localhost:6500/codebusters/api/pharmacistpvt/updatepic",
          datapic,
          config
        )
        .then((res) => {
          alert("Profile picture updated");
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert("Error Occured-" + error);
    }
  };


//Update pharmacist details
  const updatepharmacistHandeler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    let dataObject = {
      username,
      email,
      fullname,
      phone,
      license
    };

    try {
      await axios
        .put(
          "http://localhost:6500/codebusters/api/pharmacistpvt/editProfile",
          dataObject,
          config
        )
        .then((res) => {
          console.log(props.resUsername);
          alert("Pharmacist Updated Successfully!");
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert("Error Occured-" + error);
    }
  };
  
  const handleShow = ()=> {
    setUsername(props.resUsername);
    setEmail(props.resEmail);
    setEnc2Data(props.cusPP);
    setfullname(props.resfullname);
    setphone(props.resphone);
    setlicense(props.reslicense);
    

    setShow(true)  };  

    const handleShow2 = () => {
      setShow2(true)
    };
  
    const showModal3 = () => {
      setShow3(true)
    };
  return (
    <div className="navigation-panel">
      <ListGroup variant="flush">
        <ListGroup.Item className="lkcustom-pp" >

        <img style={{ paddingBottom: "40vh", paddingTop: "5px", marginBottom:"10vh", width:250 }} src="https://res.cloudinary.com/dzvbjfdsz/image/upload/v1632813937/pharm.98ecef87_nggt7f.jpg" height={500} width={300} alt="" />
        
        </ListGroup.Item>
        <div className="dwd"  style={{marginTop:"5vh"}}>
        <ListGroup.Item > User Name: {props.resUsername}</ListGroup.Item>
        <ListGroup.Item>Email:  {props.resEmail}</ListGroup.Item>
        <ListGroup.Item>Full Name: {props.resfullname}</ListGroup.Item>
        <ListGroup.Item>License Number: {props.reslicense}</ListGroup.Item>
        <ListGroup.Item>Phone Number: {props.resphone}</ListGroup.Item>
        </div>
        <ListGroup.Item>
        <button type="button" className="btn btn-primary" style={{marginBottom:"2vh",marginTop:"2vh"}} onClick={handleShow} size="sm" variant="outline-primary">
            Edit Details
          </button>{" "}
          <button type="button" className="btn btn-danger" onClick={showModal3} size="sm" variant="outline-danger">
            Delete Account
          </button>{" "}
        </ListGroup.Item>
      </ListGroup>



      <Modal show={show}  onHide={handleClose} animation={true} >
        <Modal.Header closeButton>
          <Modal.Title>Update Pharmacist Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form>
          {error && <span className="error-message">{error}</span>}
         

<Row><Col>            
            <Form.Group  controlId="username">
              
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group  controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {Object.keys(emailErr).map((key)=>{
                return <div style={{color:"red"}}>{emailErr[key]}</div>
              })}
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Full name"
                value={fullname}
                onChange={(e) => setfullname(e.target.value)}
              />
            </Form.Group>
            <Form.Group  controlId="email">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter license num"
                value={license}
                onChange={(e) => setlicense(e.target.value)}
              />
            </Form.Group>
           
          <Form.Group  controlId="email">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter contact number"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
               {Object.keys(phnErr).map((key)=>{
                return <div style={{color:"red"}}>{phnErr[key]}</div>
              })}
            </Form.Group>
            </Col>
            </Row>
        </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOk1}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>




      <Modal show={show2}  onHide={handleClose1} animation={false} confirmloading={confirmloading}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form.Group className="position-relative mb-3" controlId="fileupload">
          <h6>Please do not exceed the amount of file size 25MB </h6>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => {
              setEnc2Data(base64);
            }}
          />
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOk2}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    

      <Modal show={show3}  onHide={handleClose2} animation={false} confirmloading={confirmloading}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <p>This process can not undo, Press OK to delete user account</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose2}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOk3}>
           OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PharmacistDetails;
