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
                                <Form.Group cotrolId='studyType'>
                                    <Form.Label htmlFor='studyType'>نوع الدراسة</Form.Label>
                                    <Form.Control className='form-input' type='text' id='studyType' />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group cotrolId='TOEFL'>
                                    <Form.Label htmlFor='TOEFL'>درجة امتحان التويفل - TOEFL</Form.Label>
                                    <Form.Control className='form-input' type='number' id='TOEFL' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group cotrolId='arThesis'>
                                    <Form.Label htmlFor='arThesis'>عنوان الرسالة باللغة العربية</Form.Label>
                                    <Form.Control className='form-input' type='text' id='arThesis' />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group cotrolId='enThesis'>
                                    <Form.Label htmlFor='enThesis'>عنوان الرسالة باللغة الإنجليزية</Form.Label>
                                    <Form.Control className='form-input' type='text' id='enThesis' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={5}>
                                <Form.Group cotrolId='courses'>
                                    <Form.Label htmlFor='courses'>المقررات الملتحقة بالدراسة</Form.Label>
                                    <Form.Control className='form-input' type='text' id='courses' />
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
