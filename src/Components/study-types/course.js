import React from 'react'
import './study-types.css'
import { Col, Form } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'

const Course = ({ isEditing, course, deleteCourse, chandleChange, index }) => {
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
            name={`courseCode-${index}`}
            className='form-input'
            type='input'
            value={courseCode}
            onChange={chandleChange}
            disabled={!isEditing}
          ></Form.Control>
        </Col>
        <Col md={3}>
          <Form.Control
            name={`courseArabicName-${index}`}
            className='form-input'
            type='input'
            value={courseArabicName}
            onChange={chandleChange}
            disabled={!isEditing}
          ></Form.Control>
        </Col>
        <Col md={3} dir='ltr' lang='en'>
          <Form.Control
            name={`courseEnglishName-${index}`}
            className='form-input form-english'
            type='input'
            value={courseEnglishName}
            onChange={chandleChange}
            disabled={!isEditing}
          ></Form.Control>
        </Col>
        <Col md={2}>
          <Form.Control
            name={`courseMaxDegree-${index}`}
            className='form-input'
            type='input'
            value={courseMaxDegree}
            onChange={chandleChange}
            disabled={!isEditing}
          ></Form.Control>
        </Col>
        <Col md={2}>
          <Form.Control
            name={`courseCreditHours-${index}`}
            className='form-input'
            type='input'
            value={courseCreditHours}
            onChange={chandleChange}
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
