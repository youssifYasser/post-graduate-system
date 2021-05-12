import { React, useState, useEffect } from 'react'
import './study-types.css'
import { Container, Col, Form } from 'react-bootstrap'
import Course from './course'
import NoCourses from './no-courses'
import axios from 'axios'
import Swal from 'sweetalert2'

const Courses = ({
  isEditing,
  setShowCourses,
  showCourses,
  copyCourses,
  setCopyCourses,
  setCourses,
}) => {
  const deleteCourse = (courseID) => {
    Swal.fire({
      icon: 'warning',
      title: 'هل أنت متأكد من إزالة المقرر',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `نعم ، امسح المقرر`,
      cancelButtonText: 'لا ، عودة',
      cancelButtonColor: '#2f3944',
      denyButtonColor: '#be0707',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        Swal.fire({
          icon: 'success',
          title: 'تمت إزالة المقرر بنجاح',
          confirmButtonText: 'حسنــاً',
          confirmButtonColor: '#2f3944',
        })
        const corses = copyCourses.filter((item) => {
          return item.idCourse !== courseID
        })
        setCopyCourses([...corses])
        setCourses([...corses])

        const deleteCoursesAPI = {
          url: `http://localhost:8000/api/deletecourse/${courseID}`,
          method: 'delete',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
        axios(deleteCoursesAPI)
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  const chandleChange = (e) => {
    let { name, value } = e.target
    let indexOfDash = name.lastIndexOf('-')
    let index = name.slice(indexOfDash + 1)
    name = name.slice(0, indexOfDash)
    copyCourses[index] = { ...copyCourses[index], [name]: value }
    setCopyCourses([...copyCourses])
  }

  if (copyCourses.length === 0 && (isEditing || showCourses)) {
    return <NoCourses />
  }
  return (
    <Container className='courses animate__animated animate__fadeInDown'>
      <Form.Row className='course-labels'>
        <Col md={1}>الرقم الكودي</Col>
        <Col md={1}>كود المقرر</Col>
        <Col md={3}>اسم المقرر بالعربية</Col>
        <Col md={3}>اسم المقرر بالإنجليزية</Col>
        <Col md={1}>الدرجة العظمى</Col>
        <Col md={2}>عدد الساعات المعتمدة</Col>
      </Form.Row>
      {copyCourses.map((course, index) => {
        return (
          <Course
            index={index}
            isEditing={isEditing}
            key={course.idCourse}
            course={course}
            deleteCourse={deleteCourse}
            chandleChange={chandleChange}
          />
        )
      })}
    </Container>
  )
}

export default Courses
