import React, { Component } from 'react'
import axios from 'axios';
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";


const initialstate = {
    _id: '',
    topic: '',
    date: '',
    description: ''
}

export default class EditAdminNotice extends Component {

    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialstate;
        this.state = {
            notices: []
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id);
        axios.get(`http://localhost:6500/notice/get/${this.props.match.params.id}`)
            .then((response) => {


                this.setState({ notices: response.data, topic: response.data.topic });
                console.log(response.data);
                console.log(response.data.notice.topic);

                this.setState({ topic: response.data.notice.topic })
                this.setState({ date: response.data.notice.date })
                this.setState({ description: response.data.notice.description })


            })
            .catch(function (error) {
                alert('error in get notices to edit');
                console.log(error);
            })

    }




    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();
        const id = this.props.match.params.id;

        let notice = {
            topic: this.state.topic,
            date: this.state.date,
            description: this.state.description

        }
        console.log('Data', notice);

        axios.put(`http://localhost:6500/notice/edit/${id}`, notice)
            .then(response => {
                alert('Notice updated Successfully')
                window.location=`/admin/notices`;
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })

    }


    render() {
        return (
            <div className="noticeContainer">
                <br />
                <h1>Notices Edit</h1>
                <form onSubmit={this.onSubmit} className="container">
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Notice Topic</label>
                        <input type="text"
                            className="form-control"
                            id="noticeTopic"
                            name="topic"
                            placeholder=""
                            value={this.state.topic}
                            onChange={this.onChange} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Date</label>
                        <DatePickerComponent
                                    className="form-control"
                                    id="date"
                                    name="date"
                                    placeholder=""
                                    value={this.state.date}
                                    onChange={this.onChange}
                                    style={{ backgroundColor: "white", color: "black", padding: "6px", fontSize: "15px" }}
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
                        <button type="submit" className="adminbtn">Edit Notice</button>
                    </div>
                </form>
                <br />

            </div>
        )
    }

}
