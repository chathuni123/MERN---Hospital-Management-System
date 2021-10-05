import React, { useState, useEffect } from "react";
import { Row, Col ,Container ,Card,Spinner,Button} from "react-bootstrap";

import axios from "axios";
import Editreportreq from "./Editreportreq";
const DocReport = () => {
  const [reports, setreports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  
  useEffect(() => {
    setLoading(true);
    const getReportData = async () => {
     
      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/doctorpvt/reportrequest/getreportrequest",
            
          )
          
          .then((res) => {
            setreports(res.data.Repoertrequest);            

          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
            setError(err);
          })
          .finally(() => {
            setLoading(false);
          });
        } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    getReportData();
  }, []);
  return (
    <div >     
      <Row>
        <Col >
          <Row>
            <Container>
           <h3 style={{paddingBottom:"1vh"}}>Added Reports</h3>
          {reports && reports.length > 0
                ? reports.map((item,report) => {
            return <div key={report}>
           
              <Card border="secondary" style={{ width: '40rem' }}  >
              
                <Card.Header><h5>Patient Name:  {item.patient} </h5>
          
         </Card.Header>
                <Card.Body>
               <Card.Title>Description:</Card.Title>
              <Card.Text>
              {item.patientsdescription}
             </Card.Text>
             <Editreportreq
                       respatientsdescription={item.patientsdescription} 
                       resdocnote={item.docnote}
                       resreporttype1={item.reporttype1}
                       resreporttype2={item.reporttype2}
                       resid={item._id}
                       resothertype={item.othertype}
                      />
            </Card.Body>
            
              </Card>
              <br/>                                           
              </div>
          })
        :  <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />{"     "}
        No Data Added or Network Error...
      </Button>}   
            </Container>
          </Row>
        </Col>   
      </Row>   
    </div>
  );
};

export default DocReport;
