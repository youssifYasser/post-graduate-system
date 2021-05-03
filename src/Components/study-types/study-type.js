import { React, useState } from 'react'
import './study-types.css'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { Col, Form, Button } from 'react-bootstrap'
import Courses from './courses'

const StudyType = ({ studytypes }) => {
  const [showCourses, setShowCourses] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  let isDisabled = true

  if (isEditing) isDisabled = false
  else isDisabled = true

  return (
    <div className={isEditing && 'edit-study-type'}>
      <Form.Row className='study-type'>
        <Col md={1}>
          <Form.Control
            className='form-input'
            name='code'
            type='input'
            disabled={isDisabled}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            className='form-input'
            name='study-type'
            type='input'
            disabled={isDisabled}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            className='form-input'
            name='arabic-name'
            type='input'
            disabled={isDisabled}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            className='form-input'
            name='english-name'
            type='input'
            disabled={isDisabled}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            className='form-input'
            name='dept'
            type='input'
            disabled={isDisabled}
          />
        </Col>
        <Col md={1}>
          <Form.Control
            className='form-input'
            name='academic-code'
            type='input'
            disabled={isDisabled}
          />
        </Col>
        <Col md={1}>
          {isEditing || (
            <Button
              className='view-btn'
              onClick={() => setShowCourses(!showCourses)}
            >
              {showCourses ? 'إخفاء المقررات' : 'عرض المقررات'}
            </Button>
          )}
        </Col>
        <Col md={1}>
          {isEditing || (
            <button
              className='icon edit-icon'
              onClick={() => setIsEditing(!isEditing)}
            >
              <FaEdit />
            </button>
          )}
          {isEditing || (
            <button className='icon delete-icon'>
              <MdDeleteForever />
            </button>
          )}
        </Col>
      </Form.Row>
      {(showCourses || isEditing) && (
        <Courses isEditing={isEditing} isDisabled={isDisabled} />
      )}
      {isEditing && (
        <Form.Row className='editing-btns animate__animated animate__fadeInDown'>
          <Col md={1}>
            <Button className='save-btn filter-btn'>حفظ </Button>
          </Col>
          <Col md={1}>
            <Button className='delete-btn filter-btn'> مسح الدراسة </Button>
          </Col>
          <Col md={1}>
            <Button
              className='cancel-btn filter-btn'
              onClick={() => setIsEditing(false)}
            >
              {' '}
              إلغاء{' '}
            </Button>
          </Col>
        </Form.Row>
      )}
    </div>
  )
}

export default StudyType
