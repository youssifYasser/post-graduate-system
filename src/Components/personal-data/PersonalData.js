import React from 'react'
import { Col, Form, Container, Row } from 'react-bootstrap'
import './PersonalData.css'

const PersonalData = () => {
    return (
        <>
            <Container className='form-one'>
                <h5 className='title'> البيانات الشخصية للطالب </h5>
                <Form>
                    <section className='section'>
                        {console.log(window.innerWidth)}
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group controlId='arName'>
                                    <Form.Label>الاسم باللغة العربية</Form.Label>
                                    <Form.Control className='form-input' type='text' />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group controlId='enName'>
                                    <Form.Label>الاسم باللغة الإنجليزية</Form.Label>
                                    <Form.Control className='form-input' type='text' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }}>
                                <Form.Group controlId='bDate'>
                                    <Form.Label>تاريخ الميلاد</Form.Label>
                                    <Form.Control className='form-input' type='text' />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs={6} md={5} lg={6}>
                                        <Form.Group controlId='gender'>
                                            <Form.Label>الجنس</Form.Label>
                                            <Col className='gender'>
                                                <Form.Check
                                                    inline
                                                    type='radio'
                                                    id='male'
                                                    label='ذكر'
                                                    name='gender'
                                                    className='form-check-male'
                                                />
                                                <Form.Check
                                                    inline
                                                    type='radio'
                                                    id='female'
                                                    label='أنثى'
                                                    name='gender'
                                                    className='form-check-female'
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6} md={7} lg={6}>
                                        <Form.Group controlId='nation'>
                                            <Form.Label>الجنسية</Form.Label>
                                            <Form.Control className='form-input' as='select' custom>
                                                <option>مصر</option>
                                                <option>السمبلاوين</option>
                                                <option>بوركينا فاسو</option>
                                                <option>الساحل العاج</option>
                                                <option>مصر جوا</option>
                                            </Form.Control>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} xs={6}>
                                <Form.Group controlId='natId'>
                                    <Form.Label>الرقم القومى</Form.Label>
                                    <Form.Control className='form-input' type='number' />
                                </Form.Group>
                            </Col>
                            <Col md={5} xs={6}>
                                <Form.Group controlId='birthSrc'>
                                    <Form.Label>مصدر شهادة الميلاد</Form.Label>
                                    <Form.Control className='form-input' type='text' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group controlId='code'>
                                    <Form.Label>الرقم الكودى</Form.Label>
                                    <Form.Control className='form-input' type='number' />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group controlId='email'>
                                    <Form.Label>البريد الإلكترونى</Form.Label>
                                    <Form.Control className='form-input' type='email' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </section>
                    <section className='section'>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group controlId='address'>
                                    <Form.Label>العنوان</Form.Label>
                                    <Form.Control className='form-input' type='text' />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group controlId='phoneNum'>
                                    <Form.Label>رقم الهاتف</Form.Label>
                                    <Form.Control className='form-input' type='number' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </section>
                    <section className='section'>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} xs={6}>
                                <Form.Group controlId='arJob'>
                                    <Form.Label>الوظيفة باللغة العربية</Form.Label>
                                    <Form.Control className='form-input' type='text' />
                                </Form.Group>
                            </Col>
                            <Col md={5} xs={6}>
                                <Form.Group controlId='enJob'>
                                    <Form.Label>الوظيفة باللغة الإنجليزية</Form.Label>
                                    <Form.Control className='form-input' type='text' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group controlId='jobAdd'>
                                    <Form.Label>عنوان الوظيفة</Form.Label>
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

export default PersonalData