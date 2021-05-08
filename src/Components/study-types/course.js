import React from 'react'
import './study-types.css'
import { Col, Form } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'

const Course = ({ isEditing, course, deleteCourse }) => {
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
            disabled={!isEditing}
          ></Form.Control>
        </Col>
        <Col md={3}>
          <Form.Control
            name='course-arabic-name'
            className='form-input'
            type='input'
            value={courseArabicName}
            disabled={!isEditing}
          ></Form.Control>
        </Col>
        <Col md={3}>
          <Form.Control
            name='course-english-name'
            className='form-input form-english'
            type='input'
            value={courseEnglishName}
            disabled={!isEditing}
          ></Form.Control>
        </Col>
        <Col md={2}>
          <Form.Control
            name='course-max-degree'
            className='form-input'
            type='input'
            value={courseMaxDegree}
            disabled={!isEditing}
          ></Form.Control>
        </Col>
        <Col md={2}>
          <Form.Control
            name='course-credit-hours'
            className='form-input'
            type='input'
            value={courseCreditHours}
            disabled={!isEditing}
          ></Form.Control>
        </Col>
        <Col md={1}>
          {isEditing && (
            <button
              className='icon delete-icon delete-course'
              onClick={() => deleteCourse(courseCode)}
              type='button'
            >
              <MdDeleteForever />
            </button>
          )}
        </Col>
      </Form.Row>
    </>
  )
}

export default Course
