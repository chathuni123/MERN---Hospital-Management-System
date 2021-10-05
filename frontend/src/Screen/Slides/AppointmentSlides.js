import React from "react";
import Carousel from 'react-bootstrap/Carousel'

const AppointmentSlides = () => {
  return (

    <div style={{ position: "absolute", width: "35%", maxHeight: "100%", marginTop: "180px", marginLeft: "1%" }}>
      <Carousel variant="dark" fade>
        <Carousel.Item >
          <ol class="carousel-indicators">
            <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
            <li data-target="#myCarousel" data-slide-to="1"></li>
            <li data-target="#myCarousel" data-slide-to="2"></li>
          </ol>
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/iplus/image/upload/v1629298181/SPM/image_processing20210413-17906-14nj7li_lo4aaj.gif"
            alt="First slide"
          />

        </Carousel.Item>
        <Carousel.Item >
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/iplus/image/upload/v1629297211/SPM/4b229396885b90ea126258e5d19370ec_e83kz4.gif"

            alt="Second slide"
          />


        </Carousel.Item>
        <Carousel.Item >
          <img
            className="d-block w-100"
            src="https://res.cloudinary.com/iplus/image/upload/v1629297498/SPM/plano_camilla_2_1_fkap7p.gif"
            alt="Third slide"
          />


        </Carousel.Item>
      </Carousel>
    </div>

  );
};

export default AppointmentSlides;