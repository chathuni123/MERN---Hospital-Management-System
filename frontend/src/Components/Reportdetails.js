import React, {  } from "react";
import { ListGroup } from "react-bootstrap";
import "./doctorDetails.css";
import { Image } from "cloudinary-react";


const Reportdetails = (props) => {

  return (
    <div className="navigation-panel">
      <ListGroup variant="flush">
        <ListGroup.Item className="lkcustom-pp">
        <Image
            style={{ paddingBottom:"2vh",paddingTop:"2vh"}}
            className="lkcustom-pp-img "
            cloudName="iplus"
            publicId={props.cusPP}
          />
        </ListGroup.Item>
        <ListGroup.Item><center>{props.resfullname}</center></ListGroup.Item>       
      </ListGroup>     
    </div>
  );
};

export default Reportdetails;
