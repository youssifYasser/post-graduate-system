import React, { useState, useEffect } from 'react'
import { Container, Form, Col, Button } from 'react-bootstrap'
import axios from 'axios'
import './PersonalData.css'
import './StudentDataRegisteration.css'
import { FaUserTie } from 'react-icons/fa'

const StudentSups = ({ className, handleChange, studentSups, deleteItem }) => {
  const [allSups, setAllSups] = useState([])

  useEffect(() => {
    const supervisorsAPI = {
      url: 'http://localhost:8000/api/supervisors',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(supervisorsAPI)
      .then((response) => {
        setAllSups([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })

    setTimeout(() => {
      console.log(allSups)
    }, 500)
  }, [])
  return (
    <Container className={`form-four ${className}`}>
      <h5 className='title'>الســادة المشرفيــن</h5>
      {studentSups.map((sup) => {
        return (
          <>
            <section className='section' key={sup.id}>
              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label className='sups-refs-labels'>
                      الرقم الكودي
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='number'
                      // value={idSupervisor}
                      // name={`idRegistrationF-${index}`}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className='sups-refs-labels'>
                      اسم المشرف
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      // value={arabicName}
                      // name={`arabicName-${index}`}
                      onChange={handleChange}
                      as='select'
                      custom
                      dir='rtl'
                      lang='ar'
                    >
                      <option value=''>اختر المشرف</option>
                      {allSups.map((sups) => {
                        return (
                          <option key={sups.id} value={sups.arabicName}>
                            {sups.arabicName}
                          </option>
                        )
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='specialization-t'>
                    <Form.Label className='sups-refs-labels'>
                      تخصص المشرف
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
                <Col>
                  <Form.Group controlId='registrationDate-t'>
                    <Form.Label className='sups-refs-labels'>
                      تاريخ الإشراف
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
                <Col>
                  <Form.Group controlId='cancelationDate-t'>
                    <Form.Label className='sups-refs-labels'>
                      تاريخ انتهاء الإشراف
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='input'
                      // value={cancelationDate	}
                      // name={`cancelationDate	-${index}`}
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
                <Col>
                  <Form.Group controlId='currentState-t' className='sup'>
                    <Form.Label className='sups-refs-labels'>
                      وضع الإشراف
                    </Form.Label>

                    <Form.Control
                      className='form-input form-input-sup'
                      // name='currentState-t'
                      // value={thesisData.currentState}
                      onChange={handleChange}
                      as='select'
                      custom
                    >
                      <option value=''>اختر وضع الإشراف</option>
                      <option value='مشرف رئيسي'>مشرف رئيسي</option>
                      <option value='مشرف قائم'>مشرف قائم</option>
                      <option value='معتذر عن الإشراف'>معتذر عن الإشراف</option>
                      <option value='مشرف من خارج البلاد'>
                        مشرف من خارج البلاد
                      </option>
                      <option value='مشرف من قناة علمية'>
                        مشرف من قناة علمية
                      </option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col className='del-col'>
                  <Form.Label
                    className='sups-refs-labels'
                    style={{ visibility: 'hidden' }}
                  >
                    وضع الإشراف
                  </Form.Label>
                  <Button type='button' onClick={() => deleteItem(sup.id)}>
                    مسح المشرف
                  </Button>
                </Col>
              </Form.Row>
            </section>
            <Form.Row className='new-row'>
              <Col className='new-col'>
                <Button type='button' className='new-btn'>
                  تسجيل مشرف جديد
                  <FaUserTie />
                </Button>
              </Col>
            </Form.Row>
          </>
        )
      })}
    </Container>
  )
}

export default StudentSups
