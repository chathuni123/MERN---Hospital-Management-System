import { Component } from "react";
import { Button, Form, Dropdown, Col, Modal, Table, OverlayTrigger,Tooltip} from "react-bootstrap";
import axios from "axios";
import decode from "jwt-decode";
import "../DoctorAppointment/MyAppointment.css"
import loading from '../../assests/loading.gif'
import validator from 'validator'
import { Link } from "react-router-dom";

class MyMedicineOrders extends Component {
    
    state = {
        id: '',
        Modal: false,
        name: '',
        age: '',
        email: '',
        telNo: '',
        gender: 'Select One',
        address: '',
        allergies: '',
        currentlyTakingMedications: '',
        existingMedicalProblems: '',
        signature:'',
        selectedOrder: '',
        orders: [],
        photo: '',
        emailError: '',
        phoneError: ''
    };

    componentDidMount = async () => {

        if (localStorage.getItem("authToken")) {
            const hasToken = await localStorage.getItem("authToken");
            const id = decode(hasToken).id;
            this.setState({ userId: id });
            console.log(this.state.userId);
            console.log(localStorage.getItem("authToken"));
        }

        //get orders
        axios.get(`http://localhost:6500/patient/getmyorders/${this.state.userId}`).then(res => {
            
            if (res.data.success) {
                this.setState({
                    orders: res.data.orders
                });
                console.log(this.state.orders);
            }
        })
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


    openModal = async (order) => {
        
        this.setState({name:order.name})
        this.setState({id:order._id})
        this.setState({age:order.age})
        this.setState({email:order.email})
        this.setState({ telNo: order.telNo })
        this.setState({gender:order.gender})
        this.setState({address:order.address})
        this.setState({allergies:order.allergies})
        this.setState({currentlyTakingMedications:order.currentlyTakingMedications})
        this.setState({existingMedicalProblems:order.existingMedicalProblems})
        this.setState({signature:order.signature})
        this.setState({photo:order.photo})
        this.setState({ Modal: true })
    }
    closeModal = () => {
        this.setState({ Modal: false })
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        this.setState({ [name]: value });
        // console.log(e.target.value)
    }
    name = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    age = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    email = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    telNo = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    gender = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    address = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    allergies = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    currentlyTakingMedications = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    existingMedicalProblems = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    signature = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    selectGender = (e) => {
        const {name, value} = e.target
        this.setState({ [name]: value })
    }

    handleUpload = async e => {
        e.preventDefault()
        try{
          const file = e.target.files[0]
          if(!file) return alert("File not exists")
            
          if(file.size > 1024 * 1024 * 2) // 2mb
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

     // delete appointments
     onDelete = async (id) => {
        console.log(id);
        try {
            var option = window.confirm("Are you sure you want to delete this appointment ? ")
            if(option){
            await axios.delete(`http://localhost:6500/patient/deleteOrder/${id}`)
                .then((res) => {                   
                    alert("Your Order Successfully Deleted");                  
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

    Order = () => {
        if(this.state.name !== '' && this.state.age !== '' && this.state.email !== '' && this.state.gender !== 'Select One' && this.state.address !== '' && this.state.signature !== '' && this.state.photo !== '' && this.state.emailError == '' && this.state.phoneError == ''){
            const order = {
                id: this.state.id,
                name: this.state.name,
                age: this.state.age,
                email: this.state.email,
                telNo: this.state.telNo,
                gender: this.state.gender,
                address: this.state.address,
                allergies: this.state.allergies,
                currentlyTakingMedications: this.state.currentlyTakingMedications,
                existingMedicalProblems: this.state.existingMedicalProblems,
                userId: this.state.userId,
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
    
            console.log(order)
    
            // update medicine orders
            axios.put('http://localhost:6500/patient/updateOrder', order, config).then(res => {
                if (res.data.success) {
                    alert(res.data.message);
                    window.location.reload(false);
                }
            });
        
        }else {
            alert("Please check whether you entered information correctly")
        }
    }
    
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
                        <h3 className="myappointment-top-title" textAlign="center" style={{ marginLeft: "30%", marginTop: "35px" }}>My Medicine Orders</h3>
                    </div>
                
                </div>
                <div className="home">

                    <div style={{ paddingTop: "5vh", paddingBottom: "5vh", marginTop: "20px" }}></div>
                    <div className="myappointment-form-body">
                        <Table striped bordered hover >
                            <thead >
                                <tr >
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Contact Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.orders.map((order, index) => (
                                    <tr>
                                        <th scope="row" style={{ width: "15%" }}>{index + 1}</th>
                                        <td >{order.name}</td>
                                        <td >{order.age}</td>
                                        <td >{order.gender}</td>
                                        <td >{order.telNo}</td>
                                        <th scope="col">
                                            <a className="btn btn-warning" href="#" style={{ marginTop: "5px" }} onClick={this.openModal.bind(this,order)}>
                                                <i className="far fa-edit" ></i>&nbsp; Edit
                                            </a>
                                            &nbsp;
                                            <a className="btn btn-danger" href="#" style={{ marginTop: "10px" }} onClick={this.onDelete.bind(this,order._id)} >
                                                <i className="far fa-trash-alt"></i>&nbsp; Delete
                                            </a>
                                            &nbsp;
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
                            <Form.Group className="mb-3" controlId="exampleForm" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Name</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the NAME is required !</h5></strong></Tooltip>}>
                                    <Form.Control type="text" name="name" style={{ marginTop: "10px" }} value={this.state.name} onChange={this.name} />
                                    </OverlayTrigger>
                            </Form.Group>
                            
                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Age</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the AGE is required !</h5></strong></Tooltip>}>
                                    <Form.Control type="number" name="age" style={{ marginTop: "10px" }} value={this.state.age} onChange={this.age} />
                                    </OverlayTrigger>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Email</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the EMAIL is required !</h5></strong></Tooltip>}>
                                    <Form.Control type="text" name="email" style={{ marginTop: "10px" }} value={this.state.email} onChange={this.validateEmail} />
                                    </OverlayTrigger>
                                    <span style={{
                                      fontWeight: 'bold',
                                      color: 'red',
                                    }}>{this.state.emailError}</span>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Contact Number</Form.Label>
                                <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled"><strong><h5>Enter the VALID CONTACT NUMBER is required !</h5></strong></Tooltip>}>
                                <Form.Control type="number" name="telNo" style={{ marginTop: "10px" }} value={this.state.telNo} onChange={this.validatePhone} />
                                </OverlayTrigger>
                                <span style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                }}>{this.state.phoneError}</span>
                               
                            </Form.Group>

                            <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the GENDER is required !</h5></strong></Tooltip>}>
                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                <Form.Label name="gender" style={{ marginTop: "10px", font: " bold 20px/20px Times New Roman,serif"}}>Gender</Form.Label>
                                <select class="form-select" name="gender" value={this.state.gender} onChange={this.handleChange} >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </Form.Group>
                            </OverlayTrigger>
                                
                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Address</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the ADDRESS is required !</h5></strong></Tooltip>}>
                                    <Form.Control type="text" name="address" style={{ marginTop: "10px" }} value={this.state.address} onChange={this.address} />
                                    </OverlayTrigger>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Allergies</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>This field is optional !</h5></strong></Tooltip>}>
                                    <Form.Control type="textArea" name="allergies" style={{ marginTop: "10px" }} value={this.state.allergies} onChange={this.allergies} />
                                    </OverlayTrigger>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Currently Taking Medications</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>This field is optional !</h5></strong></Tooltip>}>
                                    <Form.Control type="textArea" name="currentlyTakingMedications" style={{ marginTop: "10px" }} value={this.state.currentlyTakingMedications} onChange={this.currentlyTakingMedications} />
                                    </OverlayTrigger>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Existing Medical Problems</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>This field is optional !</h5></strong></Tooltip>}>
                                    <Form.Control type="textArea" name="existingMedicalProblems" style={{ marginTop: "10px" }} value={this.state.existingMedicalProblems} onChange={this.existingMedicalProblems} />
                                    </OverlayTrigger>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                    <Form.Label style={{ marginTop: "30px", font: " bold 20px/25px Times New Roman,serif" }}>Signature</Form.Label>
                                    <OverlayTrigger placement="right" overlay={<Tooltip id="tooltip-disabled" ><strong><h5>Enter the SIGNATURE is required !</h5></strong></Tooltip>}>
                                    <Form.Control type="textArea" name="signature" style={{ marginTop: "10px" }} value={this.state.signature} onChange={this.signature} />
                                    </OverlayTrigger>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleFormage" height="30%">
                                <Form.Label column sm={2} style={{ marginTop: "20px", font: " bold 20px/20px Times New Roman,serif" }} >
                                    Medicine List
                                    <p style={{ font: " bold 18px/18px Times New Roman" }}> ( Please do not exceed the amount of file size 2MB )</p>
                                </Form.Label>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled"  ><strong>Upload MEDICINE LIST as an IMAGE is required !</strong></Tooltip>} placement="right">
                                <Col sm={3}>
                                 <img src={this.state.photo} style={{width: "200px"}}></img>
                                </Col>
                                </OverlayTrigger>
                                <span>
                                <input type="file" name="file" id="file_up"
                                accept="image/*" onChange={this.handleUpload} />
                                </span>
                            </Form.Group>
                            
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-success" onClick={this.Order}>Update</Button>{' '}
                        <Button variant="outline-danger" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default MyMedicineOrders;