import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'

import './addStudent-style.css'

function AddStudent(props) {
  const state = props
  return (
    <Container className='addStudent mt-5 mb-5'>
      <div className='header'>
        <p className='text-center'>إضافة طالب</p>
      </div>

      <div className='main'>
        <Form
          className='text-right m-5 mb-5 form'
          noValidate
          validated={state.validated}
          onSubmit={state.handleSubmit}
        >
          <Form.Group className='mb-5'>
            <Form.Label>الاسم بالعربية</Form.Label>
            <Form.Control
              name='arabicName'
              placeholder='الاسم بالعربية'
              onChange={state.handleChange}
              pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
              required
            />
            <Form.Control.Feedback type='invalid'>
              من فضلك أدخل الاسم باللغة العربية فقط.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-5'>
            <Form.Label>البريد الإلكتروني</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='example@email.com'
              onChange={state.handleChange}
              pattern='^[a-zA-Z0-9$@$!%*?&#^-_. +]+$'
              required
              dir='ltr'
              lang='en'
            />
            <Form.Control.Feedback type='invalid'>
              من فضلك أدخل البريد الإلكترونى بالطريقة الصحيحة
              (example@mail.com).
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId='exampleForm.SelectCustom' className='mb-5'>
            <Form.Label>اختر نوع الدراسة</Form.Label>
            <Form.Control
              as='select'
              name='study_type'
              onChange={state.handleChange}
              required
              custom
            >
              <option value=''>اختر</option>
              <option>دكتوراه الفلسفة في العلوم</option>
              <option>الماجستير في العلوم</option>
              <option>تمهيدي الماجستير</option>
              <option>دبلومة الدراسات العليا</option>
            </Form.Control>
            <Form.Control.Feedback type='invalid'>
              من فضلك اختر نوع الدراسة
            </Form.Control.Feedback>
          </Form.Group>

          <div className='text-center'>
            <Button variant='dark' className='regBtn' type='submit'>
              تسجيل
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default AddStudent
