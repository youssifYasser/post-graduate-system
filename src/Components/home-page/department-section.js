import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'

import { FaEdit } from 'react-icons/fa'
import { MdAddCircle } from 'react-icons/md'
import { RiBuilding2Fill } from 'react-icons/ri'

import students from './image/students.jpg'
import './homePage-style.css'

const Department = (props) => {
    const {
        convertToComa,
        stats
    } = props
    return (
        <div className="department">
            <div className="section mb-5">
                <Row>
                    <Col md={6}>
                        <div className="content">
                            <p className="title">الأقسام</p>
                            <div className="line"></div>
                            <div className="circle">
                                <p className="icon"><RiBuilding2Fill /></p>
                                <h2 className="count">{convertToComa(stats['departments'])}</h2>
                                <h3>عدد الأقسام</h3>
                            </div>

                            <div className="links mt-5">
                                <Row className="row-1">
                                    <Col lg={12} xl={{ span: 5, offset: 2 }} className="sp2">
                                        <div className="link">
                                            <Link to="/addDepartment">
                                                <Row>
                                                    <Col xs={7} md={9}>
                                                        <p className="textOflink text-center">إضافة قسم</p>
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
                                            <Link to="/viewDepartments">
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
export default Department