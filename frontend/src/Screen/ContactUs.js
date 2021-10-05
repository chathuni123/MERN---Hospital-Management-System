import React, { useState } from "react";
import axios from "axios";
import '../Components/contactus.css'
import { Form } from "react-bootstrap";
import image1 from '../imagess/image-a.jpg'
import image2 from '../imagess/image-b.jpg'
import image3 from '../imagess/image-d.jpg'
import{Link} from 'react-router-dom';
function ContactUs() {

    const [fullname, setfullname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [emailErr, setEmailErr] = useState({});

    const formValidation = () => {
        const emailErr = {};
        let isValid = true;


        if (!email.includes('@')) {
            emailErr.nonAt = "Cannot insert email without @ sign"
            isValid = false;
        }

        setEmailErr(emailErr);

        return isValid;
    }

    const addContactmsg = async () => {

        const isValid = formValidation();
        if (isValid) {
            let msgObject = {
                fullname,
                email,
                message,
            };
            await axios
                .post("http://localhost:6500/contactus/create", msgObject)

                .then(response => {
                    console.log("done");
                    alert("Contact message sent successfully");
                })
                .catch(error => {

                    alert("ERROR! " + error);
                });
        }

    };


    return (
        <div><td>
            <tr>
                <div className='hello'>How can we help? </div>
            </tr>

            <div className='textContainleft'>
                <tr>

                    <div>
                        <label className="secondrow" >Please contact us below</label>
                    </div>

                </tr>
            </div>

            <tr>
                <div className='formContain'>

                    <Form onSubmit={addContactmsg}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                value={fullname}
                                onChange={(e) => setfullname(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email address</Form.Label>

                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                            {Object.keys(emailErr).map((key) => {
                                return <div style={{ color: "red" }}>{emailErr[key]}</div>
                            })}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Enter your message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <button className='btnsub' variant="primary" type="submit">
                            Submit
                        </button>
                    </Form>
                </div>
            </tr>

        </td>
            <td>
                <div className='textContainright'>
                    <tr>
                        <label className="feedbacktopic">We would love to hear from you..</label><br />
                        

                       
                        <Link to="/feedback/add">  <button className='bynfd'>Give Your Feedback</button>   </Link>
                    </tr>
                </div>
                <div className='containimages'>
                    <tr>
                        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src={image1} class="d-block w-100" alt="Get your services" />
                                </div>
                                <div class="carousel-item">
                                    <img src={image2} class="d-block w-100" alt="Happy to help" />
                                </div>
                                <div class="carousel-item">
                                    <img src={image3} class="d-block w-100" alt="For healthy life" />
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </tr>
                </div>
            </td>
        </div>
    )
}

export default ContactUs
