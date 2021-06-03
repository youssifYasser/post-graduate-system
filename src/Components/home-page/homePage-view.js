import React from 'react'
import { Container, Image, Row, Col, Button } from 'react-bootstrap'

import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineLightBulb } from 'react-icons/hi'

import 'animate.css/animate.min.css'

import cover from './image/AinShamss.jpg'

import './homePage-style.css'
import Student from './student-section'
import Studies from './studies-section'
import Department from './department-section'
import Supervisor from './supervisor-section'
import Referee from './referee-section'

function HomePage(props) {
    const {
        convertToComa,
        stats
    } = props
    return (
        <div className="home">
            <div className="cover mb-5">
                <Image src={cover} width={'100%'} alt="Ain Shams" className="image" />
            </div>

            <Container className="about text-center ">
                <Row>
                    <Col>
                        <div className="bg-icon animate__animated animate__backInLeft">
                            <HiOutlineLightBulb className="icon" />
                        </div>
                    </Col>
                    <Col>
                        <div className="bg-icon animate__animated animate__backInRight">
                            <AiOutlineEye className="icon" />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2 className="title">مهمتنا</h2>
                    </Col>
                    <Col>
                        <h2 className="title">اى حاجه</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
                            Id doloremque amet accusamus assumenda atque repellendus quasi,<br />
                            corrupti repellat dolores a officiis?<br />
                            Iusto obcaecati itaque totam ea facere esse. <br />
                            Blanditiis, nulla.
                        </p>
                    </Col>
                    <Col>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.<br />
                            Id doloremque amet accusamus assumenda atque repellendus quasi,<br />
                            corrupti repellat dolores a officiis?<br />
                            Iusto obcaecati itaque totam ea facere esse. <br />
                            Blanditiis, nulla.
                        </p>
                    </Col>
                </Row>
            </Container>

            <div className="switch">
                <Row>
                    <Col xs={4} md='auto'  className="mb-2">
                        <Button variant="secondary" name="student" className={props.active.student} onClick={props.handleChange}>
                            الطلاب
                        </Button>
                    </Col>
                    <Col xs={4} md='auto'  className="mb-2">
                        <Button variant="secondary" name="studies" className={props.active.studies} onClick={props.handleChange}>
                            الدراسات
                        </Button>
                    </Col>
                    <Col xs={4} md='auto'  className="mb-2">
                        <Button variant="secondary" name="dep" className={props.active.dep} onClick={props.handleChange}>
                            الأقسام
                        </Button>
                    </Col>
                    <Col xs={4} md='auto'>
                        <Button variant="secondary" name="supervisor" className={props.active.supervisor} onClick={props.handleChange}>
                            المشرفين
                        </Button>
                    </Col>
                    <Col xs={4} md='auto'>
                        <Button variant="secondary" name="referee" className={props.active.referee} onClick={props.handleChange}>
                            المحكمين
                        </Button>
                    </Col>
                </Row>
            </div>

            {
                props.section === 1 ? <Student convertToComa={convertToComa} stats={stats}/>
                    : props.section === 2 ? <Studies convertToComa={convertToComa} stats={stats}/>
                        : props.section === 3 ? <Department convertToComa={convertToComa} stats={stats}/>
                            : props.section === 4 ? <Supervisor convertToComa={convertToComa} stats={stats}/>
                                : props.section === 5 ? <Referee convertToComa={convertToComa} stats={stats}/>
                                    : <Student convertToComa={convertToComa} stats={stats}/>

            }
        </div>

    )
}

export default HomePage;
