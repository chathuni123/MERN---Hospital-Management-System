import React from 'react'
import Sidebar from '../Components/Sidebar';
import Dashboad from '../Components/Dashboad';
import {Container,Row,Col} from "react-bootstrap";

const Admin = () => {
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
      
          <Dashboad/>
          </Container>
      
      </Col>
        </Row>
      
      
                 </div>
  
    );
  };
  
  export default Admin;