import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import { FaUserGraduate, FaEdit } from 'react-icons/fa'
import { MdAddCircle } from 'react-icons/md'
import { GiHandOk } from 'react-icons/gi'
import { RiFileExcel2Line } from 'react-icons/ri'

import students from './image/students.jpg'
import './homePage-style.css'

const Student = (props) => {
    const {
        convertToComa,
        stats
    } = props
    return (
        <div className="student">
            <div className="section mb-5">
                <Row>
                    <Col md={6}>
                        <div className="content">
                            <p className="title">الطلاب</p>
                            <div className="line"></div>
                            <div className="circle">
                                <p className="icon"><FaUserGraduate /></p>
                                <h2 className="count">{convertToComa(stats['students'])}</h2>
                                <h3>عدد الطلاب</h3>
                            </div>

                            <div className="links mt-5">
                                <Row className="row-1">
                                    <Col lg={12} xl={{ span: 5, offset: 2 }} className="sp2">
                                        <div className="link">
                                            <Link to="/addstudent">
                                                <Row>
                                                    <Col xs={7} md={9}>
                                                        <p className="textOflink text-center">إضافة طالب</p>
                                                    </Col>
                                                    <Col xs={5} md={3}>
                                                        <MdAddCircle className="icon2" />
                                                    </Col>
                                                </Row>
                                            </Link>
                                        </div>
                                    </Col>
                                    <Col lg={12} xl={5} className="sp2">
                                        <div className="link">
                                            <Link to="/">
                                                <Row>
                                                    <Col xs={7} md={9}>
                                                        <p className="textOflink text-center">عرض / بحث/ تعديل</p>
                                                    </Col>
                                                    <Col xs={5} md={3}>
                                                        <FaEdit className="icon2" />
                                                    </Col>
                                                </Row>
                                            </Link>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col lg={12} xl={{ span: 5, offset: 2 }}>
                                        <div className="link">
                                            <Link to="/">

                                                <Row>
                                                    <Col xs={7} md={9}>
                                                        <p className="textOflink text-center"> تسجيل بيانات يدويا</p>
                                                    </Col>
                                                    <Col xs={5} md={3}>
                                                        <GiHandOk className="icon2" />
                                                    </Col>
                                                </Row>
                                            </Link>
                                        </div>
                                    </Col>
                                    <Col lg={12} xl={5}>
                                        <div className="link">
                                            <Link to="/StudentDataExcelReg">

                                                <Row>
                                                    <Col xs={9} md={9}>
                                                        <p className="textOflink text-center">تسجيل بيانات بالإكسل</p>
                                                    </Col>
                                                    <Col xs={3} md={3}>
                                                        <RiFileExcel2Line className="icon2" />
                                                    </Col>
                                                </Row>
                                            </Link>
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

            <div className="stats mt-5 mb-5">
                <Row>
                    <Col className="mb-3 col" xs={12} md={6} xl={3}>
                        <div className="stat sp animate__animated animate__fadeInDown aanimate__delay-.5s">
                            <p className="title">دبلومة الدراسات العليا</p>
                            <p className="count">{convertToComa(stats['diploma registrations'])}</p>
                        </div>
                    </Col>
                    <Col className="mb-3 col" xs={12} md={6} xl={3}>
                        <div className="stat animate__animated animate__fadeInDown animate__fast">
                            <p className="title">تمهيدي الماجستير</p>
                            <p className="count">{convertToComa(stats['DSc_registrations'])}</p>
                        </div>
                    </Col>
                    <Col className="mb-3  col" xs={12} md={6} xl={3}>
                        <div className="stat sp animate__animated animate__fadeInDown animate__slow">
                            <p className="title">الماجستير في العلوم</p>
                            <p className="count">{convertToComa(stats['MSc_registrations'])}</p>
                        </div>
                    </Col>

                    <Col className="mb-3 col" xs={12} md={6} xl={3}>
                        <div className="stat  animate__animated animate__fadeInDown  animate__slower">
                            <p className="title">دكتوراه الفلسفة في العلوم</p>
                            <p className="count">{convertToComa(stats['PhD registrations'])}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}
export default Student