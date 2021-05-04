import { React, useState } from 'react'
import './study-types.css'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Courses from './courses'

const StudyType = ({ studytype }) => {
  const [showCourses, setShowCourses] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const {
    code,
    arabicName,
    englishName,
    type,
    department,
    academicCode,
    courses,
  } = studytype

  let isDisabled = true

  if (isEditing) isDisabled = false
  else isDisabled = true

  /* 
        isEditing &&
        'edit-study-type animate__animated animate__fadeInDown' */
  return (
    <div className={`${isEditing && 'edit-study-type'} section `}>
      <Form.Row className='study-labels'>
        <Col md={1}>الرقم الكودى</Col>
        <Col md={2}>نوع الدراسة</Col>
        <Col md={2}>اسم الدراسة باللغة العربية</Col>
        <Col md={2}>اسم الدراسة باللغة الإنجليزية</Col>
        <Col md={2}>القسم</Col>
        <Col md={1}>الكود الجامعى</Col>
      </Form.Row>
      <Form.Row className='study-type'>
        <Col md={1}>
          <Form.Control
            className='form-input'
            name='code'
            type='input'
            value={code}
            disabled={isDisabled}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            className='form-input'
            name='study-type'
            type='input'
            value={type}
            disabled={isDisabled}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            className='form-input'
            name='arabic-name'
            type='input'
            value={arabicName}
            disabled={isDisabled}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            className='form-input form-english'
            name='english-name'
            type='input'
            value={englishName}
            disabled={isDisabled}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            className='form-input'
            name='dept'
            type='input'
            value={department}
            disabled={isDisabled}
          />
        </Col>
        <Col md={1}>
          <Form.Control
            className='form-input'
            name='academic-code'
            type='input'
            value={academicCode}
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
        <Courses
          isEditing={isEditing}
          isDisabled={isDisabled}
          courses={courses}
        />
      )}
      {isEditing && (
        <Row className='animate__animated animate__fadeInDown'>
          <Col className='editing-btns'>
            <Button className='save-btn editing-btn'>حفظ </Button>
            <Button className='delete-btn editing-btn'> مسح الدراسة </Button>
            <Button
              className='cancel-btn editing-btn'
              onClick={() => setIsEditing(false)}
            >
              {' '}
              إلغاء{' '}
            </Button>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default StudyType
