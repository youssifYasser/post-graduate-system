import { React, useState, useEffect } from 'react'
import './study-types.css'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Courses from './courses'
import axios from 'axios'
import Swal from 'sweetalert2'

const StudyType = ({
  studytype,
  handleDelete,
  handleChange,
  index,
  studies,
  copyStudies,
  setCopyStudies,
  departments,
}) => {
  const [showCourses, setShowCourses] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [validated, setValidated] = useState(false)
  const [courses, setCourses] = useState([])
  const [copyCourses, setCopyCourses] = useState([])

  const {
    idStudyType,
    arabicName,
    englishName,
    type,
    department,
    universityCode,
  } = studytype

  useEffect(() => {
    const coursesAPI = {
      url: `http://localhost:8000/api/getallcourses/${idStudyType}`,
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(coursesAPI)
      .then((response) => {
        console.log(response.data)
        setCourses([...response.data])
        setCopyCourses([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ',
        text: '.من فضلك راجع البيانات',
        confirmButtonText: 'حسنــاً',
        confirmButtonColor: '#2f3944',
      })
    } else {
      setValidated(true)
      Swal.fire({
        icon: 'info',
        title: 'هل أنت متأكد من حفظ تغيير بيانات الدراسة؟',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#01ad01',
        confirmButtonText: 'نعم ، احفظ',
        cancelButtonText: 'لا ، عودة',
        cancelButtonColor: '#2f3944',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'تم تغيير بيانات الدراسة بنجاح',
            confirmButtonText: 'حسنــاً',
            confirmButtonColor: '#2f3944',
          })
          setIsEditing(false)

          // const updateDepartmentsAPI = {
          //   url: `http://localhost:8000/api/departments/${department.idDept}`,
          //   method: 'put',
          //   data: JSON.stringify(department),
          //   headers: {
          //     Accept: 'application/json',
          //     'Content-Type': 'application/json;charset=UTF-8',
          //   },
          // }
          // axios(updateDepartmentsAPI)
          //   .then((response) => {
          //     setDepartments([...copyDepts])
          //   })
          //   .catch((err) => {
          //     console.log(err)
          //   })
        }
      })
    }
  }

  const handleCancel = () => {
    if (
      copyStudies[index] !== studies[index] ||
      copyCourses[index] !== courses[index]
    ) {
      Swal.fire({
        icon: 'warning',
        title: '!لن يتم حفظ البيانات التي قمت بتعديلها',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `نعم ، إلغاء`,
        cancelButtonText: 'لا ، عودة',
        cancelButtonColor: '#2f3944',
        denyButtonColor: '#be0707',
      }).then((result) => {
        if (result.isDenied) {
          copyCourses[index] = courses[index]
          setCopyCourses([...copyCourses])
          copyStudies[index] = studies[index]
          setCopyStudies([...copyStudies])
          setIsEditing(false)
        }
      })
    } else {
      setIsEditing(false)
    }
  }

  return (
    <div className={`${isEditing && 'edit-study-type'} section `}>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
              name={`idStudyType-${index}`}
              type='number'
              value={idStudyType}
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
                {departments.map((department) => {
                  return (
                    <option
                      key={department.idDept}
                      value={department.arabicName}
                    >
                      {department.arabicName}
                    </option>
                  )
                })}
              </Form.Control>
              <article className='invalid-feedback' type='invalid'>
                من فضلك اختر القسم.
              </article>
            </section>
          </Col>
          <Col md={1}>
            <section
              className='form-group'
              controlId={`universityCode-${index}`}
            >
              <Form.Control
                className='form-input'
                name={`universityCode-${index}`}
                type='input'
                value={universityCode}
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
                type='button'
                onClick={() => handleDelete(idStudyType)}
              >
                <MdDeleteForever />
              </button>
            </Col>
          )}
        </Form.Row>
        {(showCourses || isEditing) && (
          <Courses
            isEditing={isEditing}
            setShowCourses={setShowCourses}
            courses={courses}
            setCopyCourses={setCopyCourses}
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
                onClick={() => handleDelete(idStudyType)}
                type='button'
              >
                {' '}
                مسح الدراسة{' '}
              </Button>

              <Button
                className='cancel-btn editing-btn'
                onClick={() => {
                  handleCancel()
                }}
                type='button'
              >
                {' '}
                إلغاء{' '}
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </div>
  )
}

export default StudyType
