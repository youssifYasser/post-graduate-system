import React, { useState } from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import { TiUserAdd } from 'react-icons/ti'

import { countries } from './countries'
import './supervisor-data-registeration.css'

const SupervisorDataRegisteration = () => {
  const [validated, setValidated] = useState(false)

  return (
    <Container className='supervisor-reg'>
      <div className='main-form'>
        <Row>
          <Col className='header'>
            <h1>تسجيل بيانات المشرف</h1>
          </Col>
        </Row>
        <Form noValidate validated={validated}>
          <section className='section'>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>الاسم باللغة العربية</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='arabicName'
                    // value={student.arabicName}
                    // onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل الاسم باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>الاسم باللغة الإنجليزية</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='englishName'
                    // value={student.englishName}
                    // onChange={handleChange}
                    pattern='^[a-zA-Z ]+$'
                    dir='ltr'
                    lang='en'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل الاسم باللغة الإنجليزية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>الرقم القومى</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='number'
                    name='nationalityId'
                    // value={student.nationalityId}
                    // onChange={handleChange}
                    dir='ltr'
                    lang='en'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل الرقم القومى بالطريقة الصحيحية (أرقام فقط).
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Row>
                  <Col className='gender-col'>
                    <Form.Group>
                      <Form.Label>الجنس</Form.Label>
                      <div className='gender'>
                        <Form.Check
                          inline
                          type='radio'
                          label='ذكر'
                          value='ذكر'
                          name='gender'
                          className='form-check-male'
                          // checked={student.gender === 'ذكر'}
                          // onChange={handleChange}
                        />
                        <Form.Check
                          inline
                          type='radio'
                          value='أنثى'
                          label='أنثى'
                          name='gender'
                          className='form-check-female'
                          // checked={student.gender === 'أنثى'}
                          // onChange={handleChange}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col className='nation-col'>
                    <Form.Group>
                      <Form.Label>الجنسية</Form.Label>
                      <Form.Control
                        className='form-input'
                        as='select'
                        name='nationality'
                        // value={student.nationality}
                        // onChange={handleChange}
                        pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                        custom
                        required
                      >
                        <option value=''>اختر الجنسية</option>
                        {countries.map((country, index) => {
                          return (
                            <option key={index} value={country}>
                              {country}
                            </option>
                          )
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Form.Row>
          </section>
          <section className='section'>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>الدرجة العلمية</Form.Label>
                  <Form.Control
                    className='form-input'
                    as='select'
                    name='idDegreeF'
                    // value={student.nationality}
                    // onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    custom
                    required
                  >
                    <option value=''>اختر الدرجة العلمية</option>
                    <option value='مدرس جامعي'>مدرس جامعي</option>
                    <option value='استاذ مساعد'>استاذ مساعد</option>
                    <option value='استاذ'>استاذ</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>التخصص</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='specialization'
                    // value={student.arabicName}
                    // onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل التخصص باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>القسم</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='department'
                    // value={student.arabicName}
                    // onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل ألقسم باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>الكلية</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='faculty'
                    // value={student.arabicName}
                    // onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل الكلية باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>الجامعة</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='university'
                    // value={student.arabicName}
                    // onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل الجامعة باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
          </section>
          <section className='section'>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>البريد الإلكترونى</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='email'
                    name='email'
                    // value={student.email}
                    // onChange={handleChange}
                    pattern='^[a-zA-Z0-9$@$!%*?&#^-_. +]+$'
                    dir='ltr'
                    lang='en'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل البريد الإلكترونى بالطريقة الصحيحة
                    (example@mail.com).
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>رقم الهاتف</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='mobile'
                    // value={student.mobile}
                    // onChange={handleChange}
                    dir='ltr'
                    lang='en'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل رقم الهاتف بالطريقة الصحيحة(أرقام فقط).
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
          </section>
          <Form.Row>
            <Col className='btn-col'>
              <Button type='submit' className='submit-btn'>
                تسجيل
                <TiUserAdd className='btn-submit' />
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    </Container>
  )
}

export default SupervisorDataRegisteration
