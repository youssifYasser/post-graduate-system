import { React, useState, useEffect } from 'react'
import './study-types.css'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Courses from './courses'
import axios from 'axios'
import Swal from 'sweetalert2'
import isEqual from 'lodash/isEqual'

const StudyType = ({
  studytype,
  handleDelete,
  handleChange,
  index,
  studies,
  setStudies,
  copyStudies,
  setCopyStudies,
  departments,
  tempCourses,
  setTempCourses,
}) => {
  const [showCourses, setShowCourses] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [validated, setValidated] = useState(false)
  const [courses, setCourses] = useState([])
  const [copyCourses, setCopyCourses] = useState([])

  copyStudies[index] = { ...copyStudies[index], ['index']: index }
  studies[index] = { ...studies[index], ['index']: index }

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
        if (response.data === 'not have any course') {
          setCourses([])
          setCopyCourses([])
        } else {
          setCourses([...response.data])
          setCopyCourses([...response.data])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    //deal with the deleting the copyCourses object in tempCourses when deleting the whole Study
    let courseObj = { [`courses-${index}`]: [...courses] }
    // console.log(courseObj)
    if (courseObj[`courses-${index}`].length !== 0) {
      for (let i = 0; i < courseObj[`courses-${index}`].length; i++) {
        courseObj[`courses-${index}`][i] = {
          ...courseObj[`courses-${index}`][i],
          ['studyUniversityCode']: universityCode,
        }
      }
    }
    tempCourses[index] = [...courseObj[`courses-${index}`]]
    setTempCourses([...tempCourses])
  }, [courses])

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
        title: 'هل أنت متأكد من حفظ التغييرات؟',
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
          setValidated(false)

          const updateStudyTypesAPI = {
            url: `http://localhost:8000/api/updatestudytype/${studytype.idStudyType}`,
            method: 'put',
            data: JSON.stringify(studytype),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
            },
          }
          axios(updateStudyTypesAPI)
            .then((response) => {
              setStudies([...copyStudies])
            })
            .catch((err) => {
              console.log(err)
            })

          //deleting Courses
          for (let i = 0; i < courses.length; i++) {
            if (courses[i].deleted === true) {
              const deleteCoursesAPI = {
                url: `http://localhost:8000/api/deletecourse/${courses[i].idCourse}`,
                method: 'delete',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
                },
              }
              axios(deleteCoursesAPI)
                .then((response) => {
                  // console.log(response)
                  courses.splice(i, 1)
                  i = i - 1
                  setCourses([...courses])
                })
                .catch((err) => {
                  console.log(err)
                })
            }
          }

          if (copyCourses.length !== 0) {
            let newCourses = []
            for (let i = 0; i < copyCourses.length; i++) {
              if (copyCourses[i].new) {
                newCourses.push(copyCourses[i])
                copyCourses.splice(i, 1)
                i = i - 1
              }
            }
            console.log({ ['new courses']: newCourses })

            let updatedCourses = []
            for (let i = 0; i < copyCourses.length; i++) {
              if (!isEqual(courses[i], copyCourses[i])) {
                updatedCourses.push(copyCourses[i])
              }
            }

            // console.log({ ['courses']: updatedCourses })
            const updateCoursesAPI = {
              url: 'http://localhost:8000/api/updatecourses',
              method: 'put',
              data: JSON.stringify({ ['courses']: updatedCourses }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
              },
            }
            axios(updateCoursesAPI)
              .then((response) => {
                // console.log(response)
                setCourses([...copyCourses])
              })
              .catch((err) => {
                console.log(err)
              })

            const addCourseAPI = {
              url: `http://localhost:8000/api/addcourses/${idStudyType}`,
              method: 'post',
              data: JSON.stringify({ ['courses']: newCourses }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
              },
            }
            axios(addCourseAPI)
              .then((response) => {
                console.log(response)
                setCopyCourses([...copyCourses, ...newCourses])
                setCourses([...copyCourses, ...newCourses])
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
      })
    }
  }

  const handleCancel = () => {
    if (
      !isEqual(copyStudies[index], studies[index]) ||
      (copyCourses.length !== 0 &&
        JSON.stringify(copyCourses) !== JSON.stringify(courses))
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
          if (copyCourses.length !== 0) {
            setCopyCourses([...courses])
          }
          copyStudies[index] = studies[index]
          setCopyStudies([...copyStudies])
          setIsEditing(false)
          setValidated(false)
        }
      })
    } else {
      setIsEditing(false)
      setValidated(false)
    }
  }

  const addCourse = () => {
    const lastID =
      copyCourses.length !== 0
        ? copyCourses[copyCourses.length - 1].idCourse
        : 0
    // console.log(lastID)
    copyCourses.push({ idCourse: lastID + 1, new: true })
    setCopyCourses([...copyCourses])
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
            <section className='form-group'>
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
            <section className='form-group'>
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
            <section className='form-group'>
              <Form.Control
                className='form-input form-english'
                name={`englishName-${index}`}
                type='input'
                value={englishName}
                onChange={handleChange}
                disabled={!isEditing}
                dir='ltr'
                lang='en'
                pattern='^[a-zA-Z ]+$'
              />
              <article className='invalid-feedback' type='invalid'>
                من فضلك أدخل عنوان الرسالة باللغة الإنجليزية فقط.
              </article>
            </section>
          </Col>
          <Col md={2}>
            <section className='form-group'>
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
            <section className='form-group'>
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
                onClick={() => {
                  setShowCourses(!showCourses)
                }}
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
            showCourses={showCourses}
            copyCourses={copyCourses}
            setCopyCourses={setCopyCourses}
            courses={courses}
          />
        )}
        {isEditing && (
          <Row className='animate__animated animate__fadeInDown'>
            <Col className='add-course-btn'>
              <Button type='button' onClick={() => addCourse()}>
                إضافة مقرر
              </Button>
            </Col>
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
