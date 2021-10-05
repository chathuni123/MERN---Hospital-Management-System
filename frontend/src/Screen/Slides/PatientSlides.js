import React from "react";
import Carousel from 'react-bootstrap/Carousel'


const PatientSlides = () => {
    return (
        <div style={{ position: "absolute", width: "80%" }}>
            <Carousel variant="dark" fade >
                <Carousel.Item interval={1000}>
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
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item interval={500}>
                    <img
                        className="d-block w-100"
                        src="https://res.cloudinary.com/iplus/image/upload/v1627577775/SPM/2_ze0tdv.png"
                        alt="Second slide"
                    />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://res.cloudinary.com/iplus/image/upload/v1627576278/SPM/3_gty0gm.png"
                        alt="Third slide"
                    />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>


        </div>
    );
};

export default PatientSlides;