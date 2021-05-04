import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'

const Course = (props) => {
    // console.log(props.data);
    const id = props.count
    const [show, setShow] = useState(true)
    return (
        <>{
            show && (
                <div className="course mb-3">
                    <Row>
                        <Col xs={12} md={6} lg={2}>
                            <Form.Group>
                                <Form.Control
                                    name={'courseCode' +id}
                                    placeholder=' كود المقرر'
                                    onChange={props.handleChange2}
                                    pattern='[A-Za-z0-9]+'
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>
                                من فضلك ادخل كود المقرر
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} lg={3}>
                            <Form.Group >
                                <Form.Control
                                    name={'ArNameOfCourse' + id}
                                    placeholder='اسم المقرر بالعربية'
                                    onChange={props.handleChange2}
                                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>
                                من فضلك ادخل اسم المقرر بالعربية
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} lg={3}>
                            <Form.Group>
                                <Form.Control
                                    name={'EnNameOfCourse' + id}
                                    placeholder='اسم المقرر بالإنجليزية'
                                    onChange={props.handleChange2}
                                    pattern='^[a-zA-Z ]+$'
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>
                                من فضلك ادخل اسم المقرر بالإنجليزية
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col xs={12} md={6} lg={3}>
                            <Form.Group>
                                <Form.Control
                                    name={'markOfCourse' + id}
                                    placeholder='الدرجة العظمى للمقرر'
                                    onChange={props.handleChange2}
                                    pattern='[0-9]+'
                                    required
                                />
                                <Form.Control.Feedback type='invalid'>
                                من فضلك ادخل الدرجة العظمى للمقرر
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col lg={1}>
                            <Button onClick={()=>{
                                // props.courses.splice(id,1)
                                //props.data.splice(id,1)
                                //props.studyData.courses[id]
                                const newCourses = props.studyData.courses.filter((course)=>{
                                    return course.id !== id
                                })
                                props.setStudyData({...props.studyData, courses: newCourses})
                                setShow(false)
                            }}>
                                <MdDeleteForever/>
                            </Button>
                        </Col>
                    </Row>
                </div>)
        }</>
    )
}

export default Course

