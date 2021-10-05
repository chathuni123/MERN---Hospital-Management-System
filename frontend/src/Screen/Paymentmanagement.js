import React from 'react'
import Sidebar from '../Components/Sidebar';
import Payment from '../Components/Payment';
import {Container,Row,Col} from "react-bootstrap";

const Paymentmanagement = () => {
    return (
        <div>

        <Row >
          <Col sm={3} >
          <Container  >
      
          <Sidebar/>
          </Container>
      
      </Col>
      <Col sm={9}>
          <Container>
      
          <Payment/>
          </Container>
      
      </Col>
        </Row>
      
      
                 </div>
  
    );
  };
  
  export default Paymentmanagement;