import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import { FaEdit } from 'react-icons/fa'
import { MdAddCircle, MdSupervisorAccount } from 'react-icons/md'
import { GiHandOk } from 'react-icons/gi'
import { RiFileExcel2Line } from 'react-icons/ri'

import students from './image/students.jpg'
import './homePage-style.css'

const Supervisor = (props) => {
    const myStyle = {
        fontSize: '3.2rem',
        paddingTop: '4px'
    }
    const {
        convertToComa,
        stats
    } = props
    return (
        <div className="supervisor">
            <div className="section mb-5">
                <Row>
                    <Col md={6}>
                        <div className="content">
                            <p className="title">المشرفين</p>
                            <div className="line"></div>
                            <div className="circle">
                                <p className="icon" style={myStyle}><MdSupervisorAccount /></p>
                                <h2 className="count">{convertToComa(stats['supervisors'])}</h2>
                                <h3>عدد المشرفين</h3>
                            </div>

                            <div className="links mt-5">
                                <Row className="row-1">
                                    <Col lg={12} xl={{ span: 5, offset: 2 }} className="sp2">
                                        <div className="link">
                                            <Link to="/addSupervisor">
                                                <Row>
                                                    <Col xs={7} md={9}>
                                                        <p className="textOflink text-center">إضافة مشرف</p>
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
                                            <Link to="/viewSupervisors">
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
                                            <Link to="/SupervisorDataRegisteration">
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
                                            <Link to="/UploadSupervisorExcel">
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
        </div>
    )
}
export default Supervisor