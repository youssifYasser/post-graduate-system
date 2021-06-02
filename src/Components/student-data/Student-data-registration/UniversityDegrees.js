import React, { useState } from 'react'
import { Col, Form, Container, Row, Button } from 'react-bootstrap'
import './UniversityDegrees.css'

const UniversityDegrees = ({
  uniDegrees,
  setUniDegrees,
  handleChange,
  deleteItem,
}) => {
  // const [Degrees, setDegrees] = useState(universityDegrees)

  // const handleChange = (e) => {
  //   // const temp = e.target.name
  //   // const name = temp.slice(1)
  //   // const value = e.target.value
  //   // let index = temp.slice(0, 1)
  //   let { name, value } = e.target
  //   let indexOfDash = name.lastIndexOf('-')
  //   let index = name.slice(indexOfDash + 1)
  //   name = name.slice(0, indexOfDash)
  //   uniDegrees[index] = { ...uniDegrees[index], [name]: value }
  //   setUniDegrees([...uniDegrees])
  // }

  // React.useEffect(() => {
  //   setUniDegrees(Degrees)
  // }, [Degrees])

  return (
    <Container className={`form-two animate__animated animate__fadeIn`}>
      <h5 className='title'>الدرجات الجامعية وتاريخ الحصول عليها</h5>

      {uniDegrees.length === 0 ? (
        <h6 className='title'>لا يوجد دراسات ...</h6>
      ) : (
        uniDegrees.map((degree, index) => {
          return (
            <div key={degree.id} className='degree'>
              <Form.Row>
                <Col>
                  <Form.Group controlId='degree'>
                    <Form.Label>الدرجة العلمية</Form.Label>
                    <Form.Control
                      className='form-input'
                      type='text'
                      name={`degree-${index}-u`}
                      value={degree.degree}
                      onChange={handleChange}
                      pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                      required
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادحل الدرجة العلمية باللغة العربية فقط.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='dateObtained'>
                    <Form.Label>تاريخ الحصول عليها</Form.Label>
                    <Form.Control
                      className='form-input'
                      type='text'
                      name={`dateObtained-${index}-u`}
                      value={degree.dateObtained}
                      onChange={handleChange}
                      pattern='^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4}$'
                      dir='ltr'
                      lang='en'
                      required
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
                      name={`specialization-${index}-u`}
                      value={degree.specialization}
                      onChange={handleChange}
                      pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                      required
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادحل التخصص باللغة العربية فقط.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group controlId='faculty'>
                    <Form.Label>الكلية</Form.Label>
                    <Form.Control
                      className='form-input'
                      type='text'
                      name={`faculty-${index}-u`}
                      value={degree.faculty}
                      onChange={handleChange}
                      pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                      required
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
                      name={`university-${index}-u`}
                      value={degree.university}
                      onChange={handleChange}
                      pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                      required
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادحل اسم الجامعة باللغة العربية فقط.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Form.Row>
              <Form.Row>
                <Col className='del-col'>
                  <Button type='button' onClick={() => deleteItem(degree.id)}>
                    مسح الدراسة
                  </Button>
                </Col>
              </Form.Row>
            </div>
          )
        })
      )}
    </Container>
  )
}

export default UniversityDegrees
