import React from "react";
import DoctorAppointment from "../DoctorAppointment/DoctorAppointment";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import MedicineOrder from "../PahrmacyService/MedicineOrder";
import MyAppointments from "../DoctorAppointment/MyAppointments";
import SearchDoctors from "../SearchDoctor/SearchDoctors";
import MyMedicineOrders from "../PahrmacyService/MyMedicineOrders";
import Carousel from 'react-bootstrap/Carousel'

const Patient = () => {

  const [key, setKey] = useState('home');

  return (
    //style={{display: "flex",justifyContent: "center",alignItems: "center"}} 
    <div style={{ marginTop: "50px", marginBottom: "50px", marginLeft: "5%", marginRight: "5%", paddingTop: "5vh", paddingBottom: "5vh" }}   >

      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-10"
        style={{ textAlign: "center", marginLeft: "30%", paddingBottom: "3vh", fontSize: "1rem" }}
      >

        <Tab eventKey="searchDoctors" title="Search for Doctors">
          <Container>
            <Row>
              <Col span={14}>
                <SearchDoctors />
              </Col>
            </Row>
          </Container>
        </Tab>

        <Tab eventKey="doctorAppointment" title="Doctor Appointment">
          <Container>
            <Row>
              <Col span={14}>
                <DoctorAppointment />
              </Col>
            </Row>
          </Container>
        </Tab>

        <Tab eventKey="myAppointments" title="My Appointments">
          <Container>
            <Row>
              <Col span={14}>
                <MyAppointments />
              </Col>
            </Row>
          </Container>
        </Tab>

        <Tab eventKey="pharmacyService" title="Pharmacy Service" >
          <Container>
            <Row>
              <Col span={14}>
                <MedicineOrder />
              </Col>
            </Row>
          </Container>
        </Tab>

        <Tab eventKey="pharmacyOrder" title="My Medicine Orders" >
          <Container>
            <Row>
              <Col span={14}>
                <MyMedicineOrders />
              </Col>
            </Row>
          </Container>
        </Tab>
      </Tabs>

      <Container>
        <div className="row img-fluid" style={{ marginLeft: "25px", marginTop: "50px", marginRight: "5px" }}>
          <div className="col-6 img-fluid" style={{ width: "1500px", marginLeft: "30px", marginRight: "10px" }}>
            <Carousel variant="dark" fade >
              <Carousel.Item interval={1000}>
                <ol class="carousel-indicators">
                  <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>

                <img
                  className="d-block w-100 img-fluid"
                  src="https://previews.123rf.com/images/stockgiu/stockgiu1905/stockgiu190502628/122804688-healthcare-medical-doctor-woman-at-hospital-doctors-office-cartoon-vector-illustration-graphic-desig.jpg"

                />
                <Carousel.Caption>
                  <h1 style={{ color: "black" }}> YOU CAN ORDER MEDICINE FROM PHARMACY</h1>
                  <p style={{ font: " bold 25px/20px Times New Roman,serif", color: "brown" }}>You can easily make a order for your prescription by using Pharmacy Service section</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100 img-fluid"
                  src="https://thumbs.dreamstime.com/b/visit-friend-sick-bed-hospital-room-modern-flat-style-illustration-167853790.jpg"

                />
                <Carousel.Caption>
                  <h1 style={{ color: "brown" }}> YOU CAN MAKE AN APPOINTMENT FOR A DOCTOR</h1>
                  <p style={{ font: " bold 25px/20px Times New Roman,serif", color: "black" }}>You can easily make an appointment by using the Doctor Appointment section</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100 img-fluid"
                  src="https://thumbs.dreamstime.com/b/patient-visit-hospital-ward-flat-illustration-mother-child-visiting-ill-friend-hospital-cartoon-color-character-139876242.jpg"

                />
                <Carousel.Caption>
                  <h1 style={{ color: "black" }}> YOU CAN SEARCH FOR THE DOCTORS</h1>
                  <p style={{ font: " bold 25px/20px Times New Roman,serif", color: "gold" }}>You can easily search the available doctors in the ICROSS using Search for Doctors section</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </Container>

      {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRclWhY1hKnF3-pK9ZyaPxViO_52BziVmyzurN45QzfOGiHumHEY0hs2eZGyqRHfl0Vpe0&usqp=CAU" className="ml-auto mr-auto" style={{width: '400px', marginTop: '25px'}}></img>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREtfQgvIyy-aeF-8a7gAYOI8K7-L4pbRhEmdFsX2zTecC5LQher9XspcfeFGOJ2j6C46M&usqp=CAU" className="ml-auto mr-auto" style={{width: '400px', marginTop: '25px'}}></img>
      <img src="https://previews.123rf.com/images/bytedust/bytedust1210/bytedust121000009/15861423-child-discharged-from-hospital-and-going-home.jpg" className="ml-auto mr-auto" style={{width: '400px', marginTop: '25px'}}></img> */}

    </div>

  );
}


export default Patient;