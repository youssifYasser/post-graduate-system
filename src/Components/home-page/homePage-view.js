import React from 'react'
import { Container, Image, Row, Col } from 'react-bootstrap'

import { FaUserGraduate, FaEdit } from 'react-icons/fa'
import { MdAddCircle } from 'react-icons/md'
import { GiHandOk } from 'react-icons/gi'
import { RiFileExcel2Line } from 'react-icons/ri'
import { AiOutlineEye } from 'react-icons/ai'
import { HiOutlineLightBulb } from 'react-icons/hi'

import 'animate.css/animate.min.css'

import cover from './image/AinShamss.jpg'
import students from './image/students.jpg'

import './homePage-style.css'

function homePage() {
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

            <div className=" section mb-5">
                <Row>
                    <Col md={6}>
                        <div className="content">
                            <p className="title">الطلاب</p>
                            <div className="line"></div>
                            <div className="circle">
                                <p className="icon"><FaUserGraduate /></p>
                                <h2 className="count">22,561</h2>
                                <h3>عدد الطلاب</h3>
                            </div>

                            <div className="links mt-5">
                                <Row className="row-1">
                                    <Col lg={12} xl={{ span: 5, offset: 2 }}>
                                        <div className="link">
                                            <Row>
                                                <Col>
                                                    <p className="textOflink text-center">إضافة طالب</p>
                                                </Col>
                                                <Col md={3}>
                                                    <MdAddCircle className="icon2" />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col lg={12} xl={5}>
                                        <div className="link">
                                            <Row>
                                                <Col>
                                                    <p className="textOflink text-center">عرض / بحث/ تعديل</p>
                                                </Col>
                                                <Col md={4}>
                                                    <FaEdit className="icon2" />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} xl={{ span: 5, offset: 2 }}>
                                        <div className="link">
                                            <Row>
                                                <Col>
                                                    <p className="textOflink text-center"> تسجيل بيانات يدويا</p>
                                                </Col>
                                                <Col md={3}>
                                                    <GiHandOk className="icon2" />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col lg={12} xl={5}>
                                        <div className="link">
                                            <Row>
                                                <Col>
                                                    <p className="textOflink text-center">تسجيل بيانات بالإكسل</p>
                                                </Col>
                                                <Col md={3}>
                                                    <RiFileExcel2Line className="icon2" />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <img src={students} alt="Students" width={'100%'} height={800} className="image" />
                    </Col>
                </Row>
            </div>
            <Container className="stats mb-5">
                <h1 className="mb-5">عدد الطلاب فى كل دراسة</h1>
                <Row>
                    <Col>
                        <div className="circle">
                            <h2 className="count">561</h2>
                            <h3>دبلومة الدراسات العليا</h3>
                        </div>
                    </Col>
                    <Col>
                        <div className="circle">
                            <h2 className="count">2,212</h2>
                            <h3>تمهيدي الماجستير</h3>
                        </div>
                    </Col>
                    <Col>
                        <div className="circle">
                            <h2 className="count">14,154</h2>
                            <h3>الماجستير في العلوم</h3>
                        </div>
                    </Col>
                    <Col>
                        <div className="circle">
                            <h2 className="count">1,981</h2>
                            <h3>دكتوراه الفلسفة في العلوم</h3>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}

export default homePage;
