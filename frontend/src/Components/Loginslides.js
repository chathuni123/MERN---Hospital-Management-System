import React from "react";
import Carousel from 'react-bootstrap/Carousel'

const Loginslides = () => {
  return (
    <div style={{paddingBottom:"5vh"}} >
      <Carousel variant="dark" >
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://res.cloudinary.com/iplus/image/upload/v1629297812/SPM/b823e38cc01fdb9278b6f7faa2feda6d_v7svft.gif"
      alt="First slide"
    />
    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://res.cloudinary.com/iplus/image/upload/v1627577775/SPM/2_ze0tdv.png"
      alt="Second slide"
    />

    
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://res.cloudinary.com/iplus/image/upload/v1627576278/SPM/3_gty0gm.png"
      alt="Third slide"
    />

  </Carousel.Item>
</Carousel>


        </div>
  );
};

export default Loginslides;