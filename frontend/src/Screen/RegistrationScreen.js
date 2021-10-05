import React from "react";
import { Container,Row, Col } from "react-bootstrap";
import RegistrationForm from "../Components/RegistrationForm";
import Loginslides from "../Components/Loginslides";


const RegistrationScreen = () => {
  return (
    <div style={{ paddingTop: "5vh", paddingBottom: "10vh" }}>
       
       <Container>
        <Row>
          <Col span={14}>
            <RegistrationForm />
          </Col>    
          <Col span={14}>
            <Loginslides />
          </Col> 
        </Row>
        </Container>
    </div>
  );
};

export default RegistrationScreen;