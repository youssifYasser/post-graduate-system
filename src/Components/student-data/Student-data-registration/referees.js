import React, { useState } from 'react'
import { Container, Form, Col, Button } from 'react-bootstrap'
import './PersonalData.css'
import './StudentDataRegisteration.css'

const StudentRefs = ({ className, handleChange, studentRefs, deleteItem }) => {
  const [btnText, setBtnText] = useState('')
  const handleUpload = (e) => {
    let btn = e.target.files[0].name
    let dot = btn.lastIndexOf('.')
    let btnn = btn.slice(0, dot)
    let btnnn = btnn.length <= 12 ? btnn : btnn.slice(0, 10) + '..'
    let ext = btn.slice(dot)
    setBtnText(btnnn + ext)
    // setBtnText(btn)
  }

  return (
    <Container className={`form-four ${className}`}>
      <h5 className='title'>الســادة المحكميــن</h5>
      {studentRefs.map((ref) => {
        return (
          <section className='section' key={ref.id}>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label className='sups-refs-labels'>
                    الرقم الكودي
                  </Form.Label>

                  <Form.Control
                    className='form-input'
                    type='number'
                    // value={idRefereed}
                    // name={`idRefereed-${index}`}
                    onChange={handleChange}
                    disabled
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label className='sups-refs-labels'>
                    اسم المحكم
                  </Form.Label>

                  <Form.Control
                    className='form-input'
                    type='text'
                    // value={arabicName}
                    // name={`arabicName-${index}`}
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك ادخل الاسم باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='specialization-t'>
                  <Form.Label className='sups-refs-labels'>
                    تخصص المحكم
                  </Form.Label>

                  <Form.Control
                    className='form-input'
                    type='text'
                    // value={specialization}
                    // name={`specialization-${index}`}
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك ادخل التخصص باللغة العربية فقط.
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
                    style={{ display: 'none' }}
                    onChange={handleUpload}
                  />
                  <label htmlFor='files' className='upload-label'>
                    {btnText ? btnText : 'ارفع الملف'}
                  </label>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='cancelationDate-t'>
                  <Form.Label className='sups-refs-labels'>
                    حالة التقرير
                  </Form.Label>

                  <Form.Control
                    className='form-input'
                    type='text'
                    // value={cancelationDate	}
                    // name={`cancelationDate	-${index}`}
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك ادخل حالة التقرير باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className='ref-rep-date-col'>
                <Form.Group controlId='currentState-t'>
                  <Form.Label className='sups-refs-labels'>
                    تاريخ التقرير
                  </Form.Label>

                  <Form.Control
                    className='form-input ref-rep-date'
                    type='text'
                    // value={registrationDate}
                    // name={`registrationDate-${index}`}
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
              <Col className='del-col'>
                <Form.Label
                  className='sups-refs-labels'
                  style={{ visibility: 'hidden' }}
                >
                  وضع الإشراف
                </Form.Label>
                <Button type='button' onClick={() => deleteItem(ref.id)}>
                  مسح المحكم
                </Button>
              </Col>
            </Form.Row>
          </section>
        )
      })}
    </Container>
  )
}

export default StudentRefs
