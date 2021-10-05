import React, { Component } from 'react';
import axios from 'axios';
import '../Components/adminAddNotice.css';
import {Container,Row,Col} from "react-bootstrap";
import Sidebar from './Sidebar';

const initialstate = {
    fullname: '',
    email: '',
    message: ''
}



class adminContactMsgs extends Component {
    constructor(props) {
        super(props);
        this.state = initialstate;
        this.state = {
            contacts: []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:6500/contactus/')
            .then(response => {

                this.setState({ contacts: response.data.data });

            })
            .catch(function (error) {
                alert('error in get contact messages to admin');
                console.log(error);
            })

    }




    render() {
        return (
            <div>     <Row >
            <Col sm={3} >
            <Container  >
        
            <Sidebar/>
            </Container>
            </Col>
            <Col sm={9}>
                <Container>
            <div style={{ marginTop: '30px',paddingRight:"10px" }}>

                <label className="noticetopic">Contact Messages</label>
                <div style={{ width: '1000px', marginLeft: '80px', marginBottom: '40px' }}>
                    <table className="table table-bordered" style={{ marginTop: 20, marginLeft: 10, marginRight: 50 }}>
                        <thead>
                            <tr className="table-dark">
                                <th>Sender Name</th>
                                <th>Sender Email</th>
                                <th>Contact Message</th>
                            </tr>
                        </thead>
                        <tbody className="table-light">
                            {this.state.contacts.length > 0 && this.state.contacts.map((item, index) =>
                            (
                                <tr>
                                    <th scope="row">{item.fullname}</th>
                                    <td>{item.email}</td>
                                    <td>{item.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>

            </Container>
      </Col>
        
        </Row>


            </div>
        )
    }
}

export default adminContactMsgs;