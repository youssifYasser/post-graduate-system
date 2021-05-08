import React, { useState } from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

import './studyType-style.css'
import Course from './course'

function StudyType(props) {
  const {
    validated,
    handleChange,
    handleChange2,
    handleSubmit,
    handleDelete,
    addCourse,
    study,
  } = props

  return (
    <Container className='studyType mt-5 mb-5'>
      <div className='header'>
        <p className='text-center'>إضافة دراسة جديدة</p>
      </div>

      <div className='main'>
        <Form
          className='text-right m-5 mb-5 form'
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <div className='subject'>
            <Row>
              <Col md={{ span: 5, offset: 1 }}>
                <Form.Group className='mb-5'>
                  <Form.Label>اسم الدراسة بالعربية</Form.Label>
                  <Form.Control
                    name='arabicName'
                    placeholder='ادخل اسم الدبلومة او التمهيدي او الماجستير او الدكتوراه'
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل الاسم باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={{ span: 6 }}>
                <Form.Group className='mb-5'>
                  <Form.Label>اسم الدراسة بالإنجليزية</Form.Label>
                  <Form.Control
                    name='englishName'
                    placeholder='ادخل اسم الدبلومة او التمهيدي او الماجستير او الدكتوراه'
                    onChange={handleChange}
                    pattern='^[a-zA-Z ]+$'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل الاسم باللغة الإنجليزية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={{ span: 5, offset: 1 }}>
                <Form.Group className='mb-5'>
                  <Form.Label>الكود الجامعى للدراسة</Form.Label>
                  <Form.Control
                    name='academicCode'
                    placeholder='الكود الجامعى لهذه الدراسة ان وجد'
                    onChange={handleChange}
                    pattern='[A-Za-z0-9]+'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل الكود الجامعى للدراسة.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col xs={12} md={3}>
                <Form.Group
                  controlId='exampleForm.SelectCustom'
                  className='mb-5'
                >
                  <Form.Label>نوع الدراسة</Form.Label>
                  <Form.Control
                    as='select'
                    name='study_type'
                    onChange={handleChange}
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

              <Col xs={12} md={3}>
                <Form.Group
                  controlId='exampleForm.SelectCustom'
                  className='mb-5'
                >
                  <Form.Label>القسم</Form.Label>
                  <Form.Control
                    as='select'
                    name='department'
                    onChange={handleChange}
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
          </div>
          <Button
            variant='secondary'
            className='addCourse'
            onClick={() => addCourse()}
          >
            إضافة مقرر إن وجد
          </Button>
          <div className='courses'>
            {
              <>
                {study.courses.map((course) => {
                  return (
                    <Course
                      key={course.id}
                      count={course.id}
                      handleChange2={handleChange2}
                      handleDelete={handleDelete}
                    />
                  )
                })}
              </>
            }
          </div>
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
