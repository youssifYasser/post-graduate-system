import React, { useState } from 'react'
import { Container, Form, Col, Button } from 'react-bootstrap'
import './PersonalData.css'
import './StudentDataRegisteration.css'

const StudentExcuses = ({
  handleChange,
  handleUpload,
  btnText1,
  btnText2,
  deleteItem,
  studentExcuses,
}) => {
  return (
    <Container className={`form-six animate__animated animate__fadeIn`}>
      <h5 className='title'>الأعذار</h5>
      {studentExcuses.length === 0 ? (
        <h6 className='title'>لا يوجد أعذار ...</h6>
      ) : (
        studentExcuses.map((exc, index) => {
          return (
            <section className='section' key={exc.idExcuse}>
              <Form.Row>
                <Col className='excuse-date-col'>
                  <Form.Group controlId='registrationDate-t'>
                    <Form.Label className='sups-refs-labels'>
                      تاريخ العذر
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='text'
                      value={exc.excuseDate}
                      name={`excuseDate-${index}-e`}
                      onChange={handleChange}
                      dir='ltr'
                      lang='en'
                      pattern='^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4}$'
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادخل التاريخ بالطريقة الصحيحة (مثال:25/02/2015)
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col className='excuse-date-col'>
                  <Form.Group controlId='registrationDate-t'>
                    <Form.Label className='sups-refs-labels'>
                      تاريخ انتهاء العذر
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='text'
                      value={exc.cancelDate}
                      name={`cancelDate-${index}-e`}
                      onChange={handleChange}
                      dir='ltr'
                      lang='en'
                      pattern='^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4}$'
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادخل التاريخ بالطريقة الصحيحة (مثال:25/02/2015)
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col className='file'>
                  <Form.Group controlId='fileInput'>
                    <Form.Label className='sups-refs-labels'>
                      ملف مرفق للعذر
                    </Form.Label>
                    <input
                      dir='ltr'
                      lang='en'
                      type='file'
                      id='files'
                      name={`submittedDocURL-${index}-e`}
                      value={exc.submittedDocURL}
                      style={{ display: 'none' }}
                      onChange={handleUpload}
                    />
                    <label htmlFor='files' className='upload-label'>
                      {btnText1}
                    </label>
                  </Form.Group>
                </Col>
                <Col className='file'>
                  <Form.Group controlId='fileInput'>
                    <Form.Label className='sups-refs-labels'>
                      ملف مرفق لفترة المد
                    </Form.Label>
                    <input
                      dir='ltr'
                      lang='en'
                      type='file'
                      id='files1'
                      name={`extendedPeriodDocURL-${index}-e`}
                      value={exc.extendedPeriodDocURL}
                      style={{ display: 'none' }}
                      onChange={handleUpload}
                    />
                    <label htmlFor='files1' className='upload-label'>
                      {btnText2}
                    </label>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className='sups-refs-labels'>
                      مضمون العذر
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='text'
                      value={exc.content}
                      name={`content-${index}-e`}
                      onChange={handleChange}
                      pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادخل مضمون العذر باللغة العربية فقط.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col className='excuse-months'>
                  <Form.Group>
                    <Form.Label className='sups-refs-labels'>
                      المدة بالشهور
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='text'
                      value={exc.numberMonthExtendedPeriod}
                      name={`numberMonthExtendedPeriod-${index}-e`}
                      onChange={handleChange}
                      pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادخل المدة بالشهور باللغة العربية فقط.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col className='del-col'>
                  <Form.Label
                    className='sups-refs-labels'
                    style={{ visibility: 'hidden' }}
                  >
                    وضع الإشراف
                  </Form.Label>
                  <Button
                    type='button'
                    className='exc-btn'
                    onClick={() => deleteItem(exc.idExcuse)}
                  >
                    مسح العذر
                  </Button>
                </Col>
              </Form.Row>
            </section>
          )
        })
      )}
    </Container>
  )
}

export default StudentExcuses
