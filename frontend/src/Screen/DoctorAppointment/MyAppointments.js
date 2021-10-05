import { Component } from "react";
import { Button, Form, Dropdown, Col, Modal, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import "./MyAppointment.css"
import { DatePickerComponent, TimePickerComponent } from "@syncfusion/ej2-react-calendars";
import axios from "axios";
import decode from "jwt-decode";
import { saveAs } from 'file-saver';
import { Link } from "react-router-dom";

class MyAppointments extends Component {

    state = {
        id: '',
        userId: '',
        Modal: false,
        appointmentDate: '',
        appointmentTime: '',
        physician: '',
        gender: '',
        fullname: '',
        appointmentNote: '',
        selectedAppointment: '',
        appointments: [],
        doctors: [],
        tempdate: '',
        temptime: ''
    };

    componentDidMount = async () => {
        this.setState({ dateValue: new Date(new Date().getFullYear(), new Date().getMonth(), 14) })
        this.setState({ timeValue: new Date("01/01/2021 11:00 AM") })
        this.setState({ minTime: new Date("01/02/2021 11:00 AM") })
        this.setState({ maxTime: new Date("01/02/2021 10:00 PM") })

        if (localStorage.getItem("authToken")) {
            const hasToken = await localStorage.getItem("authToken");
            const id = decode(hasToken).id;
            this.setState({ userId: id });
            console.log(this.state.userId);
            console.log(localStorage.getItem("authToken"));
        }

        // get appointments
        axios.get(`http://localhost:6500/codebusters/api/patientpvt/appointment/getapointments/${this.state.userId}`).then(res => {
            if (res.data.success) {
                this.setState({
                    appointments: res.data.apointment
                });
                console.log(this.state.appointments);
            }
        })

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

    openModal = async (appoinment) => {
        this.setState({ id: appoinment._id })
        this.setState({ tempdate: appoinment.appointmentDate })
        this.setState({ temptime: appoinment.appointmentTime })
        this.setState({ physician: appoinment.physician })
        this.setState({ appointmentNote: appoinment.appointmentNote })
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
    appointmentDate = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    appointmentTime = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    physician = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    appointmentNote = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    selectPhysician = (e) => {
        console.log(e);
        this.setState({ physician: e })
    }

    Appointment = () => {

        if (this.state.appointmentDate == '' && this.state.appointmentTime == '') {
            const appointment = {
                appointmentDate: this.state.tempdate,
                appointmentTime: this.state.temptime,
                physician: this.state.physician,
                id: this.state.id,
                appointmentNote: this.state.appointmentNote
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            }

            // update appointments
            axios.put('http://localhost:6500/codebusters/api/patientpvt/appointment/updateapointments', appointment, config).then(res => {
                if (res.data.success) {
                    alert(res.data.message);
                    window.location.reload(false);
                }
            });
        }

        else if (this.state.appointmentDate != '' && this.state.appointmentTime == '') {
            const appointment = {
                appointmentDate: this.state.appointmentDate.toLocaleDateString(),
                appointmentTime: this.state.temptime,
                physician: this.state.physician,
                id: this.state.id,
                appointmentNote: this.state.appointmentNote
            }
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            }

            // update appointments
            axios.put('http://localhost:6500/codebusters/api/patientpvt/appointment/updateapointments', appointment, config).then(res => {
                if (res.data.success) {
                    alert(res.data.message);
                    window.location.reload(false);
                }
            });
        }

        else if (this.state.appointmentDate == '' && this.state.appointmentTime != '') {
            const appointment = {
                appointmentDate: this.state.tempdate,
                appointmentTime: this.state.appointmentTime.toLocaleTimeString(),
                physician: this.state.physician,
                id: this.state.id,
                appointmentNote: this.state.appointmentNote

            }
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            }

            // update appointments
            axios.put('http://localhost:6500/codebusters/api/patientpvt/appointment/updateapointments', appointment, config).then(res => {
                if (res.data.success) {
                    alert(res.data.message);
                    window.location.reload(false);
                }
            });
        }

        else {
            const appointment = {
                appointmentDate: this.state.appointmentDate.toLocaleDateString(),
                appointmentTime: this.state.appointmentTime.toLocaleTimeString(),
                physician: this.state.physician,
                id: this.state.id,
                appointmentNote: this.state.appointmentNote

            }
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            }

            // update appointments
            axios.put('http://localhost:6500/codebusters/api/patientpvt/appointment/updateapointments', appointment, config).then(res => {
                if (res.data.success) {
                    alert(res.data.message);
                    window.location.reload(false);
                }
            });
        }


    }


    // delete appointments
    onDelete = async (id) => {
        console.log(id);
        try {
            var option = window.confirm("Are you sure you want to delete this appointment ? ")
            if (option) {
                await axios.delete(`http://localhost:6500/codebusters/api/patientpvt/appointment/deleteapointments/${id}`)
                    .then((res) => {
                        alert("Appointment Successfully Deleted");
                        window.location.reload(true);
                    })
                    .catch((err) => {
                        alert("Error occurred" + err);
                    });
            }
        } catch (error) {
            alert("Error occurred" + error);
        }
    };

    // search appointment by doctor name
    filterData(appointments, searchKey) {
        const result = appointments.filter((Apointment) =>
            Apointment.physician.toLowerCase().includes(searchKey)
        )
        this.setState({ appointments: result })
    }

    handleSearchArea = (e) => {
        //console.log(e.currentTarget.value);
        const searchKey = e.currentTarget.value;
        axios.get(`http://localhost:6500/codebusters/api/patientpvt/appointment/getapointments/${this.state.userId}`).then(res => {
            if (res.data.success) {
                this.filterData(res.data.apointment, searchKey)
            }
        })
    }



    // pdf generate
    handlepdf = async (id) => {
        console.log(id);
        try {
            var option = window.confirm("Do you want a PDF version ? ")
            if (option) {
                await axios.post(`http://localhost:6500/patient/download_pdf/${id}`)
                    .then(() => axios.get('http://localhost:6500/patient/download', { responseType: 'blob' }))
                    .then((res) => {
                        const pdfBlob = new Blob([res.data], { type: 'application/pdf' })
                        saveAs(pdfBlob, 'Appointment.pdf')
                    })
                    .catch((err) => {
                        alert("Error occurred" + err);
                    });
            }
        } catch (error) {
            alert("Error occurred" + error);
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row" >
                    <div className="col-lg-9 mt-2 mb-2">
                        <Link to="/profile/patient/getServices">
                            <div className="col">
                                <Button className="btnr" variant="outline-secondary" style={{ marginLeft: "10%", width: "15%", marginTop: "20px" }}> Back</Button>
                            </div>
                        </Link>
                        <h3 className="myappointment-top-title" textAlign="center" style={{ marginLeft: "30%", marginTop: "35px" }}>My Appointments</h3>
                    </div>
                    <div className="input-group rounded" style={{ marginTop: "30px", marginLeft: "30%", marginBottom: "30px" }}>
                        <input type="search"
                            style={{ maxWidth: "50%" }}
                            className="form-control rounded"
                            placeholder="Search your appointment by Doctor Name"
                            aria-label="Search"
                            aria-describedby="search-addon"
                            onChange={this.handleSearchArea} />
                        <span className="input-group-text border-0" id="search-addon"  >
                            <i class="fas fa-search"></i>
                        </span>
                    </div>

                </div>
                <div className="home">

                    <div style={{ paddingTop: "5vh", paddingBottom: "5vh", marginTop: "20px" }}></div>
                    <div className="myappointment-form-body">
                        <Table striped bordered hover >
                            <thead >
                                <tr >
                                    <th >#</th>
                                    <th>Appointment Date</th>
                                    <th>Appointment Time</th>
                                    <th>Physician</th>
                                    <th>Full Name</th>
                                    <th>Gender</th>
                                    <th>Appointment Note</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.appointments.map((appointments, index) => (
                                    <tr>
                                        <th scope="row" style={{ width: "15%" }}>{index + 1}</th>
                                        <td >{appointments.appointmentDate}</td>
                                        <td>{appointments.appointmentTime}</td>
                                        <td>{appointments.physician}</td>
                                        <td>{appointments.fullname}</td>
                                        <td>{appointments.gender}</td>
                                        <td>{appointments.appointmentNote}</td>

                                        <th scope="col">
                                            <a className="btn btn-warning" href="#" style={{ marginTop: "5px" }} onClick={this.openModal.bind(this, appointments)}>
                                                <i className="far fa-edit" ></i>&nbsp; Edit
                                            </a>
                                            &nbsp;
                                            <a className="btn btn-danger" href="#" style={{ marginTop: "10px" }} onClick={this.onDelete.bind(this, appointments._id)} >
                                                <i className="far fa-trash-alt"></i>&nbsp; Delete
                                            </a>
                                            &nbsp;
                                            <a className="btn btn-primary" href="#" style={{ marginTop: "10px" }} onClick={this.handlepdf.bind(this, appointments._id)}>
                                                <i className="fa fa-download"></i>&nbsp; Generate PDF
                                            </a>
                                        </th>
                                    </tr>

                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                <Modal
                    show={this.state.Modal}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    closable={false}
                >
                    <Modal.Body >
                        <Form>

                            <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicDate">
                                <Form.Label style={{ marginTop: "20px", font: " bold 20px/25px Times New Roman,serif" }}>Old Apointment Date</Form.Label>
                                <div>
                                    <DatePickerComponent placeholder="Enter Date"
                                        value={this.state.tempdate} style={{ marginTop: "20px" }} >
                                    </DatePickerComponent>
                                </div>
                            </Form.Group>



                            <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicDate">
                                <Form.Label style={{ marginTop: "20px", font: " bold 20px/25px Times New Roman,serif" }}>New Appointment Date</Form.Label>
                                <div>
                                    <DatePickerComponent placeholder="Enter Date"
                                        //value={this.state.selectedAppointment.appointmentDate} name="appointmentDate" format="dd - MMM - yy" style={{ marginTop: "20px" }}
                                        value={this.state.appointmentDate} name="appointmentDate" format="dd - MMM - yy" style={{ marginTop: "20px" }}
                                        onChange={this.appointmentDate}>
                                    </DatePickerComponent>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicTime">
                                <Form.Label style={{ marginTop: "20px", font: " bold 20px/25px Times New Roman,serif" }}>Old Appointment Time</Form.Label>
                                <div>
                                    <TimePickerComponent placeholder="Select a Time" value={this.state.temptime}>
                                    </TimePickerComponent>
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" as={Col} md={10} controlId="formBasicTime">
                                <Form.Label style={{ marginTop: "20px", font: " bold 20px/25px Times New Roman,serif" }}>New Appointment Time</Form.Label>
                                <div>
                                    <TimePickerComponent placeholder="Select a Time"
                                        value={this.state.appointmentTime} min={this.state.minTime} max={this.state.maxTime}
                                        //value={this.state.appointmentTime} min={this.state.minTime} max={this.state.maxTime}
                                        name="appointmentTime"
                                        format="HH:mm" step={60}
                                        style={{ marginTop: "20px" }}
                                        onChange={this.appointmentTime}>
                                    </TimePickerComponent>
                                </div>
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                <Form.Label name="physician" style={{ marginTop: "10px", font: " bold 20px/20px Times New Roman,serif" }}> Physician</Form.Label>
                                <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the PHYSICIAN NAME is required !</h5></strong></Tooltip>}>
                                <select class="form-select" name="physician" value={this.state.physician} onChange={this.handleChange} >
                                    {this.state.doctors.map((e) => {
                                        return <option key={e._id} value={e.fullname}>{e.fullname}</option>;
                                    })}
                                </select>
                                </OverlayTrigger>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" height="30%">
                                <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Appointment Note</Form.Label>
                                <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled"><strong><h5>Enter the NOTE is required !</h5></strong></Tooltip>}>
                                <Form.Control as="textarea" name="appointmentNote" rows={3} style={{ marginTop: "10px" }} onChange={this.appointmentNote} value={this.state.appointmentNote} />
                                </OverlayTrigger>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-success" onClick={this.Appointment}>Update</Button>{' '}
                        <Button variant="outline-danger" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default MyAppointments;