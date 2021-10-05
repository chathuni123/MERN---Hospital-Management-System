import React, { useState, useEffect } from "react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Card, Button} from "react-bootstrap";
import axios from "axios";
const Appointmenthistory = (props) => {
  const [treatments, settreatment] = useState([]);
  const [fullname, setfullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

   const handledelete = (id) =>{ 
    deleteTreatments(id);
  };
  
  const handlepdf = (id,docname,patientname,suggesions,medicines,othernotes,noteduetoreport) =>{ 
    createPDF(id,docname,patientname,suggesions,medicines,othernotes,noteduetoreport);
  };
  
  useEffect(() => {
    setLoading(true);

    const GetDoctorName = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/doctorpvt/getProfile",
            config
          )
          
          .then((res) => {           
            setfullname(res.data.doctor.fullname);
          })
          .catch((err) => {
            alert("Error occured!!! : " + err);
          });
      } catch (error) {
        alert("Error occured!!! : " + error);
      }
    };

    const getTreatments = async () => {
     
      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/doctorpvt/treatment/gettreatments",
          )
          
          .then((res) => {
            settreatment(res.data.Treatment);                        

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
    GetDoctorName();
    getTreatments();
  }, []);
  
  const createPDF = (id,docname,patientname,suggesions,medicines,othernotes,noteduetoreport) =>{
  
    const unit = "pt";
    const size = "A4"; //page size
    const orientation = "landscape";
    const marginLeft = 40;
    const doc = new jsPDF( orientation , unit , size ); //create document
    const title = `| iCross  - Appointment Details |- Patient Name: ${patientname} `;
    const suggesion = ` Suggesions: ${suggesions} `;
    const medicine = `Medicines: ${medicines} `;
    const othernote = `Other Notes: ${othernotes} `;
    const noteduetoreports = `Note due to Report: ${noteduetoreport} `;
    const doctar=`Doctor :  ${docname}`;
    const image =  "https://res.cloudinary.com/iplus/image/upload/v1627568386/SPM/logo_nmawad.png"; 
    const back ="https://res.cloudinary.com/iplus/image/upload/v1631632248/SPM/setescope_vqtewp.png";
    const left = 30;
    const top = 8;
    const imgWidth = 100;
    const imgHeight = 100;   
    const lefts = 500;
    const tops = 300;
    const imgWidths = 300;
    const imgHeights = 300;
    doc.setFontSize( 20 );
    doc.text (150, 40,title);
    doc.text (150, 80,doctar);
    doc.text(60, 250, suggesion);  
    doc.text(60, 300, medicine);  
    doc.text(60, 350, othernote);  
    doc.text(60, 400, noteduetoreports); 
    doc.addImage(image, 'PNG', left, top, imgWidth, imgHeight);
    doc.addImage(back, 'PNG', lefts, tops, imgWidths, imgHeights);
       doc.save ("Appointment.pdf")
}


   const deleteTreatments = async (id) => {
     
    try {
      await axios
        .delete(
          "http://localhost:6500/codebusters/api/doctorpvt/treatment/removetreatmentdata/"+id
        )

        .then((res) => {
          alert(" data deleted Successfully!");
          window.location.reload();})
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
   
  return (
    <div style={{paddingBottom:"4vh"}}>
      
  <input 
          className="form-control"
          type="text"
          value={search}
          placeholder="Search from Medicine or Suggetions"
          name="searchQuery"
          onChange ={(e) =>{
            setSearch(e.target.value);
          }}
        style= {{ width:"40vh"}}
        />
  
    {treatments.filter(Treatment => {
                          if(search == ""){
                              return Treatment
                          }
                          else if(Treatment.suggesions.toLowerCase().
                          includes(search.toLowerCase())){
                            return Treatment
                        }
                        else if(Treatment.medicines.toLowerCase().
                          includes(search.toLowerCase())){
                            return Treatment
                        }
                      }).map((Treatment,index)=>
    {
      return(
      <div  key={index}>
        
{Treatment.docname === fullname && (
  
        <div style={{paddingTop:"1vh",paddingRight:"2vh"}}>

          
<Card 
border="secondary" style={{ width: '42rem' }} 
style={{paddingLeft:"2vh",paddingTop:"1vh"}}
>
<Card.Title as="h3" style={{paddingLeft:"2vh",paddingTop:"1vh",color:"darkblue"}} >Patient Name: {Treatment.patientname}</Card.Title>
<Card.Body>
  <Card.Text as="h4">Suggesions: {Treatment.suggesions}</Card.Text>
  <Card.Text as="h5" style={{paddingTop:"0.1vh"}}>Medicines: {Treatment.medicines}</Card.Text>
  
  <Card.Text as="p">
  Other Notes: {Treatment.othernotes}
  </Card.Text>
  <Card.Text as="p">
  Note Due to Report : {Treatment.noteduetoreport}
  </Card.Text>
  <Button variant="outline-danger"  style={{paddingTop:"1.5vh"}} onClick={()=>handledelete(Treatment._id)}>Delete</Button>{"   "}

  <Button variant="outline-dark" onClick = {()=>handlepdf(Treatment._id,Treatment.docname,Treatment.patientname,Treatment.suggesions,Treatment.medicines,Treatment.othernotes,Treatment.noteduetoreport)} >Generate Report</Button>
</Card.Body>
</Card>
</div>
)}
      </div>      
    )}
    )}
  </div>
  );
};

export default Appointmenthistory;
