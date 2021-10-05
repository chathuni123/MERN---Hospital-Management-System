import React, { useState, useEffect } from "react";
import { Card, Container } from "react-bootstrap";
import "./SearchDoctors.css";
import axios from "axios";
const Appointmenthistory = (props) => {
  const [doctors, setdoctors] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    const getTreatments = async () => {

      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/patientpvt/Doctor/get/",
          )

          .then((res) => {
            setdoctors(res.data.doc);
          })
          .catch((err) => {
            alert("Error occured!!! : " + err);

          })
          .finally(() => {

          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };
    getTreatments();
  }, []);


  return (
    <div style={{ paddingBottom: "4vh" }}>

      <div className="input-group rounded" style={{ marginTop: "30px", marginLeft: "30%", marginBottom: "30px" }}>
        <input type="search"
          style={{ maxWidth: "50%", marginTop: "0px" }}
          className="form-control rounded"
          placeholder="Search your doctor by Name"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={(e) => {
            setSearch(e.target.value);
          }} />
        <span className="input-group-text border-0" id="search-addon"  >
          <i class="fas fa-search"></i>
        </span>
      </div>

      {doctors.filter(Treatment => {
        if (search == "") {
          return Treatment
        }
        else if (Treatment.fullname.toLowerCase().
          includes(search.toLowerCase())) {
          return Treatment
        }

      }).map((Treatment, index) => {
        return (

          <div className="column" key={index}>

            {Treatment.role === "doctor" && (

              <Container >
                <div style={{ paddingTop: "5vh" }}>

                  <div className="doc-home">
                    <div className="container d-flex justify-content-center align-items-center h-100 ">
                      <div className="row bg-faded">

                        <Card style={{ width: '20rem' }}>
                          <Card.Img variant="top"
                            className="lkcustom-pp-img "
                            cloudName="iplus"
                            publicId={Treatment.profileImage} />
                          <div className="card text-center bg-blue">
                            <Card.Body>
                              <div className="card-body text-dark">

                                <Card.Title className="title" style={{ font: "bold 40px/25px" }}>{Treatment.fullname}</Card.Title>
                                <Card.Text  className="cards-text" style={{ font: " bold 20px/25px Times New Roman,serif" }}>
                                  Specialist :{Treatment.specialist}
                                </Card.Text>
                                <Card.Text className="cards-text" style={{ font: " bold 20px/25px Times New Roman,serif" }}>
                                  Experience:  {Treatment.experience}
                                </Card.Text>
                                <Card.Text  className="cards-text" style={{ font: " bold 20px/25px Times New Roman,serif" }}>
                                  Contact: {Treatment.phone}
                                </Card.Text>
                                <Card.Text className="cards-text" style={{ font: " bold 20px/25px Times New Roman,serif" }}>
                                  email:{Treatment.email}
                                </Card.Text>
                              </div>

                            </Card.Body>
                          </div>
                        </Card>

                      </div>
                    </div>
                  </div>
                </div>
              </Container>

            )}
          </div>

        )
      }
      )}
    </div>

  );

};

export default Appointmenthistory;
