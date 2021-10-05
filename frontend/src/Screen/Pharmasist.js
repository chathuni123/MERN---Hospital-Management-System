import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { Container, Row, Col,Tab,Tabs,Card } from "react-bootstrap";

import PharmacistDetails from "../Components/PharmacistDetails";
import axios from "axios";
import Pharmacist_Navbar from "../Components/Pharmacist_header"
import { Link } from "react-router-dom";
import "../Components/PFoarm.css"


const Pharmacist = () => {

  const [username, setUsername] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [license, setlicense] = useState("");

  const [pharmacists, setpharmacists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
   

  useEffect(() => {
    //Get labchemist details
    const getPharmacistDetails = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/pharmacistpvt/getProfile",
            config
          )

          .then((res) => {
            setUsername(res.data.pharmacist.username);
            setEmail(res.data.pharmacist.email);
            setfullname(res.data.pharmacist.fullname);
            setphone(res.data.pharmacist.phone);
            setlicense(res.data.pharmacist.license);


          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    getPharmacistDetails();
  }, []);

  useEffect(() => {
    setLoading(true);

    const getTreatments = async () => {
     
      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/notification/getsalary",
          )
          
          .then((res) => {
            console.log(res.data.allNotification)
            setpharmacists(res.data.allNotification); 
            console.log(pharmacists)                       
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
    getTreatments();
  }, []);


  return (
    <div>
      <Pharmacist_Navbar/>
    <div className="custom-body">
    <Row>
      <Col span={7}>
        <Row>
          <Container>
          <PharmacistDetails
                resUsername={username}
                resEmail={email}
                resfullname={fullname}
                resphone={phone}
                reslicense={license}

                /> 
          </Container>
        </Row>
      </Col>
      <Col span={17}>
        <Container className="custom-content-body">
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">

              <Tab eventKey="NOTIFICATIONS" title="NOTIFICATIONS">
              
              </Tab>
              </Tabs>
                {
                      pharmacists.filter((pharmacist)=>{
                        if(pharmacist.role=="pharmasist"){
                          return pharmacist      
                        }    
                      }).map(pharmacist => {
                        return (
                          //role: "pharmasist
                          <Card >
                              <Card.Body>
                              <Card.Text>
                              Date:{pharmacist.date}
                              </Card.Text>
                              <Card.Text>
                              You recieved your salary:${pharmacist.salary} 
                              </Card.Text>
                              </Card.Body>
                          </Card>                    
                       )
                        })
                    }
        </Container>
      </Col>
    </Row>
  </div>
  </div>
);
};

export default Pharmacist;




