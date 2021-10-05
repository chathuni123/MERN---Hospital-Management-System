import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import '../Components/Labreports.css';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Link } from 'react-router-dom';
import axios from "axios";

const Labreport = (props) => {
    const [labreports, setLabReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [search, setSearch] = useState("");


    const handlepdf = (testId, testName, patientName, date, patientEmail, description, chemistName, docName) => {
        createPDF(testId, testName, patientName, date, patientEmail, description, chemistName, docName);
    };

    const createPDF = (testId, testName, patientName, date, patientEmail, description, chemistName, docName) => {
        console.log(testId);
        console.log(patientName);
        console.log(date);

        const unit = "pt";
        const size = "A4"; //page size
        const orientation = "landscape";
        const doc = new jsPDF(orientation, unit, size); //create document


        const title = `| iCross  - Lab Report Details |-     Patient's Name: ${patientName} `;
        const testRName = ` Test Name: ${testName} `;
        const testRId = `Test ID: ${testId} `;
        const dateR = `Tested Date: ${date} `;
        const reResult = `Test Result: ${description} `;
        const pemail = `Patient's Email: ${patientEmail} `;
        const chemist = `Test done by Chemist :  ${chemistName}`;
        const doctr = `Doctor :  ${docName}`;
        const image = "https://res.cloudinary.com/iplus/image/upload/v1627568386/SPM/logo_nmawad.png";
        const back = "https://res.cloudinary.com/iplus/image/upload/v1631632248/SPM/setescope_vqtewp.png";
        const left = 30;
        const top = 8;
        const imgWidth = 100;
        const imgHeight = 100;

        const lefts = 500;
        const tops = 300;
        const imgWidths = 300;
        const imgHeights = 300;
        doc.setFontSize(15);
        doc.text(150, 40, title);
        doc.text(150, 80, chemist);
        doc.text(150, 100, doctr);
        doc.text(60, 160, testRId);
        doc.text(60, 190, testRName);
        doc.text(60, 220, dateR);
        doc.text(60, 270, reResult);
        doc.text(60, 300, pemail);
        doc.addImage(image, 'PNG', left, top, imgWidth, imgHeight);
        doc.addImage(back, 'PNG', lefts, tops, imgWidths, imgHeights);
        doc.save("Lab Report.pdf")
    }

    const deletereport = async (id) => {

        try {
            alert('Do you confirm the deletion?');
            axios.delete('http://localhost:6500/codebusters/api/labreport/delete/' + id)
                .then((res) => {
                    alert(" Report Deleted Successfully!");
                    window.location.reload();

                })
                .catch((err) => {
                    alert(err);
                });
        } catch (error) {
            alert("Error Occured-" + error);
        }
    };

    useEffect(() => {
        setLoading(true);
        const getReportData = async () => {

            try {
                await axios.get('http://localhost:6500/codebusters/api/labreport/')

                    .then((res) => {
                        console.log(res.data.data);
                        setLabReports(res.data.data);

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
        <div>
            <div style={{ paddingTop: "1vh" }}>
                <div className="row row-cols-1 row-cols-md-3 g-4">

                    <div className="col">
                        <Link to="/labchemist/labreports/reportAdd">
                            <Button className="labrbtn" variant="secondary">Add Lab Reports</Button>
                        </Link>
                    </div>
                    <Link to="/labchemist/labreports/requests">
                        <div className="col">
                            <Button className="labrbtnr" variant="secondary">Report Requests</Button>
                        </div>
                    </Link>


                </div>

            </div>
            
            <div className="topics">Previous Lab Reports</div>


            <div >
                <input className="searchtext"
                    onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                    name="searchQuery"
                    value={search}
                    type="search"
                    placeholder="  Enter patient name for search lab report" />
            </div>


            <div container className="testDisplay">


                {labreports.filter(Labreport => {
                    if (search === "") {
                        return Labreport
                    }
                    else if (Labreport.patientName.toLowerCase()
                        .includes(search.toLowerCase())) {
                        return Labreport
                    }

                }).map((Labreport, index) => {
                    return (
                        <div key={index}>


                            <div className="singleTest">
                                <div style={{ marginTop: 20, marginLeft: 20, marginRight: 50 }}>



                                    <div className="noticeContainer">
                                        <tr>
                                            <td>
                                                <div className="row">
                                                    <div className="col">
                                                        <b><label>Test Id : {Labreport.testId}</label> </b>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="rowcolumn">
                                                        <div className="col">
                                                            <label>Test : {Labreport.testName}</label>
                                                        </div></div>
                                                    <div className="col">
                                                        <label>Patient Name : {Labreport.patientName}</label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="rowcolumn">
                                                        <div className="col">
                                                            <DateTimePickerComponent value={Labreport.date} style={{ fontSize: "19px" }} readOnly />
                                                        </div>
                                                    </div>
                                                    <div className="rowcolumn">
                                                        <div className="col">
                                                            <label>Patient Email : {Labreport.patientEmail}</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row">
                                                    <div className="uppermargin">
                                                        <div className="col">
                                                            <label>Test Result : {Labreport.description}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="uppermargin">
                                                        <div className="col">
                                                            <label>Lab test done by chemist {Labreport.chemistName}.</label>
                                                        </div></div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <label>Patient will diagnose by doctor {Labreport.docName}.</label>
                                                    </div>
                                                </div>
                                                <div style={{ fontSize: 20, paddingTop: "3vh" }} className="row">
                                                    <div className="col">

                                                        <Link to={"/labchemist/labreports/edit/" + Labreport._id}><button className="actionbtnE" > Edit Report</button></Link>
                                                    </div>
                                                    <div className="col">
                                                        <button onClick={() => handlepdf(Labreport.testId, Labreport.testName, Labreport.patientName, Labreport.date, Labreport.patientEmail, Labreport.description, Labreport.chemistName, Labreport.docName)} className="actionbtnpdf">Report PDF</button>
                                                    </div>
                                                    <div className="col">
                                                        <button onClick={() => deletereport(Labreport._id)} className="actionbtnR">Remove</button>
                                                    </div>
                                                </div>


                                            </td>
                                        </tr>

                                    </div>
                                </div>
                            </div>


                        </div>
                    )
                }
                )}

            </div>
        </div>
    );
};

export default Labreport;



















