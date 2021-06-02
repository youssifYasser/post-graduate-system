import React, { useEffect, useState } from 'react'
import { Container, Form, Col, Button } from 'react-bootstrap'
import './PersonalData.css'
import './StudentDataRegisteration.css'

const StudentReports = ({
  handleChange,
  handleUpload,
  btnText,
  deleteItem,
  studentReports,
  index,
}) => {
  useEffect(() => {
    btnText = ''
  }, [])
  return (
    <Container className={`form-six animate__animated animate__fadeIn`}>
      <h5 className='title'>بيــان / تقريــر</h5>
      {studentReports.length === 0 ? (
        <h6 className='title'>لا يوجد تقارير ...</h6>
      ) : (
        studentReports.map((rep) => {
          return (
            <section className='section' key={rep.id}>
              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label className='sups-refs-labels'>
                      مضمون التقرير
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='text'
                      value={rep.status}
                      name={`status-${index}-a`}
                      onChange={handleChange}
                      pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادخل مضمون التقرير باللغة العربية فقط.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='registrationDate-t'>
                    <Form.Label className='sups-refs-labels'>
                      تاريخ التقرير
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='text'
                      value={rep.startDate}
                      name={`startDate-${index}-a`}
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
                      ملف التقرير
                    </Form.Label>
                    <input
                      dir='ltr'
                      lang='en'
                      type='file'
                      id='files'
                      name={`fileURL-${index}-a`}
                      value={rep.fileURL}
                      style={{ display: 'none' }}
                      onChange={handleUpload}
                    />
                    <label htmlFor='files' className='upload-label'>
                      {btnText}
                    </label>
                  </Form.Group>
                </Col>
                <Col className='del-col report-del'>
                  <Form.Group>
                    <Form.Label
                      className='sups-refs-labels'
                      style={{ visibility: 'hidden' }}
                    >
                      وضع الإشراف
                    </Form.Label>
                    <Button
                      type='button'
                      className='rep-btn'
                      onClick={() => deleteItem(rep.id)}
                    >
                      مسح التقرير
                    </Button>
                  </Form.Group>
                </Col>
              </Form.Row>
            </section>
          )
        })
      )}
    </Container>
  )
}

export default StudentReports
