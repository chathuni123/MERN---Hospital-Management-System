import React from 'react'
import Sidebar from '../Components/Sidebar';
import Homemanagement from '../Components/Homemanagement';
import {Container,Row,Col} from "react-bootstrap";

const Homescreenmanagement = () => {
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
      
          <Homemanagement/>
          </Container>
      
      </Col>
        </Row>
      
      
                 </div>
  
    );
  };
  
  export default Homescreenmanagement;