import { Component } from "react";
import { Button, Form, Dropdown, Container, Col, Row, ButtonGroup,OverlayTrigger,Tooltip} from "react-bootstrap";
import AppointmentSlides from "../Slides/AppointmentSlides";
import "./DoctorAppointment.css";
import { DatePickerComponent, TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import decode from "jwt-decode";

class DoctorAppointment extends Component {

  state = {
    appointmentDate: '',
    appointmentTime: '',
    physician: '',
    appointmentNote: '',
    dateValue: '',
    timeValue: '',
    minTime: '',
    maxTime: '',
    userId: '',
    gender: '',
    doctors: []
  }

  componentDidMount = async () => {
    this.setState({ dateValue: new Date(new Date().getFullYear(), new Date().getMonth(), 14) })
    this.setState({ timeValue: new Date("01/01/2021 11:00 AM") })
    this.setState({ minTime: new Date("01/02/2021 11:00 AM") })
    this.setState({ maxTime: new Date("01/02/2021 10:00 PM") })

    if (localStorage.getItem("authToken")) {
      const hasToken = localStorage.getItem("authToken");
      const id = decode(hasToken).id;
      await this.setState({ userId: id });
      console.log(this.state.userId);
      console.log(localStorage.getItem("authToken"));
    }

    // getting details of doctors
    axios.get('http://localhost:6500/patient/doctors').then(res => {
      if (res.data.success) {
        this.setState({ doctors: res.data.doctors })
        console.log(this.state.doctors)
      } else {
        alert(res.data.message);
      }
    })

  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(value)
  }

  handleChangeDoctor = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(value)
  }

  handleSelect = (e) => {
    this.setState({ physician: e });
    console.log(e);
  }

  handleSelectGender = (e) => {
    this.setState({ gender: e });
    console.log(e);
  }

  emptyFields = () => {
    this.setState({ appointmentDate: '' })
    this.setState({ appointmentTime: '' })
    this.setState({ physician: '' })
    this.setState({ appointmentNote: '' })
    this.setState({ gender: '' })
  }

  handleSubmit = (e) => {

    e.preventDefault();

    if (this.state.gender != "" && this.state.physician != "" && this.state.appointmentDate != "" && this.state.appointmentTime != "" && this.state.appointmentNote != "") {
      const appointment = {
        appointmentDate: this.state.appointmentDate.toLocaleDateString(),
        appointmentTime: this.state.appointmentTime.toLocaleTimeString(),
        physician: this.state.physician,
        appointmentNote: this.state.appointmentNote,
        gender: this.state.gender
      }

      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        }
      }
      console.log(this.state.userId)

      // add appointment
      axios.post(`http://localhost:6500/codebusters/api/patientpvt/appointment/addappointments/${this.state.userId}`, appointment, config).then(res => {
        if (res.data.success) {
          alert("Successfully Appointment Inserted");
          //window.location.reload(false);
          window.location = `/profile/patient/myAppointments`;
        } else {
          alert(res.data.message);
        }
      })
    } else {
      alert("You missing some information to add a doctor apointment!")
    }

  }


  render() {
    return (
      <div className="home">
        <AppointmentSlides />
        <h3 className="appointment-top-title" textAlign="center" style={{ marginLeft: "30%", marginTop: "35px" }}>Doctor Appointment</h3>
        <div style={{ paddingTop: "5vh", paddingBottom: "5vh" }}>
          <Container>
            <Form style={{ marginLeft: "45%" }}>
              <div className="appointment-form-body">
                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicDate">
                  <Form.Label style={{ marginTop: "20px", font: " bold 20px/25px Times New Roman,serif" }}>Appointment Date</Form.Label>
                  <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the APPOINTMENT DATE is required !</h5></strong></Tooltip>}>
                    <div>
                      <DatePickerComponent placeholder="Enter Date"
                        value={this.state.appointmentDate} name="appointmentDate" format="dd - MMM - yy" style={{ marginTop: "20px" }}
                        onChange={this.handleChange}>
                      </DatePickerComponent>
                    </div>
                    </OverlayTrigger>
                </Form.Group>

                <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicTime">
                  <Form.Label style={{ marginTop: "20px", font: " bold 20px/25px Times New Roman,serif" }}>Appointment Time</Form.Label>
                  <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the APPOINTMENT TIME is required !</h5></strong></Tooltip>}>
                    <div>
                      <TimePickerComponent placeholder="Select a Time"
                        value={this.state.appointmentTime} min={this.state.minTime} max={this.state.maxTime}
                        name="appointmentTime"
                        format="HH:mm" step={60}
                        style={{ marginTop: "20px" }}
                        onChange={this.handleChange}>
                      </TimePickerComponent>
                    </div>
                 </OverlayTrigger>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                  <Form.Label name="physician" style={{ marginTop: "10px", font: " bold 20px/20px Times New Roman,serif" }}>Gender</Form.Label>
                  <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5> Enter the GENDER is required !</h5></strong></Tooltip>}>
                    <select class="form-select" name="gender" value={this.state.gender} onChange={this.handleChange} >
                      <option value="">Select One</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                 </OverlayTrigger>
                </Form.Group>

                {/* <Dropdown as={Col} md={12} onSelect={this.handleSelect} >
                  <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}> Preferred Physician</Form.Label>
                  <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ width: "100%", marginTop: "10px" }}>
                    {this.state.physician}
                  </Dropdown.Toggle>


                  
                  <Dropdown.Menu style={{ width: "100%" }}>
                    <Dropdown.Item eventKey="Mr. Silva">Mr. Silva</Dropdown.Item>
                    <Dropdown.Item eventKey="Mr. Perera">Mr. Perera</Dropdown.Item>
                    <Dropdown.Item eventKey="Mrs. Amarasinghe">Mrs. Amarasinghe</Dropdown.Item>
                    <Dropdown.Item eventKey="Mrs. Gamage">Mrs. Gamage</Dropdown.Item>
                    <Dropdown.Item eventKey="Dr. Namal Gamage">Dr. Namal Gamage</Dropdown.Item>
                    <Dropdown.Item eventKey="Lakindu Kavishka">Mr Lakindu Kavishka</Dropdown.Item>
                    <select name="country" value={this.state.doctors}>
                        {this.state.doctors.map((e) => {
                            return <option key={e._id} value={e.fullname}>{e.fullname}</option>;
                        })}
                    </select>
                      
                    
                  </Dropdown.Menu>
                </Dropdown> */}

                <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                  <Form.Label name="physician" style={{ marginTop: "10px", font: " bold 20px/20px Times New Roman,serif" }}> Physician</Form.Label>
                  <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the PHYSICIAN NAME is required !</h5></strong></Tooltip>}>
                    <select class="form-select" name="physician" value={this.state.physician} onChange={this.handleChange} >
                      <option value="">Select One</option>
                      {this.state.doctors.map((e) => {
                        return <option key={e._id} value={e.fullname}>{e.fullname}</option>;
                      })}
                    </select>
                 </OverlayTrigger>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" height="30%">
                  <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Appointment Note</Form.Label>
                  <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled"><strong><h5>Enter the NOTE is required !</h5></strong></Tooltip>}>
                    <Form.Control as="textarea" name="appointmentNote" rows={3} style={{ marginTop: "10px" }} onChange={this.handleChange} required />
                 </OverlayTrigger>
                </Form.Group>

                <Row>
                  <Col>
                    <ButtonGroup aria-label="Basic example">
                      <Button variant="primary" style={{ marginTop: "20px" }} onClick={this.handleSubmit}>
                        Request Appointment
                      </Button>
                      <Col>
                        <Button variant="outline-warning" onClick={this.emptyFields} type="reset" style={{ marginTop: "20px", marginLeft: "80%", width: "200%" }}>
                          Reset
                        </Button>
                      </Col>
                    </ButtonGroup>
                  </Col>
                </Row>
              </div>
            </Form>
          </Container>
          <div style={{ paddingTop: "5vh", paddingBottom: "5vh" }} />
        </div>
      </div>
    )
  }
}

export default DoctorAppointment;