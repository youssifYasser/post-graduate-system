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

    const [student, setStudent] = React.useState({
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
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        const type = e.target.type
        const checked = e.target.checked
        type === 'checkbox' ? setStudent({ ...student, [name]: checked }) : setStudent({ ...student, [name]: value })
    }

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
                                        name='arabicName'
                                        value={student.arabicName}
                                        onChange={handleChange}
                                        pattern='^[\u0621-\u064A\u0660-\u0669 ]+$'
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group controlId='enName'>
                                    <Form.Label>الاسم باللغة الإنجليزية</Form.Label>
                                    <Form.Control
                                        className='form-input form-english'
                                        type='text'
                                        name='englishName'
                                        value={student.englishName}
                                        onChange={handleChange}
                                        pattern='/^[A-Za-z][A-Za-z0-9]*$/'
                                    />
                                </Form.Group>
                            </Col>
                        </Form.Row>
                        <Form.Row>
                            <Col md={{ span: 5, offset: 2 }} xs={4}>
                                <Form.Group controlId='bDate'>
                                    <Form.Label>تاريخ الميلاد</Form.Label>
                                    <Form.Control
                                        className='form-input form-english'
                                        type='text'
                                        name='birthDate'
                                        value={student.birthDate}
                                        onChange={handleChange}
                                    />
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
                                                    label='ذكر'
                                                    value='ذكر'
                                                    name='gender'
                                                    className='form-check-male'
                                                    checked={student.gender === "ذكر"}
                                                    onChange={handleChange}
                                                />
                                                <Form.Check
                                                    inline
                                                    type='radio'
                                                    value='أنثى'
                                                    label='أنثى'
                                                    name='gender'
                                                    className='form-check-female'
                                                    checked={student.gender === "أنثى"}
                                                    onChange={handleChange}
                                                />
                                            </Col>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6} md={7} lg={6}>
                                        <Form.Group controlId='nation'>
                                            <Form.Label>الجنسية</Form.Label>
                                            <Form.Control
                                                className='form-input'
                                                as='select'
                                                name='country'
                                                value={student.country}
                                                onChange={handleChange}
                                                pattern='^[\u0621-\u064A\u0660-\u0669 ]+$'
                                                custom
                                            >
                                                <option value='مصر'>
                                                    مصر
                                                </option>
                                                <option value='السمبلاوين'>
                                                    السمبلاوين
                                                </option>
                                                <option value='بوركينا فاسو'>
                                                    بوركينا فاسو
                                                </option>
                                                <option value='الساحل العاج'>
                                                    الساحل العاج
                                                </option>
                                                <option value='مصر جوا'>
                                                    مصر جوا
                                                </option>
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
                                    <Form.Control
                                        className='form-input form-english'
                                        type='number'
                                        name='nationalID'
                                        value={student.nationalID}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={5} xs={6}>
                                <Form.Group controlId='birthSrc'>
                                    <Form.Label>مصدر شهادة الميلاد</Form.Label>
                                    <Form.Control
                                        className='form-input'
                                        type='text'
                                        name='birthCertificateSource'
                                        value={student.birthCertificateSource}
                                        onChange={handleChange}
                                        pattern='^[\u0621-\u064A\u0660-\u0669 ]+$'
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
                                        name='id'
                                        value={student.id}
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group controlId='email'>
                                    <Form.Label>البريد الإلكترونى</Form.Label>
                                    <Form.Control
                                        className='form-input form-english'
                                        type='email'
                                        name='email'
                                        value={student.email}
                                        onChange={handleChange}
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
                                        name='address'
                                        value={student.address}
                                        onChange={handleChange}
                                        pattern='^[\u0621-\u064A\u0660-\u0669 ]+$'
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={5} sm={6}>
                                <Form.Group controlId='phoneNum'>
                                    <Form.Label>رقم الهاتف</Form.Label>
                                    <Form.Control
                                        className='form-input form-english'
                                        type='number'
                                        name='phoneNumber'
                                        value={student.phoneNumber}
                                        onChange={handleChange}
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
                                        name='arabicJobName'
                                        value={student.arabicJobName}
                                        onChange={handleChange}
                                        pattern='^[\u0621-\u064A\u0660-\u0669 ]+$'
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={5} xs={6}>
                                <Form.Group controlId='enJob'>
                                    <Form.Label>الوظيفة باللغة الإنجليزية</Form.Label>
                                    <Form.Control
                                        className='form-input form-english'
                                        type='text'
                                        name='englishJobName'
                                        value={student.englishJobName}
                                        onChange={handleChange}
                                        pattern='/^[A-Za-z][A-Za-z0-9]*$/'
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
                                        name='jobAddress'
                                        value={student.jobAddress}
                                        onChange={handleChange}
                                        pattern='^[\u0621-\u064A\u0660-\u0669 ]+$'
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