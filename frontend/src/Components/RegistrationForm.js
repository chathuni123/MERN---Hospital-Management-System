import React, { useState } from "react";
import { Form, Col, Button, Spinner ,Container } from "react-bootstrap";
import axios from "axios";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  
    const [username, setUsername] = useState("");
    const [fullname, setfullname] = useState("");
    const [phone, setphone] = useState("");
    const [specialist, setspecialist] = useState("");
    const [qulifications, setqulifications] = useState("");
    const [license, setlicense] = useState("");

    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("");
    
    const [error, setError] = useState("");
    const [section, setSection] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
  
    const registrationHandler = (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      if (password !== confirmpassword) {
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setError("");
        }, 5000);
        setIsLoading(false);
        return setError("Passwords do not match");
      } else if (
        username.trim().length === 0 ||
        email.trim().length === 0 ||
        password.trim().length === 0
      ) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setIsLoading(false);
        return setError("Please fill all the fields");
      } else if (password.trim().length < 6) {
        setTimeout(() => {
          setError("");
        }, 5000);
        setIsLoading(false);
        return setError("Please use a password with at least 6 characters");
      }  else {
        if (role === "doctor") {
            registerdoctor();
          }
        if (role === "labchemist") {
          registerlabchemist();
        }
        if (role === "patient") {
          registerpatient();
        }
        if (role === "pharmasist") {
            registerapharmasist();
        }
      }
    };
  
    const registerdoctor = async () => {
        let postObject = {
          username,
          email,
          password,
          fullname ,
        phone,
        specialist,
        };
        await axios
          .post("http://localhost:6500/codebusters/api/auth/reg-doctor", postObject)
          .then((res) => {
            setIsLoading(false);
            alert("doctor registration Success");
            localStorage.setItem("authToken", res.data.token);
            localStorage.setItem("userRole", "doctor");
            window.location = `/profile/doctor`;
          })
          .catch((err) => {
            setIsLoading(false);
            alert("ERROR! " + err);
          });
      };


    const registerlabchemist = async () => {
      let postObject = {
        username,
        email,
        password,
        phone,
        qulifications,
        fullname,
      };
      await axios
        .post("http://localhost:6500/codebusters/api/auth/reg-labchemist", postObject)
        .then((res) => {
          setIsLoading(false);
          alert("labchemist registration Success");
          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("userRole", "labchemist");
          window.location = `/profile/labchemist`;
        })
        .catch((err) => {
          setIsLoading(false);
          alert("ERROR! " + err);
        });
    };
  
    const registerpatient = async () => {
      let postObject = {
        username,
        email,
        password,
        phone,
        fullname,
      };
      await axios
        .post(
          "http://localhost:6500/codebusters/api/auth/reg-patient",
          postObject
        )
        .then((res) => {
          setIsLoading(false);
          alert("patient registration Success");
          console.log("Done");
          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("userRole", "patient");
          window.location = `/profile/patient`;
        })
        .catch((err) => {
          setIsLoading(false);
          alert("ERROR! " + err);
        });
    };
  
   
    const registerapharmasist = async () => {
      setIsLoading(true);
      let postObject = {
        username,
        email,
        password,
        phone,
        fullname,
        license,
      };
      await axios
        .post("http://localhost:6500/codebusters/api/auth/reg-pharmasist", postObject)
        .then((res) => {
          setIsLoading(false);
          alert("pharmasist registration Success");
          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("userRole", "pharmasist");
          window.location = `/profile/pharmasist`;
        })
        .catch((err) => {
          setIsLoading(false);
          alert("ERROR! " + err);
        });
    };
  
    return (
      <div className="reg-form-body">
        <p className="reg-top-title">Registration</p>
  
        <Form onSubmit={registrationHandler}>
          {error && <span className="error-message">{error}</span>}
          {section === 1 && (
            <div>
              <Form.Group>
                <Form.Label as="legend" column sm={12}>
                  <h3>Register as:</h3>
                </Form.Label>
                <Col sm={12} style={{ fontSize: "1.1rem", paddingLeft: "3vw" }}>
                  <Form.Check
                    type="radio"
                    required={true}
                    label="Doctor"
                    onClick={() => {
                      setIsLoading(true);
                      setRole("doctor");
                      setTimeout(() => {
                        setSection(2);
                        setIsLoading(false);
                      }, 1000);
                    }}
                    id="formHorizontalRadios1"
                    name="formHorizontalRadios"
                  />
                  <Form.Check
                    type="radio"
                    required={true}
                    label="Lab Chemist"
                    onClick={() => {
                      setIsLoading(true);
                      setRole("labchemist");
                      setTimeout(() => {
                        setSection(2);
                        setIsLoading(false);
                      }, 1000);
                    }}
                    id="formHorizontalRadios2"
                    name="formHorizontalRadios"
                  />
                  <Form.Check
                    type="radio"
                    required={true}
                    label="patient"
                    onClick={() => {
                      setIsLoading(true);
                      setRole("patient");
                      setTimeout(() => {
                        setSection(2);
                        setIsLoading(true);
                      }, 1000);
                    }}
                    id="formHorizontalRadios3"
                    name="formHorizontalRadios"
                  />
                     <Form.Check
                    type="radio"
                    required={true}
                    label="Pharmasist"
                    onClick={() => {
                      setIsLoading(true);
                      setRole("pharmasist");
                      setTimeout(() => {
                        setSection(2);
                        setIsLoading(false);
                      }, 1000);
                    }}
                    id="formHorizontalRadios3"
                    name="formHorizontalRadios"
                  />
                </Col>
                <Col>
               <p>If Already have a account Then - Login </p>
                </Col>
              </Form.Group>
            {isLoading && <Spinner animation="border" />}
            </div>
          )}
          {section === 2 && (

            <Container>
            <Col>
              <Button
                variant="warning"
                onClick={() => {
                  setSection(1);
                }}
                style={{ marginBottom: "2vh" }}
              >
                Back
              </Button>
              <Form.Row>
                <Form.Group as={Col} md={6} controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </Form.Group>
  
                <Form.Group as={Col} md={6} controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We won't share your email with anyone else.
                  </Form.Text>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col} md={6} controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder=" with at least 6 characters"
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6} controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={confirmpassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col} md={6}>
                    <Form.Label>Full Name:&nbsp;</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Full Name as NIC"
                    value={fullname}
                    onChange={(e) => {
                      setfullname(e.target.value);
                    }}
                  />
                  </Form.Group>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Contact Number:&nbsp;</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Contact Number"
                    value={phone}
                    onChange={(e) => {
                      setphone(e.target.value);
                    }}
                  />
                  </Form.Group>
              </Form.Row>
              {role === "doctor" && (
              <div>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Field Of Specialist:&nbsp;</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Field of specialist"
                    value={specialist}
                    onChange={(e) => {
                      setspecialist(e.target.value);
                    }}
                  />
                  </Form.Group>                 
                </Form.Row>                
              </div>
            )}
            {role === "labchemist" && (
              <div>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>Qulifications:&nbsp;</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Qulifications"
                    value={qulifications}
                    onChange={(e) => {
                      setqulifications(e.target.value);
                    }}
                  />
                  </Form.Group>                 
                </Form.Row>                
              </div>
            )}{role === "pharmasist" && (
              <div>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label>License Number :&nbsp;</Form.Label>
                    <Form.Control
                    type="number"
                    placeholder="License Number"
                    value={license}
                    onChange={(e) => {
                      setlicense(e.target.value);
                    }}
                    
                  />
                  </Form.Group>                 
                </Form.Row>                
              </div>
            )}
            {role === "patient" && (
              <div>
                <Form.Row>
                  <Form.Group as={Col} md={6} style={{ marginTop: "1vh" }}>
                    <p>Greetings!! Welcome to iCross Hospitals..&nbsp;</p>
                    
                  </Form.Group>                 
                </Form.Row>                
              </div>
            )}
           </Col>
            <Col>
              <Button variant="outline-success" type="submit"  style={{ marginTop: "2vh" }}>Submit</Button>
              </Col>         
              </Container>
          )}
         
        </Form>
      </div>
    );
  };
  
  export default RegistrationForm;