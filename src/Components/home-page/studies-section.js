import React from 'react'
import { Row, Col} from 'react-bootstrap'

import { FaBookOpen, FaEdit } from 'react-icons/fa'
import { MdAddCircle } from 'react-icons/md'
import { GiHandOk } from 'react-icons/gi'
import { RiFileExcel2Line } from 'react-icons/ri'

import students from './image/students.jpg'
import './homePage-style.css'

const Studies = () => {
    return (
        <div className="studies">
            <div className="section mb-5">
                <Row>
                    <Col md={6}>
                        <div className="content">
                            <p className="title">الدراسات</p>
                            <div className="line"></div>
                            <div className="circle">
                                <p className="icon"><FaBookOpen /></p>
                                <h2 className="count">561</h2>
                                <h3>عدد الدراسات</h3>
                            </div>

                            <div className="links mt-5">
                                <Row className="row-1">
                                    <Col lg={12} xl={{ span: 5, offset: 2 }} className="sp2">
                                        <div className="link">
                                            <Row>
                                                <Col xs={7} md={9}>
                                                    <p className="textOflink text-center">إضافة دراسة</p>
                                                </Col>
                                                <Col xs={5} md={3}>
                                                    <MdAddCircle className="icon2" />
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                    <Col lg={12} xl={5} className="sp2">
                                        <div className="link">
                                            <Row>
                                                <Col xs={7} md={9}>
                                                    <p className="textOflink text-center">عرض / بحث/ تعديل</p>
                                                </Col>
                                                <Col xs={5} md={3}>
                                                    <FaEdit className="icon2" />
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
        </div>
    )
}
export default Studies