import React, { useState, useEffect } from "react";
import { Row, Col, Container, Card, Spinner, Button } from "react-bootstrap";
import '../Components/allRequests.css';
import { Link } from 'react-router-dom';

import axios from "axios";
const DocReport = () => {
    const [reports, setreports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [search, setSearch] = useState("");


    useEffect(() => {
        setLoading(true);
        const getReportData = async () => {

            try {
                await axios
                    .get(
                        "http://localhost:6500/codebusters/api/doctorpvt/reportrequest/getreportrequest",

                    )

                    .then((res) => {
                        setreports(res.data.Repoertrequest);

                    })
                    .catch((err) => {
                        alert("Error occured!!! : " + err);
                        setError(err);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } catch (error) {
                alert("Error occured!!! : " + error);
            }
        };
        getReportData();
    }, []);
    return (
        <div >
            <div className="requests">
                <div style={{ paddingTop: "1vh" }}>
                    <div className="row row-cols-1 row-cols-md-3 g-4">

                        <div className="col">
                            <Link to="/labchemist/labreports">
                                <Button className="requestbtn" variant="secondary">Previous Lab Reports</Button>
                            </Link>
                        </div>
                        <Link to="/labchemist/labreports/reportAdd">
                            <div className="col">
                                <Button className="requestbtnr" variant="secondary">Add Report</Button>
                            </div>
                        </Link>


                    </div>

                </div>
                <Row>
                    <Col >
                        <Row>
                            <div className="textTopic" style={{ paddingBottom: "1vh" }}>Lab Report Requests from Doctors</div>
                            <div >
                                <input className="searchtextAll"
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                    name="searchQuery"
                                    value={search}
                                    type="search"
                                    placeholder="  Enter patient name for search report request" />
                            </div>
                            <Container className="full">

                                {reports.filter(item => {
                                    if (search === "") {
                                        return item
                                    }
                                    else if (item.patient.toLowerCase()
                                        .includes(search.toLowerCase())) {
                                        return item
                                    }

                                }).map((item, report) => {
                                    return <div key={report}>
                                        <div>

                                            <Card className="RcardOne" style={{ width: '50rem' }}  >

                                                <Card.Header>

                                                    <h5>Patient Name:  {item.patient}      </h5>

                                                </Card.Header>

                                                <Card.Body>
                                                    <Card.Title>Description: {item.patientsdescription}</Card.Title>
                                                </Card.Body>
                                                <Card.Body>
                                                    <Card.Title>Doctor Name: {item.docname}</Card.Title>
                                                </Card.Body>
                                                <Card.Body>
                                                    <Card.Title>Doctor Email: {item.docemail}</Card.Title>
                                                </Card.Body>
                                                <Card.Body>
                                                    <Card.Title>Doctor Note: {item.docnote}</Card.Title>
                                                </Card.Body>
                                                <Card.Body>
                                                    <Card.Title>Report: {item.reporttype1}</Card.Title>
                                                </Card.Body>

                                            </Card>

                                            <br />
                                        </div>
                                    </div>

                                })
                                }
                            </Container>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default DocReport;
