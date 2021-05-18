import React from 'react'
import './ref-reg-style.css'
import { countries } from '../../personal-data/countries'
import { Container, Row, Col, Form } from 'react-bootstrap'

const RefExcelReg = () => {
  return (
    <Container className='ref-form'>
      <Row>
        <div className='header'>
          <h1>تسجيل بيانات المحكــم</h1>
        </div>
      </Row>
      <Form>
        <section className='section'>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='arabicName'>
                <Form.Label>الاسم باللغة العربية</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='arabicName'
                  // value={arabicName}
                  // onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  required
                />

                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الاسم باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='englishName' dir='ltr' lang='en'>
                <Form.Label>الاسم باللغة الإنجليزية</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='englishName'
                  // value={englishName}
                  // onChange={handleChange}
                  pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الاسم باللغة الإنجليزية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} xs={6}>
              <Form.Group controlId='nationalityId' dir='ltr' lang='en'>
                <Form.Label>الرقم القومى</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='number'
                  name='nationalityId'
                  // value={nationalityId}
                  // onChange={handleChange}
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الرقم القومى بالطريقة الصحيحية (أرقام فقط).
                </Form.Control.Feedback>
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
                        // checked={gender === 'ذكر'}
                        // onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        type='radio'
                        value='أنثى'
                        label='أنثى'
                        name='gender'
                        className='form-check-female'
                        // checked={gender === 'أنثى'}
                        // onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col xs={6} md={7} lg={6}>
                  <Form.Group controlId='nationality'>
                    <Form.Label>الجنسية</Form.Label>
                    <Form.Control
                      className='form-input'
                      as='select'
                      name='nationality'
                      // value={nationality}
                      // onChange={handleChange}
                      pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                      custom
                      required
                    >
                      <option value=''>الجنسية</option>
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
          <Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='degree'>
                <Form.Label>الدرجة العلمية</Form.Label>
                <Form.Control
                  className='form-input'
                  as='select'
                  name='degree'
                  // value={degree}
                  // onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  custom
                >
                  <option value=''>الدرجة العلمية</option>
                  <option value='مدرس جامعي'>مدرس جامعي</option>
                  <option value='استاذ مساعد'>استاذ مساعد</option>
                  <option value='استاذ'>استاذ</option>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الدرجة العلمية باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='specialization'>
                <Form.Label>التخصص</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='specialization'
                  // value={specialization}
                  // onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  required
                />

                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل التخصص باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='position'>
                <Form.Label>المنصب</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='position'
                  // value={position}
                  // onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                />

                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل المنصب باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='university'>
                <Form.Label>الجامعة</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='university'
                  // value={university}
                  // onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  required
                />

                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الجامعة باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='faculty'>
                <Form.Label>الكلية</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='faculty'
                  // value={faculty}
                  // onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  required
                />

                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الكلية باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='department'>
                <Form.Label>القسم</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='department'
                  // value={department}
                  // onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                />

                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل القسم باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </section>
        <section className='section'>
          <Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='email' dir='ltr' lang='en'>
                <Form.Label>البريد الإلكترونى</Form.Label>
                <Form.Control
                  className='form-input'
                  type='email'
                  name='email'
                  // value={email}
                  // onChange={handleChange}
                  pattern='^[a-zA-Z0-9$@$!%*?&#^-_. +]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل البريد الإلكترونى بالطريقة الصحيحة
                  (example@mail.com).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='mobile' dir='ltr' lang='en'>
                <Form.Label>رقم الهاتف</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='mobile'
                  // value={mobile}
                  // onChange={handleChange}
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل رقم الهاتف بالطريقة الصحيحة(أرقام فقط).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </section>
      </Form>
    </Container>
  )
}

export default RefExcelReg
