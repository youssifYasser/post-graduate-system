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
          <section className='form-group'>
            <Form.Control
              name={`idCourse-${index}`}
              className='form-input'
              type='input'
              value={idCourse}
              onChange={chandleChange}
              disabled
            />
          </section>
        </Col>
        <Col md={2}>
          <section className='form-group'>
            <Form.Control
              name={`courseCode-${index}`}
              className='form-input'
              type='input'
              value={courseCode}
              onChange={chandleChange}
              disabled={!isEditing}
              pattern='^[a-zA-Z0-9 ]+$'
            />
            <article className='invalid-feedback' type='invalid'>
              من فضلك أدخل كود المقرر بالطريقة الصحيحة.
            </article>
          </section>
        </Col>
        <Col md={3}>
          <section className='form-group'>
            <Form.Control
              name={`arabicName-${index}`}
              className='form-input'
              type='input'
              value={arabicName}
              onChange={chandleChange}
              disabled={!isEditing}
              pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
            />
            <article className='invalid-feedback' type='invalid'>
              من فضلك أدخل عنوان المقرر باللغة العربية فقط.
            </article>
          </section>
        </Col>
        <Col md={3} dir='ltr' lang='en'>
          <section className='form-group'>
            <Form.Control
              name={`englishName-${index}`}
              className='form-input form-english'
              type='input'
              value={englishName}
              onChange={chandleChange}
              disabled={!isEditing}
              pattern='^[a-zA-Z ]+$'
            />
            <article className='invalid-feedback' type='invalid'>
              من فضلك أدخل عنوان المقرر باللغة الإنجليزية فقط.
            </article>
          </section>
        </Col>
        <Col md={1}>
          <section className='form-group'>
            <Form.Control
              name={`maxGrade-${index}`}
              className='form-input'
              type='input'
              value={maxGrade}
              onChange={chandleChange}
              disabled={!isEditing}
              pattern='^[0-9]+$'
            />
            <article className='invalid-feedback' type='invalid'>
              من فضلك استخدم الأرقام فقط.
            </article>
          </section>
        </Col>
        <Col md={1}>
          <section className='form-group'>
            <Form.Control
              name={`creditHours-${index}`}
              className='form-input'
              type='input'
              value={creditHours}
              onChange={chandleChange}
              disabled={!isEditing}
              pattern='^[0-9]+$'
            />
            <article className='invalid-feedback' type='invalid'>
              من فضلك أدخل استخدم الأرقام فقط.
            </article>
          </section>
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
