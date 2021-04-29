import React from 'react'
import { Container, Form, Button } from 'react-bootstrap'

import './addDepartment-style.css'

function AddDepartment(props) {
  const state = props
  return (
    <Container className='addStudent mt-5 mb-5'>
      <div className='header'>
        <p className='text-center'>اضافة قسم</p>
      </div>

      <div className='main'>
        <Form
          className='text-right m-5 mb-5 form'
          noValidate
          validated={state.validated}
          onSubmit={state.handleSubmit}
        >
          <Form.Group className='mb-5'>
            <Form.Label>اسم القسم بالعربية</Form.Label>
            <Form.Control
              name='arabicName'
              placeholder='ادخل اسم القسم'
              onChange={state.handleChange}
              pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
              required
            />
            <Form.Control.Feedback type='invalid'>
              من فضلك أدخل الاسم باللغة العربية فقط.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className='mb-5'>
            <Form.Label>اسم القسم بالإنجليزية</Form.Label>
            <Form.Control
              className='text-left'
              name='englishName'
              placeholder='Insert department name'
              onChange={state.handleChange}
              pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
              required
            />
            <Form.Control.Feedback type='invalid'>
              من فضلك أدخل الاسم باللغة الإنجليزية فقط.
            </Form.Control.Feedback>
          </Form.Group>
          
          <div className='text-center pt-3'>
            <Button variant='dark' className='regBtn' type='submit'>
              تسجيل
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  )
}

export default AddDepartment
