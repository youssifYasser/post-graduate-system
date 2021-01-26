import React from 'react'
import { Col, Form, Container } from 'react-bootstrap'
import './PersonalData.css'

const PersonalData = () => {
    return (
        <>
            <Container className='form-one'>
                <h5 className='title'> البيانات الشخصية للطالب </h5>
                <Form>
                    <section className='section'>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group cotrolId='arName'>
                                    <Form.Label htmlFor='arName'>الاسم باللغة العربية</Form.Label>
                                    <Form.Control className='form-input' type='text' id='arName' />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group cotrolId='enName'>
                                    <Form.Label htmlFor='enName'>الاسم باللغة الإنجليزية</Form.Label>
                                    <Form.Control className='form-input' type='text' id='enName' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }}>
                                <Form.Group cotrolId='bDate'>
                                    <Form.Label htmlFor='bDate'>تاريخ الميلاد</Form.Label>
                                    <Form.Control className='form-input' type='date' id='bDate' />
                                </Form.Group>
                            </Col>
                            <Col md={3} xs={6}>
                                <Form.Group controlId='gender'>
                                    <Form.Label htmlFor='gender'>الجنس</Form.Label>
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
                                            id='male'
                                            label='أنثى'
                                            name='gender'
                                            className='form-check-female'
                                        />
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col md={2} xs={6}>
                                <Form.Group cotrolId='nation'>
                                    <Form.Label htmlFor='nation'>الجنسية</Form.Label>
                                    <Form.Control className='form-input' as='select' id='nation' custom>
                                        <option>مصر</option>
                                        <option>السمبلاوين</option>
                                        <option>بوركينا فاسو</option>
                                        <option>الساحل العاج</option>
                                        <option>مصر جوا</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} xs={6}>
                                <Form.Group cotrolId='natId'>
                                    <Form.Label htmlFor='natId'>الرقم القومى</Form.Label>
                                    <Form.Control className='form-input' type='number' id='natId' />
                                </Form.Group>
                            </Col>
                            <Col md={5} xs={6}>
                                <Form.Group cotrolId='birthSrc'>
                                    <Form.Label htmlFor='birthSrc'>مصدر شهادة الميلاد</Form.Label>
                                    <Form.Control className='form-input' type='text' id='birthSrc' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group cotrolId='code'>
                                    <Form.Label htmlFor='code'>الرقم الكودى</Form.Label>
                                    <Form.Control className='form-input' type='number' id='code' />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group cotrolId='email'>
                                    <Form.Label htmlFor='email'>البريد الإلكترونى</Form.Label>
                                    <Form.Control className='form-input' type='email' id='email' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </section>
                    <section className='section'>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group cotrolId='address'>
                                    <Form.Label htmlFor='address'>العنوان</Form.Label>
                                    <Form.Control className='form-input' type='text' id='address' />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group cotrolId='phoneNum'>
                                    <Form.Label htmlFor='phoneNum'>رقم الهاتف</Form.Label>
                                    <Form.Control className='form-input' type='number' id='phoneNum' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </section>
                    <section className='section'>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} xs={6}>
                                <Form.Group cotrolId='arJob'>
                                    <Form.Label htmlFor='arJob'>الوظيفة باللغة العربية</Form.Label>
                                    <Form.Control className='form-input' type='text' id='arJob' />
                                </Form.Group>
                            </Col>
                            <Col md={5} xs={6}>
                                <Form.Group cotrolId='enJob'>
                                    <Form.Label htmlFor='arJob'>الوظيفة باللغة الإنجليزية</Form.Label>
                                    <Form.Control className='form-input' type='text' id='arJob' />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group cotrolId='jobAdd'>
                                    <Form.Label htmlFor='jobAdd'>عنوان الوظيفة</Form.Label>
                                    <Form.Control className='form-input' type='text' id='jobAdd' />
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