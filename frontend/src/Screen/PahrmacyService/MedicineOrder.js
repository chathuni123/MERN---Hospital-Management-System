import { Component } from "react";
import { Button, Form, Dropdown, Container, Col, ButtonGroup, Row,OverlayTrigger,Tooltip } from "react-bootstrap";
import "./MedicineOrder.css";
import axios from "axios";
import decode from "jwt-decode";
import loading from '../../assests/loading.gif'
import validator from 'validator'
import Carousel from 'react-bootstrap/Carousel'

class MedicineOrder extends Component {

    state = {
        name: '',
        age: '',
        email: '',
        telNo: '',
        gender: 'Select One',
        address: '',
        allergies: '',
        currentlyTakingMedications: '',
        existingMedicalProblems: '',
        userId: '',
        signature:'',
        photo: '',
        emailError: '',
        phoneError: ''
      }

      componentDidMount = async () => {
    
        if (localStorage.getItem("authToken")) {
          const hasToken = localStorage.getItem("authToken");
          const id = decode(hasToken).id;
          await this.setState({ userId: id });
          console.log(this.state.userId);
          console.log(localStorage.getItem("authToken"));
        }
      }

      validateEmail = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });

        var email = e.target.value
      
        if (validator.isEmail(email)) {
          this.setState({ emailError: '' });
        } else {
          this.setState({ emailError: 'Enter valid email' });
        }
      }

      validatePhone = (e) => {
        var telNo = e.target.value
        var pattern = new RegExp(/^[0-9\b]+$/);
    
        if (!pattern.test(telNo)) {
          this.setState({ phoneError: 'Enter valid phone number' });
        } else if (telNo.length != 10) {
    
          this.setState({ phoneError: 'Enter valid phone number' });
    
        } else {
          this.setState({ phoneError: '' });
        }
        this.setState({ telNo: e.target.value });
      }

      handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        console.log(value)
      }
      
      handleSelect = (e) => {
        this.setState({ gender: e });
        console.log(e);
      }

      handleUpload = async e => {
        e.preventDefault()
        try{
          
          const file = e.target.files[0]
          if(!file) return alert("File not exists")
    
          if(file.size > 1024 * 1024 * 2) // 1mb
              return alert("Size too large!")
    
          if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
              return alert("File format is incorrect.")
    
          let formData = new FormData()
          formData.append('file', file)
          this.setState({ photo: loading})
          const res = await axios.post('http://localhost:6500/patient/upload', formData, {
            headers: {'content-type': 'multipart/form-data'}
          })
          console.log(res.data)
          this.setState({ photo: res.data.url})
    
        } catch (err){
          alert(err.response.data.msg)
        }
      }

      emptyFields = () => {
        this.setState({ name: '' })
        this.setState({ age: '' })
        this.setState({ email: '' })
        this.setState({ telNo: '' })
        this.setState({ gender: '' })
        this.setState({ address: '' })
        this.setState({ allergies: '' })
        this.setState({ currentlyTakingMedications: '' })
        this.setState({ existingMedicalProblems: '' })
        this.setState({ signature: '' })
        this.setState({ photo: '' })
      }

      handleSubmit = (e) => {
    
        e.preventDefault();

        if(this.state.name != '' && this.state.age != '' && this.state.email != ''&& this.state.telNo != '' && this.state.gender != 'Select One' && this.state.address != '' && this.state.signature != ''  && this.state.photo != '' && this.state.emailError == '' && this.state.phoneError == ''){
          const order = {
            name: this.state.name,
            age: this.state.age,
            email: this.state.email,
            telNo: this.state.telNo,
            gender: this.state.gender,  
            address: this.state.address,  
            allergies: this.state.allergies,  
            currentlyTakingMedications: this.state.currentlyTakingMedications,  
            existingMedicalProblems: this.state.existingMedicalProblems,  
            signature: this.state.signature,
            photo: this.state.photo,
            emailError: this.state.emailError,
            phoneError: this.state.phoneError
          }
      
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            }
          }
          console.log(this.state.userId)
  
          // add order
          try {
              axios.post(`http://localhost:6500/patient/medicineOrder/${this.state.userId}`, order).then(res => {
            if (res.data.success) {
              alert("Your Order Successfully Inserted");
              window.location=`/profile/patient/myPharmacyOrders`;
            } else {
              alert(res.data.message);
            }
          })
          } catch (error) {
            //alert(res.data.message);
          }
        } else {
          alert("Please check whether you entered information correctly")
        }
       
        
        
    }
    render() {
        return (
            <div className="home">
                <Container>
          <div style={{ position: "absolute", width: "30%", marginTop: "300px" }}>

            <Carousel variant="dark" fade >
              <Carousel.Item interval={3000}>
                <ol class="carousel-indicators">
                  <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
                  <li data-target="#myCarousel" data-slide-to="3"></li>
                </ol>
                <img
                  className="d-block w-100"
                  src="https://thumbs.dreamstime.com/b/online-doctor-telemedicine-medical-service-patients-vector-illustration-concept-consultation-internet-healthcare-182317956.jpg"
                />

              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <img
                  className="d-block w-100"
                  src="https://res.cloudinary.com/iplus/image/upload/v1629297812/SPM/b823e38cc01fdb9278b6f7faa2feda6d_v7svft.gif"
                  alt="First slide"
                />

              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <img
                  className="d-block w-100"
                  src="https://southernmarinderm.com/wp-content/uploads/2020/03/telehealth-Synchronous-audio5.png"
                />

              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <img
                  className="d-block w-100"
                  src="https://thumbs.dreamstime.com/b/doctor-using-stethoscope-phone-telemedicine-teleheal-telehealth-flat-vector-concept-illustration-hand-smartphone-88803780.jpg"
                />
              </Carousel.Item>
            </Carousel>
          </div>

        </Container>
        <h3 className="medicineOrder-top-title " textAlign="center" style={{ marginLeft: "30%", marginTop: "35px" }}>Medicine Order Form</h3>
        <div style={{ paddingTop: "5vh", paddingBottom: "5vh" }}>

      
                    <Container>

                        <Form style={{ marginLeft: "40%" }}>
                            <div className="medicineOrder-form-body">
                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicName">
                                    <Form.Label style={{ marginTop: "20px", font:" bold 20px/20px Times New Roman,serif" }}>Full Name</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the NAME is required !</h5></strong></Tooltip>}>
                                    <Form.Control type="text" placeholder="Enter full name" name="name"  style={{ maxHeight: "100%", marginTop: "10px" }} onChange={this.handleChange} />
                                </OverlayTrigger>
                                </Form.Group>

                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicAge">
                                    <Form.Label style={{ marginTop: "8px", font:" bold 20px/20px Times New Roman,serif" }}>Age</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the AGE is required !</h5></strong></Tooltip>}>
                                    <Form.Control type="number" placeholder="Enter your age" name="age"  style={{ maxHeight: "100%", marginTop: "10px" }} onChange={this.handleChange}/>
                                </OverlayTrigger>
                                </Form.Group>

                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicEmail">
                                    <Form.Label style={{ marginTop: "8px", font:" bold 20px/20px Times New Roman,serif" }}>Email</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the EMAIL is required !</h5></strong></Tooltip>}>
                                    <Form.Control type="email" placeholder="Enter your email" name="email"  style={{ maxHeight: "100%", marginTop: "10px" }} onChange={this.validateEmail}/>
                                    </OverlayTrigger>
                                    <span style={{
                                      fontWeight: 'bold',
                                      color: 'red',
                                    }}>{this.state.emailError}</span>
                                </Form.Group>

                                <Form.Group className="mb-3" as={Col} md={10}>
                  <Form.Label style={{ marginTop: "8px", font: " bold 20px/20px Times New Roman,serif" }}>Contact Number</Form.Label>
                  <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled"><strong><h5>Enter the VALID CONTACT NUMBER is required !</h5></strong></Tooltip>}>
                    <Form.Control type="number" placeholder="Enter your contact number" name="telNo" style={{ maxHeight: "100%", marginTop: "10px" }} onChange={this.validatePhone} />
                  </OverlayTrigger>
                  <span style={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}>{this.state.phoneError}</span>
                </Form.Group>

                <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the GENDER is required !</h5></strong></Tooltip>}>
                                <Dropdown as={Col} md={10} onSelect={this.handleSelect}>
                                    <Form.Label style={{ marginTop: "8px", font:" bold 20px/20px Times New Roman,serif" }}> Gender</Form.Label>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: "100%", maxHeight: "100%", marginTop: "8px" }}>
                                    {this.state.gender}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu style={{ width: "100%" }}>
                                        <Dropdown.Item eventKey="Female">Female</Dropdown.Item>
                                        <Dropdown.Item eventKey="Male">Male</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </OverlayTrigger>

                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicAddress">
                                    <Form.Label style={{ marginTop: "10px", font:" bold 20px/20px Times New Roman,serif" }}>Address</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the ADDRESS is required !</h5></strong></Tooltip>}>
                                    <Form.Control type="text" placeholder="Enter your address" name="address" style={{ maxHeight: "100%", marginTop: "8px" }} onChange={this.handleChange}/>
                                </OverlayTrigger>
                                </Form.Group>

                                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicEmail">
                                    <Form.Label style={{ marginTop: "8px", font:" bold 20px/20px Times New Roman,serif" }}>Do you have any allergies ? (Yes / No) </Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>This field is optional !</h5></strong></Tooltip>}>
                                    <Form.Control as="textarea" name="allergies" rows={2} style={{ marginTop: "10px" }} onChange={this.handleChange}/>
                                </OverlayTrigger>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" height="30%">
                                    <Form.Label style={{ marginTop: "20px" , font:" bold 20px/20px Times New Roman,serif"}}>Are you currently taking any medications ? (Yes / No) </Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>This field is optional !</h5></strong></Tooltip>}>
                                    <Form.Control as="textarea" rows={2} name="currentlyTakingMedications" style={{ marginTop: "10px" }} onChange={this.handleChange}/>
                                </OverlayTrigger>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" height="30%">
                                    <Form.Label style={{ marginTop: "20px" , font:" bold 20px/20px Times New Roman,serif" }}>Existing Medical Problems / Conditions</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>This field is optional !</h5></strong></Tooltip>}>
                                    <Form.Control as="textarea" rows={3} name="existingMedicalProblems" style={{ marginTop: "10px" }} onChange={this.handleChange}/>
                                    </OverlayTrigger>
                                </Form.Group>

                                <Form.Group className="mb-3"  controlId="formFile" height="30%">
                                    <Form.Label style={{ marginTop: "20px" , font:" bold 20px/20px Times New Roman,serif"}}>Medicine List <p style={{ font: " bold 18px/18px Times New Roman" }}> ( Please do not exceed the amount of file size 2MB )</p></Form.Label>
                                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled" style={{ backgroundColor: 'rgba(255, 100, 100, 0.85)', }} ><strong>Upload MEDICINE LIST as an IMAGE is required !</strong></Tooltip>} placement="right">
                                    <Col sm={3}>
                                      <img src={this.state.photo} style={{width: "200px"}}></img>
                                    </Col>
                                    </OverlayTrigger>
                                <span>
                                <input type="file" name="file" id="file_up"
                                accept="image/*" onChange={this.handleUpload} />
                                </span>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" height="30%">
                                    <Form.Label style={{ marginTop: "20px" , font:" bold 20px/20px Times New Roman,serif"}}>Signature</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the SIGNATURE is required !</h5></strong></Tooltip>}>
                                    <Form.Control as="textarea"  name="signature" style={{ marginTop: "10px" }} onChange={this.handleChange}/>
                                    </OverlayTrigger>
                                </Form.Group>

                                <Row>
                                    <Col>
                                        <ButtonGroup aria-label="Basic example">
                                            <Button variant="primary" type="submit" style={{ marginTop: "20px", marginLeft: "40px", width: "200px" }} onClick={this.handleSubmit}>
                                                Order Medicine
                                            </Button>
                                            <Col>
                                                <Button variant="outline-warning" type="reset" style={{ marginTop: "20px", marginLeft: "10%", marginRight: "20%", width: "200px"  }} onClick={this.emptyFields}>
                                                    Reset
                                                </Button>
                                            </Col>
                                        </ButtonGroup>
                                    </Col>
                                </Row>

                            </div>
                        </Form>
                    </Container>
                </div>
            </div>


        )
    }
}

export default MedicineOrder;