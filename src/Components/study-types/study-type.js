import { React, useState } from 'react'
import './study-types.css'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Courses from './courses'

const StudyType = ({ studytype, handleDelete, handleChange, index }) => {
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

  return (
    <div className={`${isEditing && 'edit-study-type'} section `}>
      <Form.Row className='study-labels'>
        <Col md={1}>الرقم الكودي</Col>
        <Col md={2}>نوع الدراسة</Col>
        <Col md={2}>اسم الدراسة باللغة العربية</Col>
        <Col md={2}>اسم الدراسة باللغة الإنجليزية</Col>
        <Col md={2}>القسم</Col>
        <Col md={1}>الكود الجامعي</Col>
      </Form.Row>
      <Form.Row className='study-type'>
        <Col md={1}>
          <Form.Control
            className='form-input'
            name={`code-${index}`}
            type='input'
            value={code}
            onChange={handleChange}
            disabled
          />
        </Col>
        <Col md={2}>
          <Form.Control
            className='form-input'
            name={`type-${index}`}
            type='input'
            value={type}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            className='form-input'
            name={`arabicName-${index}`}
            type='input'
            value={arabicName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Col>
        <Col md={2}>
          <Form.Control
            className='form-input form-english'
            name={`englishName-${index}`}
            type='input'
            value={englishName}
            onChange={handleChange}
            disabled={!isEditing}
            dir='ltr'
            lang='en'
          />
        </Col>
        <Col md={2}>
          <Form.Control
            className='form-input'
            name={`department-${index}`}
            type='input'
            value={department}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </Col>
        <Col md={1}>
          <Form.Control
            className='form-input'
            name={`academicCode-${index}`}
            type='input'
            value={academicCode}
            onChange={handleChange}
            disabled={!isEditing}
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
        {isEditing || (
          <Col md={1}>
            <button
              className='icon edit-icon'
              onClick={() => setIsEditing(!isEditing)}
            >
              <FaEdit />
            </button>

            <button
              className='icon delete-icon'
              onClick={() => handleDelete(code)}
            >
              <MdDeleteForever />
            </button>
          </Col>
        )}
      </Form.Row>
      {(showCourses || isEditing) && (
        <Courses
          isEditing={isEditing}
          courses={courses}
          setShowCourses={setShowCourses}
        />
      )}
      {isEditing && (
        <Row className='animate__animated animate__fadeInDown'>
          <Col className='editing-btns'>
            <Button className='save-btn editing-btn'>حفظ </Button>
            <Button
              className='delete-btn editing-btn'
              onClick={() => handleDelete(code)}
            >
              {' '}
              مسح الدراسة{' '}
            </Button>
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
