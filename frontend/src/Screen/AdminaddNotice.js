import React, { Component } from 'react';
import axios from 'axios';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import '../Components/adminAddNotice.css';
import { Link } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import {Container,Row,Col} from "react-bootstrap";

const initialstate = {
    _id: '',
    topic: '',
    date: '',
    description: ''
}



class AdminaddNotice extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.state = initialstate;
        this.state = {
            notices: []
        }
    }

    componentDidMount() {

        axios.get('http://localhost:6500/notice/')
            .then(response => {

                this.setState({ notices: response.data.data });


            })
            .catch(function (error) {
                alert('error in get notices to admin');
                console.log(error);
            })

    }

    onDelete = (id) => {
        alert('Do you confirm the deletion?');
        axios.delete('http://localhost:6500/notice/delete/' + id)
            .then(response => {
                this.setState({ redirect: true });
                window.location.reload();
                alert('deleted successfully')
            })

            .catch(function (err) {
                console.log(err.message)
                alert('error..delete not success');
            })
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        let notice = {
            topic: this.state.topic,
            date: this.state.date,
            description: this.state.description

        }
        console.log('Data', notice);

        axios.post('http://localhost:6500/notice/create', notice)
            .then(response => {
                alert('Notice inserted Successfully')
                window.location.reload();
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }

    render() {
        return (
            
            <div >

<Row >
          <Col sm={3} >
          <Container  >
      
          <Sidebar/>
          </Container>
      
      </Col>
      <Col sm={9}>
          <Container>


                <div>
                    <br />
                    <label className="noticetopic">Notices Add</label>
                    <form onSubmit={this.onSubmit} className="container">
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput" className="form-label">Notice Topic</label>
                            <input type="text"
                                className="form-control"
                                id="noticeTopic"
                                name="topic"
                                placeholder=""
                                value={this.state.topic}
                                onChange={this.onChange}required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formGroupExampleInput2" className="form-label"required>Date</label>
                            <DatePickerComponent
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    placeholder=""
                                    value={this.state.date}
                                    onChange={this.onChange}
                                    style={{ backgroundColor: "white", color: "black", padding: "6px", fontSize: "15px" }}
                                    required
                                />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlTextarea1" className="form-label">Notice Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                rows="3"
                                name="description"
                                value={this.state.description}
                                onChange={this.onChange}required></textarea>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="adminbtn">Submit Notice</button>
                        </div>
                    </form>
                    <br />

                </div>

                <div className="graph">

                    <table className="table table-bordered" style={{ marginTop: 20, marginLeft: 20, marginRight: 50 }}>
                        <thead>
                            <tr className="table-dark">
                                <th>Topic</th>
                                <th>Date</th>
                                <th>Description</th>
                                <th >Action</th>
                            </tr>
                        </thead>
                        <tbody className="table-light">
                            {this.state.notices.length > 0 && this.state.notices.map((item, index) =>
                            (

                                <tr>
                                    <th scope="row">{item.topic}</th>
                                    <td><DatePickerComponent  value={item.date} style={{ fontSize: "19px" }} readOnly /></td>
                                    <td>{item.description}</td>

                                    <td>
                                        <Link to={"/admin/notices/edit/" + item._id}><button className="actionbtnE" > Edit</button></Link>

                                        <button onClick={() => this.onDelete(item._id)} className="actionbtnR">Remove</button>
                                    </td>
                                </tr>



                            ))}
                        </tbody>
                    </table>

                </div>


                </Container>
      
      </Col>
        </Row>
      




                
            </div>
        )
    }
}

export default AdminaddNotice;