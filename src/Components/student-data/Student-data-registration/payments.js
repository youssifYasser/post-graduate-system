import React, { useState } from 'react'
import { Container, Form, Col, Button } from 'react-bootstrap'
import './PersonalData.css'
import './StudentDataRegisteration.css'

const StudentPayments = ({
  handleChange,
  handleUpload,
  btnText,
  deleteItem,
  studentPayments,
  index,
}) => {
  return (
    <Container className={`form-six animate__animated animate__fadeIn`}>
      <h5 className='title'>تسجيل بيانات دفع المصروفات</h5>
      {studentPayments.length === 0 ? (
        <h6 className='title'>لا يوجد مصروفات ...</h6>
      ) : (
        studentPayments.map((pay) => {
          return (
            <section className='section' key={pay.id}>
              <Form.Row>
                <Col>
                  <Form.Group controlId='registrationDate-t'>
                    <Form.Label className='sups-refs-labels'>
                      تاريخ الإيصال
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='text'
                      value={pay.paymentDate}
                      name={`paymentDate-${index}-m`}
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
                  <Form.Group>
                    <Form.Label className='sups-refs-labels'>
                      رقم الإيصال
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='number'
                      value={pay.receiptNumber}
                      name={`receiptNumber-${index}-m`}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادخل رقم الإيصال.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className='sups-refs-labels'>
                      المبلغ المدفوع
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='text'
                      value={pay.amountPaid}
                      name={`amountPaid-${index}-m`}
                      onChange={handleChange}
                      pattern='[0-9]+(.[0-9]+)?'
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادخل المبلغ مستخدما أرقاما عشرية فقط
                      (مثال:1500.69).
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='registrationDate-t'>
                    <Form.Label className='sups-refs-labels'>
                      العام الدراسي
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='text'
                      value={pay.forYear}
                      name={`forYear-${index}-m`}
                      onChange={handleChange}
                      dir='ltr'
                      lang='en'
                      pattern='^[0-9]{4}/[0-9]{4}$'
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادخل العام بالطريقة الصحيحة (مثال:2014/2015)
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col className='file'>
                  <Form.Group controlId='fileInput'>
                    <Form.Label className='sups-refs-labels'>
                      صورة الإيصال
                    </Form.Label>
                    <input
                      dir='ltr'
                      lang='en'
                      type='file'
                      id='files'
                      name={`URLImage-${index}-m`}
                      value={pay.URLImage}
                      style={{ display: 'none' }}
                      onChange={handleUpload}
                    />
                    <label htmlFor='files' className='upload-label'>
                      {btnText}
                    </label>
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
                    className='rep-btn pay-btn'
                    onClick={() => deleteItem(pay.id)}
                  >
                    مسح الإيصال
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

export default StudentPayments
