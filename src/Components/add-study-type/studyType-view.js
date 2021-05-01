import React from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

import './studyType-style.css'

function StudyType(props) {
  const state = props
  return (
    <Container className='studyType mt-5 mb-5'>
      <div className='header'>
        <p className='text-center'>إضافة دراسة جديدة</p>
      </div>

      <div className='main'>
        <Form
          className='text-right m-5 mb-5 form'
          noValidate
          validated={state.validated}
          onSubmit={state.handleSubmit}
        >
          <Row>
            <Col md={{span: 5, offset: 1}} >
              <Form.Group className='mb-5'>
                <Form.Label>اسم الدراسة بالعربية</Form.Label>
                <Form.Control
                  name='arabicName'
                  placeholder='ادخل اسم الدبلومة او التمهيدي او الماجستير او الدكتوراه'
                  onChange={state.handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الاسم باللغة العربية فقط.
              </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={{span: 6}}>
              <Form.Group className='mb-5'>
                <Form.Label>اسم الدراسة بالإنجليزية</Form.Label>
                <Form.Control
                  name='englishName'
                  placeholder='ادخل اسم الدبلومة او التمهيدي او الماجستير او الدكتوراه'
                  onChange={state.handleChange}
                  pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الاسم باللغة الإنجليزية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={{span: 5, offset: 1}}>
              <Form.Group className='mb-5'>
                <Form.Label>الكود الجامعى للدراسة</Form.Label>
                <Form.Control
                  name='englishName'
                  placeholder='الكود الجامعى لهذه الدراسة ان وجد'
                  onChange={state.handleChange}
                  pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الاسم باللغة الإنجليزية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='exampleForm.SelectCustom' className='mb-5'>
                <Form.Label>نوع الدراسة</Form.Label>
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
            </Col>

            <Col>
              <Form.Group controlId='exampleForm.SelectCustom' className='mb-5'>
                <Form.Label>القسم</Form.Label>
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
                  من فضلك اختر القسم
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>


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

export default StudyType
