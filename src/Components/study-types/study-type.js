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
            type='number'
            value={code}
            onChange={handleChange}
            disabled
          />
        </Col>
        <Col md={2}>
          <section className='form-group' controlId={`type-${index}`}>
            <Form.Control
              className='form-input'
              as='select'
              name={`type-${index}`}
              value={type}
              custom
              required
              onChange={handleChange}
              disabled={!isEditing}
            >
              <option value=''>نوع الدراسة</option>
              <option value='دبلومة الدراسات العليا'>
                دبلومة الدراسات العليا
              </option>
              <option value='تمهيدي الماجيستير'>تمهيدي الماجستير</option>
              <option value='الماجستير في العلوم'>الماجستير في العلوم</option>
              <option value='دكتوراه الفلسفة في العلوم'>
                دكتوراه الفلسفة في العلوم
              </option>
            </Form.Control>
            <article className='invalid-feedback' type='invalid'>
              من فضلك اختر نوع الدراسة.
            </article>
          </section>
        </Col>
        <Col md={2}>
          <section className='form-group' controlId={`arabicName-${index}`}>
            <Form.Control
              className='form-input'
              name={`arabicName-${index}`}
              type='input'
              value={arabicName}
              onChange={handleChange}
              disabled={!isEditing}
              pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
            />
            <article className='invalid-feedback' type='invalid'>
              من فضلك أدخل عنوان الرسالة باللغة العربية فقط.
            </article>
          </section>
        </Col>
        <Col md={2}>
          <section className='form-group' controlId={`englishName-${index}`}>
            <Form.Control
              className='form-input form-english'
              name={`englishName-${index}`}
              type='input'
              value={englishName}
              onChange={handleChange}
              disabled={!isEditing}
              dir='ltr'
              lang='en'
              pattern='^[a-zA-Z0-9$@$!%*?&#^-_. +]+$'
            />
            <article className='invalid-feedback' type='invalid'>
              من فضلك أدخل عنوان الرسالة باللغة الإنجليزية فقط.
            </article>
          </section>
        </Col>
        <Col md={2}>
          <section className='form-group' controlId={`department-${index}`}>
            <Form.Control
              className='form-input'
              as='select'
              name={`department-${index}`}
              value={department}
              onChange={handleChange}
              disabled={!isEditing}
              custom
              required
            >
              <option value=''>القسم</option>
              <option value='قسم الفيزياء'>قسم الفيزياء</option>
              <option value='قسم الكيمياء'>قسم الكيمياء</option>
              <option value='قسم الكيمياء الحيوية'>قسم الكيمياء الحيوية</option>
              <option value='قسم علم الحشرات'>قسم علم الحشرات</option>
              <option value='قسم الرياضيات'>قسم الرياضيات</option>
              <option value='قسم الجيولوجيا'>قسم الجيولوجيا</option>
              <option value='قسم الجيوفيزياء'>قسم الجيوفيزياء</option>
              <option value='قسم علم الحيوان'>قسم علم الحيوان</option>
              <option value='قسم علم النبات'>قسم علم النبات</option>
            </Form.Control>
            <article className='invalid-feedback' type='invalid'>
              من فضلك اختر القسم.
            </article>
          </section>
        </Col>
        <Col md={1}>
          <section className='form-group' controlId={`academicCode-${index}`}>
            <Form.Control
              className='form-input'
              name={`academicCode-${index}`}
              type='input'
              value={academicCode}
              onChange={handleChange}
              disabled={!isEditing}
              pattern='^[a-zA-Z0-9]+$'
            />
            <article className='invalid-feedback' type='invalid'>
              من فضلك أدخل كود الدراسة بالطريقةالصحيحة.
            </article>
          </section>
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
            <Button className='save-btn editing-btn' type='submit'>
              حفظ{' '}
            </Button>
            <Button
              className='delete-btn editing-btn'
              onClick={() => handleDelete(code)}
              type='button'
            >
              {' '}
              مسح الدراسة{' '}
            </Button>
            <Button
              className='cancel-btn editing-btn'
              onClick={() => setIsEditing(false)}
              type='button'
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
