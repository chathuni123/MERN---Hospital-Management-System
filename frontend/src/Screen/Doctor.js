import React, { useState, useEffect } from "react";
import { Container, Tabs,Tab,Row, Col } from "react-bootstrap";
import DoctorDetails from "../Components/DoctorDetails";
import Appointment from "../Components/Appointment";
import Appointmenthistory from "../Components/Appointmenthistory";
import Labreport from "../Components/Labreport";
import Notification from "../Components/Notification";
import axios from "axios";

const Doctorprofile = () => {
  const [id, setid] = useState(" ");

  const [username, setUsername] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [profileImage, setProfilePic] = useState(" ");
  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [specialist, setspecialist] = useState("");
  const [university, setuniversity ]= useState("");
  const [other, setother] = useState("");
  const [experience, setexperience] = useState("");
  

  useEffect(() => {
    //Get doctor details
    const GetDoctorDetails = async () => {
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
            setUsername(res.data.doctor.username);
            setEmail(res.data.doctor.email);
            setfullname(res.data.doctor.fullname);
            setphone(res.data.doctor.phone);
            setspecialist(res.data.doctor.specialist);
            setuniversity(res.data.doctor.university);
            setother(res.data.doctor.other);
            setexperience(res.data.doctor.experience);
            setProfilePic(res.data.doctor.profileImage.imagePublicId);
            setid(res.data.doctor._id);
          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    GetDoctorDetails();
  }, []);

  return (
    <div className="custom-body">
      <Row>
        <Col span={7}>
          <Row>
            <h3 style={{ paddingLeft: "5vh" ,paddingBottom:"1vh"}}>Hello {username}</h3>
            <Container>
              <DoctorDetails
                resUsername={username}
                resEmail={email}
                cusPP={profileImage}
                resfullname={fullname}
                resphone={phone}
                resspecialist={specialist}
                resuniversity={university}
                resother={other}
                resexperience={experience}
              />
            </Container>
          </Row>
        </Col>
        <Col span={17}>
          <Container className="custom-content-body">
<Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
  <Tab eventKey="APPOINMENT HISTORY" title="APPOINMENT HISTORY">
    <Appointmenthistory/>
  </Tab>
  <Tab eventKey="LAB REPORTS" title="LAB REPORTS">
    <Labreport/>
  </Tab>
  <Tab eventKey="APPOINMENTS" title="APPOINMENTS">
    <Appointment/>
  </Tab>
  <Tab eventKey="NOTIFICATIONS" title="NOTIFICATIONS">
  <Notification
  resid={id} 
  />
  </Tab>
</Tabs>

          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Doctorprofile;
