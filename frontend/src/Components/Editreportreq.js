import React, { useState } from "react";
import { ListGroup, Button, Col, Form,Modal } from "react-bootstrap";
import axios from "axios";

const Editreseaechppr = (props) => {
    const [show, setShow] = useState(false);
  const [ patientsdescription, setpatientsdescription] = useState("");
  const [docnote, setdocnote] = useState("");
  const [reporttype1, setreporttype1] = useState("");
  const [reporttype2, setreporttype2] = useState("");
  const [othertype, setothertype] = useState("");

  const [tID,setid] = useState("");

  const [error] = useState("");
  

  const handleShow = () =>{ 
      setShow(true);
      setpatientsdescription(props.respatientsdescription);
      setdocnote(props.resdocnote);
      setreporttype1(props.resreporttype1);
      setreporttype2(props.resreporttype2);
      setothertype(props.resothertype);
      setid(props.resid);
    };

 

  

  const handleOk1 = () => {
    updatereport();
    
  };


  const handleOk3 = (tID) => {
    deletedata(tID);
   
  };

 

  

  const deletedata = async (tID) => {
 
    try {
      await axios
        .delete(
          "http://localhost:6500/codebusters/api/doctorpvt/reportrequest/removereportrequest/"+tID,
          
        )
        .then((res) => {
          alert(" data deleted Successfully!");
          window.location.reload();

        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert("Error Occured-" + error);
    }
  };

  const updatereport  = async () => {
   

    let dataObject = {
      tID,
        patientsdescription,
        docnote,
        reporttype1,
        reporttype2,
        othertype,
      
    };

    try {
      await axios
        .put(
          "http://localhost:6500/codebusters/api/doctorpvt/reportrequest/updatereportrequest",
          dataObject,
          
        )
        .then((res) => {
          alert(" data Update Successfully!");
          window.location.reload();
        })
        .catch((err) => {
          alert(err);
        });
    } catch (error) {
      alert("Error Occured-" + error);
    }
  };

  const handleClose = () => setShow(false);



  return (

    
    <div>

<ListGroup variant="flush">
        <ListGroup.Item>
          <Button onClick={handleShow} size="sm" variant="outline-warning">
            Edit  Data 
          </Button>{" "}
          <Button onClick={()=>handleOk3(props.resid)}size="sm" variant="outline-danger">
            Delete  Data
          </Button>{" "}
        </ListGroup.Item>
      </ListGroup>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          {error && <span className="error-message">{error}</span>}
          <Form.Row>
            <Form.Group as={Col} md={5} controlId="topic">
              <Form.Label>patients description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new patients description"
                value={patientsdescription}
                onChange={(e) => {
                    setpatientsdescription(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} md={10} controlId="subject">
              <Form.Label>Doctor Note</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                placeholder="Enter Doctor Note"
                Row={200}
                value={docnote}
                onChange={(e) => setdocnote(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md={10} controlId="abstract">
              <Form.Label>report type 1</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter report type 1"
                value={reporttype1}
                onChange={(e) => setreporttype1(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md={10} controlId="abstract">
              <Form.Label>report type 2</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter report type 2"
                value={reporttype2}
                onChange={(e) => setreporttype2(e.target.value)}
              />
            </Form.Group>
            <Form.Group as={Col} md={10} controlId="abstract">
              <Form.Label>report othertypes</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter other types"
                value={othertype}
                onChange={(e) => setothertype(e.target.value)}
              />
            </Form.Group> 
          </Form.Row>
        </Form></Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleOk1}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>







        
     
     
    </div>
  );
};

export default Editreseaechppr;
