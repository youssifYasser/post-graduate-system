import React from 'react'
import { Col, Form, Container } from 'react-bootstrap'
import './ThesisData.css'

const ThesisData = () => {
    return (
        <>
            <Container className='form-two'>
                <h5 className='title'> بيانات الرسالة</h5>
                <Form>
                    <section className='section'>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group controlId='studyType'>
                                    <Form.Label>نوع الدراسة</Form.Label>
                                    <Form.Control className='form-input' type='text' />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group controlId='TOEFL'>
                                    <Form.Label>درجة امتحان التويفل - TOEFL</Form.Label>
                                    <Form.Control className='form-input' type='number' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group controlId='arThesis'>
                                    <Form.Label>عنوان الرسالة باللغة العربية</Form.Label>
                                    <Form.Control className='form-input' type='text' />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group controlId='enThesis'>
                                    <Form.Label>عنوان الرسالة باللغة الإنجليزية</Form.Label>
                                    <Form.Control className='form-input' type='text' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={5}>
                                <Form.Group controlId='courses'>
                                    <Form.Label>المقررات الملتحقة بالدراسة</Form.Label>
                                    <Form.Control className='form-input' type='text' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </section>
                </Form>
            </Container>
        </>
    )
}

export default ThesisData
