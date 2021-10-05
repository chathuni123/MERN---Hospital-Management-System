import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { Container, Row, Col } from "react-bootstrap";
import '../Components/labChemist.css';
import LabchemistDetails from "../Components/labchemistDetails";
import axios from "axios";
import { Link } from "react-router-dom";


const Labchemist = () => {

  const [username, setUsername] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [qualifications, setqualifications] = useState("");

  useEffect(() => {
    //Get labchemist details
    const getLabChemDetails = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/labchemistpvt/getProfile",
            config
          )

          .then((res) => {
            setUsername(res.data.labchemist.username);
            setEmail(res.data.labchemist.email);
            setfullname(res.data.labchemist.fullname);
            setphone(res.data.labchemist.phone);
            setqualifications(res.data.labchemist.qualifications);


          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    getLabChemDetails();
  }, []);




  return (
    <div style={{ paddingTop: "1vh", paddingBottom: "1vh" }}>
      <div className="chembtn-container">
        <div className="row row-cols-1 row-cols-md-3 g-4">

          <div className="col">
            <Link to="/labchemist/labreports">
              <Button className="chembtn" variant="secondary">Lab Reports</Button>
            </Link>
          </div>
          <Link to="/labchemist/notifications">
            <div className="col">
              <Button className="chembtnr" variant="secondary">Notifications</Button>
            </div>
          </Link>


        </div>

      </div>
      <div className="profile-container">
        <label className="profileTopic" style={{fontSize:"30px", paddingTop: "7vh",}}>Welcome {username}.. Have a good day..</label>
        <div className="custom-body">
          <Row>
            <Col>

              <Container>
                <LabchemistDetails
                  resUsername={username}
                  resEmail={email}
                  resfullname={fullname}
                  resphone={phone}
                  resQualifications={qualifications}
                />
              </Container>

            </Col>

          </Row>
        </div>
      </div>

    </div>
  );
};

export default Labchemist;