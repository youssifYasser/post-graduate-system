import React from 'react'
import './study-types.css'
import { Col, Form } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'

const Course = ({ isEditing, course, deleteCourse, chandleChange, index }) => {
  const {
    idCourse,
    courseCode,
    arabicName,
    englishName,
    maxGrade,
    creditHours,
  } = course
  return (
    <>
      <Form.Row className='course'>
        <Col md={1}>
          <Form.Control
            name={`idCourse-${index}`}
            className='form-input'
            type='input'
            value={idCourse}
            onChange={chandleChange}
            disabled
          ></Form.Control>
        </Col>
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
            name={`arabicName-${index}`}
            className='form-input'
            type='input'
            value={arabicName}
            onChange={chandleChange}
            disabled={!isEditing}
          ></Form.Control>
        </Col>
        <Col md={3} dir='ltr' lang='en'>
          <Form.Control
            name={`englishName-${index}`}
            className='form-input form-english'
            type='input'
            value={englishName}
            onChange={chandleChange}
            disabled={!isEditing}
          ></Form.Control>
        </Col>
        <Col md={1}>
          <Form.Control
            name={`maxGrade-${index}`}
            className='form-input'
            type='input'
            value={maxGrade}
            onChange={chandleChange}
            disabled={!isEditing}
          ></Form.Control>
        </Col>
        <Col md={2}>
          <Form.Control
            name={`creditHours-${index}`}
            className='form-input'
            type='input'
            value={creditHours}
            onChange={chandleChange}
            disabled={!isEditing}
          ></Form.Control>
        </Col>
        <Col md={1}>
          {isEditing && (
            <button
              className='icon delete-icon delete-course'
              onClick={() => deleteCourse(idCourse)}
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
