import React, { useState } from 'react'
import { Col, Form, Container, Row } from 'react-bootstrap'
import './UniversityDegrees.css'

const UniversityDegrees = ({ universityDegrees, setUniDegrees, className }) => {
  const [Degrees, setDegrees] = useState(universityDegrees)

  const handleChange = (e) => {
    const temp = e.target.name
    const name = temp.slice(1)
    const value = e.target.value
    let index = temp.slice(0, 1)
    Degrees[index] = { ...Degrees[index], [name]: value }
    setDegrees([...Degrees])
  }

  React.useEffect(() => {
    setUniDegrees(Degrees)
  }, [Degrees])

  const degrees = []
  for (const [index, degree] of Degrees.entries()) {
    const {
      scientificDegree,
      specialization,
      date,
      college,
      university,
    } = degree
    if (scientificDegree !== '') {
      degrees.push(
        <div key={index} className='degree'>
          <Form.Row>
            <Col>
              <Form.Group controlId='scientificDegree'>
                <Form.Label>الدرجة العلمية</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name={`${index}scientificDegree`}
                  value={scientificDegree}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك ادحل الدرجة العلمية باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='date'>
                <Form.Label>تاريخ الحصول عليها</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='text'
                  name={`${index}date`}
                  value={date}
                  onChange={handleChange}
                  pattern='^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك ادخل التاريخ بالطريقة الصحيحة (مثال:25/02/2015)
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='specialization'>
                <Form.Label>التخصص</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name={`${index}specialization`}
                  value={specialization}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك ادحل التخصص باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <Form.Group controlId='college'>
                <Form.Label>الكلية</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name={`${index}college`}
                  value={college}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك ادحل اسم الكلية باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='university'>
                <Form.Label>الجامعة</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name={`${index}university`}
                  value={university}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك ادحل اسم الجامعة باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
        </div>
      )
    }
  }
  return (
    <>
      <Container className={`form-two ${className}`}>
        <h5 className='title'>الدرجات الجامعية وتاريخ الحصول عليها</h5>
        {degrees}
      </Container>
    </>
  )
}

export default UniversityDegrees
