import React, { useState } from "react";
import { ListGroup, Button, Col,Row, Form,Modal } from "react-bootstrap";
import "./doctorDetails.css";
import { Image } from "cloudinary-react";
import axios from "axios";
import FileBase from "react-file-base64";

const Doctordetails = (props) => {


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
  const [specialist, setspecialist] = useState("");
  const [other, setother] = useState("");
  const [university, setuniversity] = useState("");
  const [experience, setexperience] = useState("");
  
  
  
  const [base64, setEnc2Data] = useState(null);
  const [error] = useState("");

  

  

  const handleOk1 = () => {
    setConfirmLoading(true);
    updatedoctorHandeler();
    setTimeout(() => {
      setShow(false);
      setConfirmLoading(false);
    }, 3000);
  };

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
    deletedoctorHandler();
    setTimeout(() => {
      setShow3(false);
      setConfirmLoading(false);
    }, 3000);
  };

 

 
//Delete profile
  const deletedoctorHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      await axios
        .delete(
          "http://localhost:6500/codebusters/api/doctorpvt/deleteprofile",
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
          "http://localhost:6500/codebusters/api/doctorpvt/updatepic",
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


//Update doctor details
  const updatedoctorHandeler = async () => {
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
      specialist,
      university,
      other,
      experience
    };

    try {
      await axios
        .put(
          "http://localhost:6500/codebusters/api/doctorpvt/editProfile",
          dataObject,
          config
        )
        .then((res) => {
          console.log(props.resUsername);
          alert("Update Successfully!");
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
    setspecialist(props.resspecialist);
    setuniversity(props.resuniversity);
    setother(props.resother);
    setexperience(props.resexperience);

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
        <ListGroup.Item className="lkcustom-pp">
          <Image
            className="lkcustom-pp-img "
            cloudName="iplus"
            publicId={props.cusPP}
          />
        </ListGroup.Item>
        <ListGroup.Item>{props.resUsername}</ListGroup.Item>
        <ListGroup.Item>{props.resEmail}</ListGroup.Item>
        
        <ListGroup.Item>
          <Button  onClick={handleShow} size="sm" variant="outline-primary">
            Edit Details
          </Button>{" "}
          <Button onClick={showModal3} size="sm" variant="outline-danger">
            Delete Account
          </Button>{" "}<div style={{paddingTop:"1vh"}}>
          <Button onClick={handleShow2} size="sm" variant="outline-success">
            Update Picture
          </Button>{" "}</div>
        </ListGroup.Item>
      </ListGroup>
      

      <Modal show={show}  onHide={handleClose} animation={true} >
        <Modal.Header closeButton>
          <Modal.Title>Update Doctor Details</Modal.Title>
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
              <Form.Label>My Experience</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Experience"
                value={experience}
                onChange={(e) => setexperience(e.target.value)}
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
            </Form.Group>
            </Col>

          <Col>
            <Form.Group controlId="email">
              <Form.Label>Specialist at.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                value={specialist}
                onChange={(e) => setspecialist(e.target.value)}
              />
            </Form.Group>
            <Form.Group  controlId="email">
              <Form.Label>Studied University</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter university name"
                value={university}
                onChange={(e) => setuniversity(e.target.value)}
              />
            </Form.Group>
            <Form.Group  controlId="email">
              <Form.Label>Other details</Form.Label>
              
              <Form.Control
                as="textarea"
                rows="7"
                placeholder="Other"
                value={other}
                onChange={(e) => setother(e.target.value)}
              />
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

export default Doctordetails;
