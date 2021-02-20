import React from 'react'
import { Container, Image, Row, Col } from 'react-bootstrap'

import maintenance from './image/maintenance.png'

import './homePage-style.css'

function homePage() {
    return (
        <div className="home text-center">
            {/* <Container>
                <h1> Home Page Content</h1>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={bg1}
                            alt="First slide"
                            height="500" width="200"
                        />
                        <Carousel.Caption>
                            <h3>Faculty of Science- Ain Shams University</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src={bg2}
                            alt="Second slide"
                            height="500" width="200"
                        />

                        <Carousel.Caption>
                            <h3>Faculty of Science- Ain Shams University</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Container> */}

            {/* <img src={img} alt=""/> */}

            {/* <Container>
                <Row>
                    <Col xs="12" md="4" >
                        <h1>تحت الصيانة</h1>
                    </Col>
                    <Col xs="12" md="4" >

                    </Col>
                </Row>
            </Container> */}
            <Image
                className="d-block mx-auto img-fluid w-5"
                src={maintenance}
                alt="Coming soon"
                width="500"
                height="200"
            />
            <h1 className="mb-5" style={{color:"red"}}> الصفحة التى تحاول الوصول إليها تحت الصيانة حالياََ </h1>
            <h1 style={{color:"red"}}> The page you're looking for is under maintenance </h1>
        </div>

    )
}

export default homePage;
