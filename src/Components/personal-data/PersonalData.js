import React from 'react'
import { Col, Form, Container, Row } from 'react-bootstrap'
import './PersonalData.css'

const PersonalData = ({ personalData }) => {
    const {
        id,
        arabicName,
        englishName,
        birthDate,
        gender,
        country,
        nationalID,
        birthCertificateSource,
        address,
        phoneNumber,
        email,
        arabicJobName,
        englishJobName,
        jobAddress
    } = personalData
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
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        value={arabicName}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group controlId='enName'>
                                    <Form.Label>الاسم باللغة الإنجليزية</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        value={englishName}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} xs={4}>
                                <Form.Group controlId='bDate'>
                                    <Form.Label>تاريخ الميلاد</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        value={birthDate}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={2} xs={4}>
                                <Form.Group controlId='gender'>
                                    <Form.Label>الجنس</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        value={gender}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={3} xs={4}>
                                <Form.Group controlId='nation'>
                                    <Form.Label>الجنسية</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        value={country}
                                    />
                                </Form.Group>
                            </Col>
                            {/* <Col md={5} sm={12}>
                                <Row>
                                    <Col>
                                        <Form.Group controlId='gender'>
                                            <Form.Label>الجنس</Form.Label>
                                            <Col className='gender'> */}
                            {/* <Form.Check
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
                                                /> */}
                            {/* <Form.Control
                                                    className='form-input'
                                                    type='text'
                                                    value={gender}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId='nation'>
                                            <Form.Label>الجنسية</Form.Label>
                                            <Form.Control
                                                className='form-input'
                                                type='text'
                                                value={country}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Col> */}
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} xs={6}>
                                <Form.Group controlId='natId'>
                                    <Form.Label>الرقم القومى</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='number'
                                        value={nationalID}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={5} xs={6}>
                                <Form.Group controlId='birthSrc'>
                                    <Form.Label>مصدر شهادة الميلاد</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        value={birthCertificateSource}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group controlId='code'>
                                    <Form.Label>الرقم الكودى</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='number'
                                        value={id}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group controlId='email'>
                                    <Form.Label>البريد الإلكترونى</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='email'
                                        value={email}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </section>
                    <section className='section'>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group controlId='address'>
                                    <Form.Label>العنوان</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        value={address}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group controlId='phoneNum'>
                                    <Form.Label>رقم الهاتف</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='number'
                                        value={phoneNumber}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                    </section>
                    <section className='section'>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} xs={6}>
                                <Form.Group controlId='arJob'>
                                    <Form.Label>الوظيفة باللغة العربية</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        value={arabicJobName}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={5} xs={6}>
                                <Form.Group controlId='enJob'>
                                    <Form.Label>الوظيفة باللغة الإنجليزية</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        value={englishJobName}
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} sm={6}>
                                <Form.Group controlId='jobAdd'>
                                    <Form.Label>عنوان الوظيفة</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        value={jobAddress}
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

export default PersonalData