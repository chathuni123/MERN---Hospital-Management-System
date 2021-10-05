import { Component } from "react";
import { Button, Form, Container, Image, Col, ButtonGroup, Row, Modal, Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import "../Screen/PatientProfile/PatientProfile.css";
import decode from "jwt-decode";
import axios from "axios";
import { Link } from "react-router-dom";
import image14 from "../assests/image14.jpg"
import Slider from './Slides/PatientSlides'
import loading from '../assests/loading.gif'
import Carousel from 'react-bootstrap/Carousel'


class PatientProfile extends Component {

  state = {
    //id:'',
    userId: '',
    user: '',
    Modal: false,
    address: '',
    bloodGroup: '',
    email: '',
    fullname: '',
    gender: '',
    nicNumber: '',
    password: '',
    phone: '',
    role: '',
    username: '',
    zipcode: '',
    avatar: '',
    phoneError: ''
  }

  componentDidMount = async () => {

    if (localStorage.getItem("authToken")) {
      const hasToken = localStorage.getItem("authToken");
      const id = decode(hasToken).id;
      await this.setState({ userId: id });
      console.log(this.state.userId);
      console.log(localStorage.getItem("authToken"));

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        }
      }





      // get patient details 
      await axios.get(`http://localhost:6500/patient/getPatientDetails/${this.state.userId}`, config).then(res => {
        if (res.data.success) {
          this.setState({ user: res.data.data })
          this.setState({ address: this.state.user.address })
          this.setState({ bloodGroup: this.state.user.bloodGroup })
          this.setState({ email: this.state.user.email })
          this.setState({ fullname: this.state.user.fullname })
          this.setState({ gender: this.state.user.gender })
          this.setState({ nicNumber: this.state.user.nicNumber })
          this.setState({ password: this.state.user.password })
          this.setState({ phone: this.state.user.phone })
          this.setState({ role: this.state.user.role })
          this.setState({ username: this.state.user.username })
          this.setState({ zipcode: this.state.user.zipcode })
          this.setState({ avatar: this.state.user.avatar })
          console.log(this.state.user);
        }
      }
      )
    }
  }

  openModal = () => {
    this.setState({ Modal: true })
  }

  closeModal = () => {
    this.setState({ Modal: false })
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    console.log(e.target.value)

  }

  validatePhone = (e) => {
    var phone = e.target.value
    var pattern = new RegExp(/^[0-9\b]+$/);

    if (!pattern.test(phone)) {
      this.setState({ phoneError: 'Enter valid phone number' });
    } else if (phone.length != 10) {

      this.setState({ phoneError: 'Enter valid phone number' });

    } else {
      this.setState({ phoneError: '' });
    }
    this.setState({ phone: e.target.value });
  }

  handleUpload = async e => {
    e.preventDefault()
    try {
      const file = e.target.files[0]
      if (!file) return alert("File not exists")

      if (file.size > 1024 * 1024 * 3) // 3mb
        return alert("Size too large!")

      if (file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
        return alert("File format is incorrect.")

      let formData = new FormData()
      formData.append('file', file)
      this.setState({ avatar: loading })

      const res = await axios.post('http://localhost:6500/patient/upload', formData, {
        headers: { 'content-type': 'multipart/form-data' }
      })
      console.log(res.data)
      this.setState({ avatar: res.data.url })

    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  //Delete profile
  deletePatientHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      var option = window.confirm("Are you sure you want to delete this profile ? ")
      if (option) {
        alert("You have delete this account with :  " + this.state.email);

        await axios
          .delete(
            'http://localhost:6500/patient/deletePatientProfile/' + this.state.email,
            config
          )
          .then((res) => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("userRole");
            window.location = "/";
          })
          .catch((err) => {
            alert(err);
          });
      }
    } catch (error) {
      alert("Error Occured-" + error);

    }
  };

  submitDetails = (e) => {
    e.preventDefault();

    if (this.state.address != null && this.state.address != '' && this.state.bloodGroup != null && this.state.bloodGroup != '' && this.state.fullname != '' && this.state.gender != '' && this.state.gender != null && this.state.nicNumber != null && this.state.nicNumber != '' && this.state.phone != '' && this.state.phone != null && this.state.phoneError == '') {
      const patient = {
        userId: this.state.userId,
        address: this.state.address,
        bloodGroup: this.state.bloodGroup,
        email: this.state.email,
        fullname: this.state.fullname,
        gender: this.state.gender,
        nicNumber: this.state.nicNumber,
        password: this.state.password,
        phone: this.state.phone,
        username: this.state.username,
        zipcode: this.state.zipcode,
        avatar: this.state.avatar,
        phoneError:this.state.phoneError
      }


      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        }
      }

      // update patient details
      axios.put('http://localhost:6500/patient/updatePatientDetails', patient, config).then(res => {
        if (res.data.success) {
          alert(res.data.message);
          window.location.reload(false);
          //window.location.reload();

        }
      })

    } else {
      alert('Oops! You havent entered some required information')
    }


  }


  selectGender = (e) => {
    console.log(e);
    this.setState({ gender: e })
  }

  selectBloodGroup = (e) => {
    console.log(e);
    this.setState({ bloodGroup: e })
  }



  render() {
    return (
      <div className="home">

        <div className="row row-cols-1 row-cols-md-3 g-4">
          <Link to="/profile/patient/getServices">
            <div className="col">
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled"><strong><h5>By clicking this button you can make a doctor appointment and get pharmacy services , provided by the ICROSS!</h5></strong></Tooltip>}>
                <Button className="btnr" variant="primary" style={{ marginLeft: "80%", width: "150%", marginTop: "20px" }}> Click Here To Get Our Services</Button>
              </OverlayTrigger>
            </div>
          </Link>

        </div>
        <Container>
          <div style={{ position: "absolute", width: "30%", marginTop: "300px" }}>

            <Carousel variant="dark" fade >
              <Carousel.Item interval={3000}>
                <ol class="carousel-indicators">
                  <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                  <li data-target="#myCarousel" data-slide-to="1"></li>
                  <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>

                <img
                  className="d-block w-100"
                  src="https://thumbs.dreamstime.com/b/online-doctor-telemedicine-medical-service-patients-vector-illustration-concept-consultation-internet-healthcare-182317956.jpg"

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

        <h3 className="patient-top-title" textAlign="center" style={{ marginLeft: "30%", marginTop: "35px" }}>Patient Profile</h3>
        <div style={{ paddingTop: "5vh", paddingBottom: "5vh" }}>
          <Container>
            <h3 style={{ paddingLeft: "25vh", paddingBottom: "1vh", marginTop: "18px", font: " bold 35px/25px Times New Roman", marginLeft: "1%", color: "brown" }}>WELCOME TO ICROSS</h3>
            <Form style={{ marginLeft: "40%", width: "55%" }} >
              <div className="patient-form-body">

                <Form.Group className="mb-3" as={Col} md={10} >

                  <div>
                    <Image src={this.state.avatar} style={{ width: "200px", marginLeft: "110px" }} />
                  </div>

                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }}>Full Name</Form.Label>
                  <Form.Control type="text" value={this.state.user.fullname} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "2px", font: " bold 20px/20px Times New Roman,serif" }}>Gender</Form.Label>

                  <Form.Control type="text" value={this.state.user.gender} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />

                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "2px", font: " bold 20px/20px Times New Roman,serif" }}>Email</Form.Label>
                  <Form.Control type="email" value={this.state.user.email} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "2px", font: " bold 20px/20px Times New Roman,serif" }}>Blood Group</Form.Label>

                  <Form.Control type="text" value={this.state.user.bloodGroup} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />

                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "2px", font: " bold 20px/20px Times New Roman,serif" }}>Address</Form.Label>

                  <Form.Control type="text" value={this.state.user.address} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />

                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "8px", font: " bold 20px/20px Times New Roman,serif" }}>Zip Code</Form.Label>
                  <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled" style={{ backgroundColor: "red" }}><strong>This is field is optional !</strong></Tooltip>}>
                    <Form.Control type="text" value={this.state.user.zipcode} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />
                  </OverlayTrigger>
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "8px", font: " bold 20px/20px Times New Roman,serif" }}>NIC Number</Form.Label>

                  <Form.Control type="text" value={this.state.user.nicNumber} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />

                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} >
                  <Form.Label style={{ marginTop: "2px", font: " bold 20px/20px Times New Roman,serif" }}>Phone Contact</Form.Label>

                  <Form.Control type="number" value={this.state.user.phone} style={{ maxHeight: "100%", marginTop: "8px" }} readOnly />

                </Form.Group>
                <Row>
                  <ButtonGroup aria-label="Basic example" >
                    <Button variant="primary" onClick={this.openModal} style={{ marginTop: "20px" }}>
                      Update Profile
                    </Button>

                    <Button variant="outline-danger" onClick={this.deletePatientHandler} style={{ marginTop: "20px", marginLeft: "2%", marginRight: "20%" }}>
                      Delete Profile
                    </Button>

                  </ButtonGroup>
                </Row>
              </div>
            </Form>
          </Container>
        </div>

        <Modal
          show={this.state.Modal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          closable={false}
        >
          <Modal.Body >

            <Form.Group as={Row} className="mb-3" style={{ marginLeft: "4%", width: "90%" }}>
              <Form.Label style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }} >
                Update Profile Image
                <p style={{ font: " bold 18px/18px Times New Roman" }}> ( Please do not exceed the amount of file size 3MB )</p>
              </Form.Label>
              <Col sm={6}>
                <Image src={this.state.avatar} style={{ width: "100px", marginRight: "60%", marginBottom: "20px" }} />
              </Col>
              <span>
                <input type="file" name="file" id="file_up"
                  accept="image/*" onChange={this.handleUpload} style={{ marginRight: "10%" }} />
              </span>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" style={{ marginLeft: "4%", width: "90%" }}>
              <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }} >
                Full Name
              </Form.Label>
              <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the NAME is required !</h5></strong></Tooltip>}>
                <Col sm={10}>
                  <Form.Control size="30" placeholder="Enter full name" value={this.state.fullname} name="fullname" onChange={this.handleChange} style={{ marginLeft: "5%", width: "90%", marginTop: "20px" }} />
                </Col>
              </OverlayTrigger>
            </Form.Group>

            <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the GENDER is required !</h5></strong></Tooltip>}>
              <Dropdown style={{ marginLeft: "5%", width: "90%" }} onSelect={this.selectGender}>
                <Form.Label style={{ marginTop: "10px", font: " bold 20px/20px Times New Roman,serif" }}> Gender</Form.Label>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ maxHeight: "100%", marginLeft: "12%", width: "70%" }} >
                  {this.state.gender}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ width: "70%" }}>
                  <Dropdown.Item eventKey=" Select One" > Select One</Dropdown.Item>
                  <Dropdown.Item eventKey="Male" >Male</Dropdown.Item>
                  <Dropdown.Item eventKey="Female" >Female</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </OverlayTrigger>

            <Form.Group as={Row} className="mb-3" style={{ marginLeft: "4%", width: "90%" }}>
              <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control type="email" placeholder="Enter your email" value={this.state.email} name="email"  onChange={this.handleChange} style={{ marginLeft: "5%", width: "90%", marginTop: "20px" }} readOnly />
              </Col>
            </Form.Group>

            <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the BLOOD GROUP is required !</h5></strong></Tooltip>}>
              <Dropdown style={{ marginLeft: "5%", width: "90%" }} onSelect={this.selectBloodGroup}>
                <Form.Label style={{ marginTop: "10px", font: " bold 20px/20px Times New Roman,serif" }}> Blood Group</Form.Label>
                <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ maxHeight: "100%", marginLeft: "5%", width: "70%" }} >
                  {this.state.bloodGroup}
                </Dropdown.Toggle>

                <Dropdown.Menu style={{ width: "70%" }}>
                  <Dropdown.Item eventKey=" Select One" > Select One</Dropdown.Item>
                  <Dropdown.Item eventKey="A+">A+</Dropdown.Item>
                  <Dropdown.Item eventKey="B+">B+</Dropdown.Item>
                  <Dropdown.Item eventKey="AB">AB</Dropdown.Item>
                  <Dropdown.Item eventKey="B-">B-</Dropdown.Item>
                  <Dropdown.Item eventKey="A-">A-</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
           </OverlayTrigger>

            <Form.Group as={Row} className="mb-3" style={{ marginLeft: "4%", width: "90%" }}>
              <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }}>
                Address
              </Form.Label>
              <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the ADDRESS is required ! </h5></strong></Tooltip>}>
                <Col sm={10}>
                  <Form.Control placeholder="Enter your address" value={this.state.address} name="address" onChange={this.handleChange} style={{ marginLeft: "5%", width: "90%", marginTop: "20px" }}  />
                </Col>
             </OverlayTrigger>
            </Form.Group>


            <Form.Group as={Row} className="mb-3" style={{ marginLeft: "4%", width: "90%" }}>
              <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }}>
                Zip Code
              </Form.Label>
              <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-disabled" style={{ backgroundColor: "purple" }}><strong>This field is optional !</strong></Tooltip>}>
                <Col sm={10}>
                  <Form.Control placeholder="Enter zip code" value={this.state.zipcode} name="zipcode" onChange={this.handleChange} style={{ marginLeft: "5%", width: "90%", marginTop: "20px" }} />
                </Col>
             </OverlayTrigger>
            </Form.Group>


            <Form.Group as={Row} className="mb-3" style={{ marginLeft: "4%", width: "90%" }}>
              <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }}>
                NIC Number
              </Form.Label>
              <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the NIC NUMBER is required ! </h5> </strong></Tooltip>}>
                <Col sm={10}>
                  <Form.Control placeholder="Enter your NIC number" value={this.state.nicNumber} name="nicNumber" onChange={this.handleChange} style={{ marginLeft: "5%", width: "90%", marginTop: "20px" }}  />
                </Col>
              </OverlayTrigger>
            </Form.Group>


            <Form.Group as={Row} className="mb-3" style={{ marginLeft: "4%", width: "90%" }}>
              <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }}>
                Phone Contact
              </Form.Label>
              <OverlayTrigger placement="right"  overlay={<Tooltip id="tooltip-disabled"><strong><h5>Enter the CONTACT NUMBER is required !</h5></strong></Tooltip>}>
                <Col sm={10}>

                  <Form.Control type="number" placeholder="Enter your contact number" size="10" value={this.state.phone} name="phone" onChange={this.validatePhone} style={{ marginLeft: "5%", width: "90%", marginTop: "20px" }} />
                  <span style={{
                    fontWeight: 'bold',
                    color: 'red',
                  }}>{this.state.phoneError}</span>

                </Col>
            </OverlayTrigger>
            </Form.Group>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline-success" onClick={this.submitDetails}>Update</Button>{' '}
            <Button variant="outline-danger" onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default PatientProfile;
