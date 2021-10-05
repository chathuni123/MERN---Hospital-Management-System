import React, { useState, useEffect } from "react";

import { Card } from "react-bootstrap";

import axios from "axios";
const Notification = (props) => {
  const [chemist, setchemists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);

    const getTreatments = async () => {

      try {
        await axios
          .get(
            "http://localhost:6500/chemist/salary/notifications",
          )

          .then((res) => {
            console.log(res.data.chemsalary);
            setchemists(res.data.chemsalary);
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
    getTreatments();
  }, []);


  return (

    <div style={{ paddingBottom: "4vh" }}>
      <label style={{ color: "#073746", fontSize: "30px", fontWeight: "bold", marginLeft: "550px", marginTop: "20px" }}>
        Payment Notifications</label>

      <input
        className="form-control"
        type="text"
        value={search}
        placeholder="Search from date"
        name="searchQuery"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        style={{ marginLeft: "60rem", width: "40vh", marginBottom: "20px" }}
      />

      {chemist.filter(Notification => {
        if ((Notification.role === "labchemist") && (Notification.date.toLowerCase()
        .includes(search.toLowerCase())) ) {
          return Notification
        }

      }).map((Notification, index) => {
        return (
          <div key={index}>

            <div style={{ backgroundColor: "#8AA8B1", padding: "5vh", marginLeft: "15rem", alignContent: "center", height: "110px", width: "60rem" }}>

              <Card style={{ backgroundColor: "#A7BEC0" }}>

                <Card.Body>

                  <Card.Text style={{ backgroundColor: "#D4E8EB", fontSize:"21px" }}>
                   <label style={{marginLeft:"4rem"}}> {Notification.role} -  your salary Rs.{Notification.salary} for {Notification.date} has sent to your bank account.</label>
                  </Card.Text>
                </Card.Body>
              </Card>

            </div>

          </div>
        )
      }
      )}
    </div>
  );
};

export default Notification;
