import React from 'react'
import { Form, Row, Col } from 'react-bootstrap'

const Course = (props) => {
    return (
        <div className="course mb-3">
            <Row>
                <Col xs={12} md={6} lg={3}>
                    <Form.Group>
                        <Form.Control
                            name={'name' + props.count}
                            placeholder=' كود المقرر'
                            // onChange={state.handleChange}
                            pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            من فضلك اختر نوع الدراسة
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col xs={12} md={6} lg={3}>
                    <Form.Group >
                        <Form.Control
                            name={'name' + props.count}
                            placeholder='اسم المقرر بالعربية'
                            // onChange={state.handleChange}
                            pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
                            required
                        />
                        <Form.Control.Feedback type='invalid'>
                            من فضلك اختر نوع الدراسة
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col xs={12} md={6} lg={3}>
                    <Form.Group>
                        <Form.Control
                            name={'name' + props.count}
                            placeholder='اسم المقرر بالإنجليزية'
                            // onChange={state.handleChange}
                            pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
                            required
                        />
                    </Form.Group>
                </Col>

                <Col xs={12} md={6} lg={3}>
                    <Form.Group>
                        <Form.Control
                            name={'name' + props.count}
                            placeholder='الدرجة العظمى للمقرر'
                            // onChange={state.handleChange}
                            pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
                            required
                        />
                    </Form.Group>
                </Col>
            </Row>
        </div>
    )
}

export default Course

