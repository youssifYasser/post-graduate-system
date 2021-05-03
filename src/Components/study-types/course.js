import React from 'react'
import './study-types.css'
import { Col, Form } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'

const Course = ({ isEditing, isDisabled, course }) => {
  const {
    courseCode,
    courseArabicName,
    courseEnglishName,
    courseMaxDegree,
    courseCreditHours,
  } = course
  return (
    <>
      <Form.Row className='course'>
        <Col md={1}>
          <Form.Control
            name='course-academic-code'
            className='form-input'
            type='input'
            value={courseCode}
            disabled={isDisabled}
          ></Form.Control>
        </Col>
        <Col md={3}>
          <Form.Control
            name='course-arabic-name'
            className='form-input'
            type='input'
            value={courseArabicName}
            disabled={isDisabled}
          ></Form.Control>
        </Col>
        <Col md={3}>
          <Form.Control
            name='course-english-name'
            className='form-input'
            type='input'
            value={courseEnglishName}
            disabled={isDisabled}
          ></Form.Control>
        </Col>
        <Col md={2}>
          <Form.Control
            name='course-max-degree'
            className='form-input'
            type='input'
            value={courseMaxDegree}
            disabled={isDisabled}
          ></Form.Control>
        </Col>
        <Col md={2}>
          <Form.Control
            name='course-credit-hours'
            className='form-input'
            type='input'
            value={courseCreditHours}
            disabled={isDisabled}
          ></Form.Control>
        </Col>
        <Col md={1}>
          {isEditing && (
            <button className='icon delete-icon delete-course'>
              <MdDeleteForever />
            </button>
          )}
        </Col>
      </Form.Row>
    </>
  )
}

export default Course
