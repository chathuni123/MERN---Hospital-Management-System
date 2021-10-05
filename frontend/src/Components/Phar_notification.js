import React, { useState, useEffect } from "react";

import { Card, Button} from "react-bootstrap";

import axios from "axios";
const Phar_notification = (props) => {
  const [pharmacists, setpharmacists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
 
  useEffect(() => {
    setLoading(true);

    const getTreatments = async () => {
     
      try {
        await axios
          .get(
            "http://localhost:6500/codebusters/api/pharmacistpvt/notification/getnotification",
          )
          
          .then((res) => {
            console.log(res)
            setpharmacists(res.data.allNotification); 
            console.log(pharmacists)                       
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
  
 
  const renderTable = () => {
    return pharmacists.map(pharmacist => {
      return (
        
        <Card >
            <Card.Body>
            <Card.Text>
             Date:{pharmacist.date}
             </Card.Text>
            <Card.Text>
            Salary :{pharmacist.salary}
            </Card.Text>
            </Card.Body>
        </Card>
        
      )
    })
  }


return(
    <div className="container">
        
         <div className="StockTable">
         <h4 align="middle">Notification</h4><br/>
         
         <Card >
         <Card.Body>{renderTable()}</Card.Body>
          </Card>
  
       
        {/* <table className="table"> 
    <thead className="thead-dark">
      <tr>
        <th>Not</th>

      </tr>
    </thead>
    <tbody>{renderTable()}</tbody>
  </table> */}

    </div> </div>
)
//     <div style={{paddingBottom:"4vh"}}>
      
//   <input 
//           className="form-control"
//           type="text"
//           value={search}
//           placeholder="Search from date"
//           name="searchQuery"
//           onChange ={(e) =>{
//             setSearch(e.target.value);
//           }}
//         style= {{ width:"40vh"}}
//         />
  
//     {pharmacists.filter(Notification => {
//                           if(search == ""){
//                               return Notification
//                           }
//                           else if(Notification.date.toLowerCase().
//                           includes(search.toLowerCase())){
//                             return Notification
//                         }
                       
//                       }).map((Notification,index)=>
//     {
//       return(
//       <div  key={index}>
        
// {Notification.userId === props.resid && (
  
//         <div style={{paddingTop:"1vh",paddingRight:"2vh"}}>

// <Card >

//           <Card.Body>
//     <Card.Title>{Notification.date}</Card.Title>
//     <Card.Text>
//     Salary :{Notification.salary}
//     </Card.Text>
//   </Card.Body>
// </Card>

// </div>
// )}
//       </div>      
//     )}
//     )}
//   </div>
  // )
}

export default Phar_notification;
