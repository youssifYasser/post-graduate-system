import React, { useState } from 'react'
import { Container, Form, Col, Button } from 'react-bootstrap'
import './PersonalData.css'
import './StudentDataRegisteration.css'
import { MdDeleteForever } from 'react-icons/md'

const Supervisors = ({ className, handleChange }) => {
  return (
    <Container className={`form-four ${className}`}>
      <h5 className='title'>الســادة المشرفيــن</h5>
      <section className='section'>
        <Form.Row>
          <Col>
            <Form.Group>
              <Form.Label className='sups-refs-labels'>الرقم الكودي</Form.Label>

              <Form.Control
                className='form-input'
                type='number'
                // value={idRegistrationF}
                // name={`idRegistrationF-${index}`}
                onChange={handleChange}
                disabled
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className='sups-refs-labels'>اسم المشرف</Form.Label>

              <Form.Control
                className='form-input'
                type='text'
                // value={arabicName}
                // name={`arabicName-${index}`}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='specialization-t'>
              <Form.Label className='sups-refs-labels'>تخصص المشرف</Form.Label>

              <Form.Control
                className='form-input'
                type='text'
                // value={specialization}
                // name={`specialization-${index}`}
                onChange={handleChange}
              />
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
              />
              <Form.Control.Feedback type='invalid'>
                من فضلك ادخل التاريخ بالطريقة الصحيحة (مثال:25/02/2015)
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='currentState-t'>
              <Form.Label className='sups-refs-labels'>وضع الإشراف</Form.Label>

              <Form.Control
                className='form-input'
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
                <option value='مشرف من خارج البلاد'>مشرف من خارج البلاد</option>
                <option value='مشرف من قناة علمية'>مشرف من قناة علمية</option>
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
            <Button type='button'>مسح المشرف</Button>
          </Col>
        </Form.Row>
      </section>
    </Container>
  )
}

export default Supervisors
