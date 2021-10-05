import React, { useState, useEffect } from "react";
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import '../Components/HomeSection.css';
import Card from "../Components/Cards"
import axios from "axios";




function Home() {

    const [notices, setallNotices] = useState([]);

    useEffect(() => {
        function getNotice() {
            axios.get("http://localhost:6500/notice/")
                .then((res) => {
                    setallNotices(res.data.data);
                }).catch((error) => {
                    alert(error.message);
                })
        }
        getNotice();
    }, [])

    return (
        <div className='home-container'style={{paddingBottom: "9vh"}}>
            <video src="/videos/video-4.mp4" autoPlay loop muted />
            <div style={{ paddingTop: "5.2vh", paddingBottom: "3vh" }}>
                <label className='homefirst'>The best solution for your clinical journey</label>
                <label className="homeparag"><b>Handle your workflow and enable online doctor appointments, medical records and medicine...</b></label>
            </div>
            <div style={{ paddingBottom: "3vh" }}>
                <button className='Hbtn' 
                >
                    Add Doctor Appointment
                </button>

            </div>
            <div style={{ paddingTop: "1vh", paddingBottom: "6vh" }}>
                <label className="homethird"><b>Get all services effectively by SignUp to ICROSS</b></label>
                <br /><br />
                <label className="homesecond" style={{ fontFamily: 'Times New Roman' }}>..Notices for You..</label>
            </div>
            <div container className="noticeDisplay">

                {notices.length > 0 && notices.map((item, index) =>
                (
                    <div key={index} className="singleNotice">
                       <div className="row">
                            <div className="col">
                                <b><label>{item.topic}</label> </b>
                            </div>
                            <div className="col">
                                <label><DatePickerComponent  value={item.date} style={{ fontSize: "19px" }} readOnly /></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>{item.description}</label>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">

                <div className="col">
                    <div>
                        <Card
                            title='Doctor'
                            imageUrl='images/image-1.jpg'
                            body='You can get services from a doctor. Put an appointment and get your treatments.'
                        />
                    </div>
                </div>

                <div className="col">
                    <div>
                        <Card
                            title='Lab Chemist'
                            imageUrl='images/image-2.jpg'
                            body='Highly qualified lab chemist staff to provide your actual medical tests results. '
                        />
                    </div>
                </div>

                <div className="col">
                    <div>
                        <Card
                            title='Pharmacist'
                            imageUrl='images/image-3.jpg'
                            body='Medicines to your doorstep. Order medicines. We are happy to provide the service to you.'
                        />
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Home;