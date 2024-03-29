import React, { useState } from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'

const Course = (props) => {
  const { handleChange2, handleDelete, deleteIndex, insertIndex } = props

  return (
    <div className='course mb-3'>
      <Row>
        <Col xs={12} md={6} lg={2}>
          <Form.Group>
            <Form.Control
              name={'courseCode-' + insertIndex}
              placeholder=' كود المقرر'
              onChange={handleChange2}
              pattern='[A-Za-z0-9]+'
              required
            />
            <Form.Control.Feedback type='invalid'>
              من فضلك ادخل كود المقرر
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Form.Group>
            <Form.Control
              name={'arNameOfCourse-' + insertIndex}
              placeholder='اسم المقرر بالعربية'
              onChange={handleChange2}
              pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
              required
            />
            <Form.Control.Feedback type='invalid'>
              من فضلك ادخل اسم المقرر بالعربية
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Form.Group>
            <Form.Control
              name={'enNameOfCourse-' + insertIndex}
              placeholder='اسم المقرر بالإنجليزية'
              onChange={handleChange2}
              pattern='^[a-zA-Z ]+$'
              required
            />
            <Form.Control.Feedback type='invalid'>
              من فضلك ادخل اسم المقرر بالإنجليزية
            </Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Form.Group>
            <Form.Control
              name={'maxDegreeOfCourse-' + insertIndex}
              placeholder='الدرجة العظمى للمقرر'
              onChange={handleChange2}
              pattern='[0-9]+'
              required
            />
            <Form.Control.Feedback type='invalid'>
              من فضلك ادخل الدرجة العظمى للمقرر
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col
          xs={{ order: 'first' }}
          md={12}
          lg={(1, { order: 'last' })}
          className='text-left deleteBtn'
        >
          <Button onClick={() => handleDelete(deleteIndex)}>
            <MdDeleteForever />
          </Button>
        </Col>
      </Row>
    </div>
  )
}

export default Course
