import React, { useState } from 'react'
import { Col, Form, Container } from 'react-bootstrap'
import './ThesisData.css'

const ThesisData = ({ academicThesisData, setThesisData, className }) => {
  const [thesis, setThesis] = useState(academicThesisData)

  const handleChange = (e) => {
    const { name, value } = e.target
    setThesis({ ...thesis, [name]: value })
  }

  React.useEffect(() => {
    setThesisData(thesis)
  }, [thesis])

  return (
    <>
      <Container className={`form-three ${className}`}>
        <h5 className='title'> بيانات الرسالة</h5>
        <section className='section'>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='studyType'>
                <Form.Label>نوع الدراسة</Form.Label>
                <Form.Control
                  className='form-input'
                  as='select'
                  name='registerationType'
                  value={thesis.registerationType}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  custom
                >
                  <option>دبلومة</option>
                  <option>تمهيدى</option>
                  <option>ماجيستير</option>
                  <option>دكتوراه</option>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل نوع الدراسة بالطريقة الصحيحة.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='TOEFL'>
                <Form.Label>درجة امتحان التويفل - TOEFL</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='number'
                  name='toeflDegree'
                  value={thesis.toeflDegree}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الدرجة بالطريقة الصحيحة (ارقام فقط).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='arThesis'>
                <Form.Label>عنوان الرسالة باللغة العربية</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='arabicTitle'
                  value={thesis.arabicTitle}
                  onChange={handleChange}
                  pattern='^[\u0621-\u064A0-9 ]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل عنوان الرسالة باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='enThesis'>
                <Form.Label>عنوان الرسالة باللغة الإنجليزية</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='text'
                  name='englishTitle'
                  value={thesis.englishTitle}
                  onChange={handleChange}
                  pattern='^[a-zA-Z0-9$@$!%*?&#^-_. +]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل عنوان الرسالة باللغة الإنجليزية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md={5}>
              <Form.Group controlId='courses'>
                <Form.Label>المقررات الملتحقة بالدراسة</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='courses'
                  value={thesis.courses}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>
        </section>
      </Container>
    </>
  )
}

export default ThesisData
