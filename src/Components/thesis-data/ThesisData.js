import React from 'react'
import { Col, Form, Container } from 'react-bootstrap'
import './ThesisData.css'

const ThesisData = ({ academicThesisData }) => {

    const {
        registerationType,
        toeflDegree,
        arabicTitle,
        englishTitle,
        courses
    } = academicThesisData

    const [thesis, setThesis] = React.useState({ registerationType, toeflDegree, arabicTitle, englishTitle, courses })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setThesis({ ...thesis, [name]: value })
    }

    return (
        <>
            <Container className='form-three'>
                <h5 className='title'> بيانات الرسالة</h5>
                <Form>
                    <section className='section'>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group controlId='studyType'>
                                    <Form.Label>نوع الدراسة</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        name='registerationType'
                                        value={thesis.registerationType}
                                        onChange={handleChange}
                                        pattern='^[\u0621-\u064A\u0660-\u0669 ]+$'
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group controlId='TOEFL'>
                                    <Form.Label>درجة امتحان التويفل - TOEFL</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='number'
                                        name='toeflDegree'
                                        value={thesis.toeflDegree}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group controlId='arThesis'>
                                    <Form.Label>عنوان الرسالة باللغة العربية</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        name='arabicTitle'
                                        value={thesis.arabicTitle}
                                        onChange={handleChange}
                                        pattern='^[\u0621-\u064A\u0660-\u0669 ]+$'
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group controlId='enThesis'>
                                    <Form.Label>عنوان الرسالة باللغة الإنجليزية</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        name='englishTitle'
                                        value={thesis.englishTitle}
                                        onChange={handleChange}
                                        pattern='/^[A-Za-z][A-Za-z0-9]*$/'
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={5}>
                                <Form.Group controlId='courses'>
                                    <Form.Label>المقررات الملتحقة بالدراسة</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        name='courses'
                                        value={thesis.courses}
                                        onChange={handleChange}
                                    />
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
