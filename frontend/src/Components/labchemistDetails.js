import React, { useState } from "react";
import { ListGroup, Button, Col, Row, Form, Modal, Container } from "react-bootstrap";
import axios from "axios";
import "./labChemistDetails.css";
import image from '../imagess/image-c.jpg'





const LabchemistDetails = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [show2, setShow2] = useState(false);
    const handleClose1 = () => setShow2(false);

    const [show3, setShow3] = useState(false);
    const handleClose2 = () => setShow3(false);


    const [confirmloading, setConfirmLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [fullname, setfullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setphone] = useState("");
    const [qualifications, setqualifications] = useState("");

    const [emailErr, setEmailErr] = useState({});
    const [phnErr, setPhnErr] = useState({});


    const [error] = useState("");

    const handleOk1 = () => {
        setConfirmLoading(true);
        const isValid = formValidation();
        if (isValid) {
            updateLabchemistHandeler();
            setTimeout(() => {
                setShow(false);
                setConfirmLoading(false);
            }, 5000);
        }
    };

    const formValidation = () => {
        const emailErr = {};
        const phnErr = {};
        let isValid = true;


        if (!email.includes('@')) {
            emailErr.nonAt = "Cannot insert email without @ sign"
            isValid = false;
        }
        if ((phone.length > 10) || (phone.length < 10)) {
            phnErr.invalidPhn = "Invalid phone number"
            isValid = false;
        }
        setEmailErr(emailErr);
        setPhnErr(phnErr);
        return isValid;
    }

    const handleOk3 = () => {
        setConfirmLoading(true);
        deletelabchemHandler();
        setTimeout(() => {
            setShow3(false);
            setConfirmLoading(false);
        }, 3000);
    };

    //Delete profile
    const deletelabchemHandler = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        };
        try {
            await axios
                .delete(
                    "http://localhost:6500/codebusters/api/labchemistpvt/deleteprofile",
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

    //Update labchemist details
    const updateLabchemistHandeler = async () => {
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
            qualifications,
        };

        try {
            await axios
                .put(
                    "http://localhost:6500/codebusters/api/labchemistpvt/editProfile",
                    dataObject,
                    config
                )
                .then((res) => {
                    console.log(props.resUsername);
                    alert("labchemist Update Successfully!");
                    window.location.reload();
                })
                .catch((err) => {
                    alert(err);
                });
        } catch (error) {
            alert("Error Occured-" + error);
        }
    };

    const handleShow = () => {
        setUsername(props.resUsername);
        setEmail(props.resEmail);
        setfullname(props.resfullname);
        setphone(props.resphone);
        setqualifications(props.resQualifications);
        setShow(true)
    };

    const showModal3 = () => {
        setShow3(true)
    };

    return (

        <div >
            <table className="mkcont">
                <tr >
                    <td>

                        <Container>
                            <label style={{ fontSize: "28px" , marginLeft:"100px"}}>My Profile</label>
                            <div className="lkContain">

                                <img style={{ paddingBottom: "40vh", paddingTop: "5px" }} src={image} height={500} width={300} alt="" />

                            </div>

                        </Container>

                    </td>

                    <td className="prodetails">
                        <div>
                            <Container>
                                <div >
                                    <ListGroup.Item style={{ fontSize: "18px", width: "32rem" }}>Lab Chemist Name: {props.resfullname}</ListGroup.Item>
                                    <ListGroup.Item style={{ fontSize: "18px", width: "32rem" }}>Qualifications: {props.resQualifications}</ListGroup.Item>
                                    <ListGroup.Item style={{ fontSize: "18px", width: "32rem" }}>Email: {props.resEmail}</ListGroup.Item>
                                    <ListGroup.Item style={{ fontSize: "18px", width: "32rem" }}>Conntact Number: {props.resphone}</ListGroup.Item>

                                    <ListGroup.Item style={{ width: "32rem" }}><br />
                                        <tr>
                                            <td>
                                                
                                                <Button className="crudbtn" onClick={handleShow} size="sm" variant="secondary">
                                                    Edit Details
                                                </Button>{"   "}
                                            </td>
                                            <td>
                                                 
                                                <Button className="crudbtnedit"  onClick={""} size="sm" variant="secondary">
                                                    Edit Picture
                                                </Button>{" "}
                                            </td>
                                            <td>
                                                <Button className="crudbtndelete" onClick={showModal3} size="sm">
                                                    Delete Account
                                                </Button>{" "}
                                            </td>
                                        </tr>
                                      
                                    </ListGroup.Item>

                                </div>

                            </Container>
                        </div>
                    </td>
                </tr>
            </table>
            <Modal show={show} onHide={handleClose} animation={true} >
                <Modal.Header closeButton>
                    <Modal.Title>Update LabChemist Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form>
                        {error && <span className="error-message">{error}</span>}


                        <Row><Col>
                            <Form.Group controlId="username">

                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter new username"
                                    value={username}
                                    onChange={(e) => {
                                        setUsername(e.target.value);
                                    }}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {Object.keys(emailErr).map((key) => {
                                    return <div style={{ color: "red" }}>{emailErr[key]}</div>
                                })}
                            </Form.Group>
                            <Form.Group controlId="fulname">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Full name"
                                    value={fullname}
                                    onChange={(e) => setfullname(e.target.value)}
                                    required
                                />
                            </Form.Group>

                            <Form.Group controlId="number">
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter contact number"
                                    value={phone}
                                    onChange={(e) => setphone(e.target.value)}
                                />
                                {Object.keys(phnErr).map((key) => {
                                    return <div style={{ color: "red" }}>{phnErr[key]}</div>
                                })}
                            </Form.Group>

                            <Form.Group controlId="qualifications">
                                <Form.Label>Qualifications</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter qualification"
                                    value={qualifications}
                                    onChange={(e) => setqualifications(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>


                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleOk1}>
                        Save Changes
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>




            <Modal show={show2} onHide={handleClose1} animation={false} confirmloading={confirmloading}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Profile Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className="position-relative mb-3" controlId="fileupload">
                        <h6>Please do not exceed the amount of file size 25MB </h6>

                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                    <Button variant="primary" >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>



            <Modal show={show3} onHide={handleClose2} animation={false} confirmloading={confirmloading}>
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



export default LabchemistDetails;