import React, { useState } from 'react'
import { Container, Form, Col, Button } from 'react-bootstrap'
import './PersonalData.css'
import './StudentDataRegisteration.css'

const StudentExcuses = ({
  className,
  handleChange,
  studentExcuses,
  deleteItem,
}) => {
  const [btnText, setBtnText] = useState('')
  const [btnTextOne, setBtnTextOne] = useState('')
  const handleUpload = (e) => {
    let btn = e.target.files[0].name
    let dot = btn.lastIndexOf('.')
    let btnn = btn.slice(0, dot)
    let btnnn = btnn.length <= 16 ? btnn : btnn.slice(0, 14) + '..'
    let ext = btn.slice(dot)
    if (e.target.id === 'files') {
      setBtnText(btnnn + ext)
    } else if (e.target.id === 'files1') {
      setBtnTextOne(btnnn + ext)
    }
  }

  return (
    <Container className={`form-six ${className}`}>
      <h5 className='title'>الأعذار</h5>
      {studentExcuses.map((exc) => {
        return (
          <section className='section' key={exc.id}>
            <Form.Row>
              <Col className='excuse-date-col'>
                <Form.Group controlId='registrationDate-t'>
                  <Form.Label className='sups-refs-labels'>
                    تاريخ العذر
                  </Form.Label>

                  <Form.Control
                    className='form-input'
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
              <Col className='excuse-date-col'>
                <Form.Group controlId='registrationDate-t'>
                  <Form.Label className='sups-refs-labels'>
                    تاريخ انتهاء العذر
                  </Form.Label>

                  <Form.Control
                    className='form-input'
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
                    style={{ display: 'none' }}
                    onChange={handleUpload}
                  />
                  <label htmlFor='files' className='upload-label'>
                    {btnText ? btnText : 'ارفع الملف'}
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
                    style={{ display: 'none' }}
                    onChange={handleUpload}
                  />
                  <label htmlFor='files1' className='upload-label'>
                    {btnTextOne ? btnTextOne : 'ارفع الملف'}
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
                    // value={report}
                    // name={`report-${index}`}
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
                    // value={report}
                    // name={`report-${index}`}
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
                  onClick={() => deleteItem(exc.id)}
                >
                  مسح العذر
                </Button>
              </Col>
            </Form.Row>
          </section>
        )
      })}
    </Container>
  )
}

export default StudentExcuses
