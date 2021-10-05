import React from "react";
import {Container,Row, Col} from  "react-bootstrap";

const Footer = () => {
  return (
    <div style={{ backgroundColor: "#222222", color: "white", padding: "7vh", alignContent:"flex-end"  }}>
      
      <Container>
      <Row type="flex"  gutter="20">
        <Col span={6}>
          <div>
            <h4 style={{ color: "white" }}>Our Mission</h4>
          </div>
          <div>
            <p>
            "As a Sri Lankan’s leader in advanced medical care, we take our responsibility seriously. Our mission, 
            vision and core values guide us as we work to heal our patients, care for every person and improve the health of our entire region."
            </p>
          </div>
        </Col>
        <Col span={6}>
          <div>
            <h4 style={{ color: "white  " }}>Privacy Policy</h4>
          </div>
          <div>
            <p>
              We use Your Personal data to provide and improve the Service. By
              using the Service, You agree to the collection and use of data.
              The requirements for Privacy Policies may differ from one country to another depending on the legislation. However, 
              most privacy laws identify the following critical points that a business must comply with when dealing with personal data:
            </p>
          </div>
        </Col>
        
       
        <Row>&copy; iCross Hospitals</Row>
      </Row>
      </Container>
    </div>
  );
};

export default Footer;
