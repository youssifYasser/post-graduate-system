import { React, useState, useEffect } from 'react'
import './study-types.css'
import { Container, Col, Form } from 'react-bootstrap'
import Course from './course'
import NoCourses from './no-courses'
import axios from 'axios'

const Courses = ({ isEditing, setShowCourses, courses, setCopyCourses }) => {
  const deleteCourse = (courseID) => {
    console.log('courseID', courseID)
    const corses = courses.filter((item) => {
      console.log(item.courseCode)
      return item.idCourse !== courseID
    })
    setCopyCourses(corses)
  }

  const chandleChange = (e) => {
    let { name, value } = e.target
    let indexOfDash = name.lastIndexOf('-')
    let index = name.slice(indexOfDash + 1)
    name = name.slice(0, indexOfDash)
    copyCourses[index] = { ...copyCourses[index], [name]: value }
    setCopyCourses([...courses])
  }

  if (copyCourses.length === 0 && isEditing) {
    setShowCourses(false)
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
            key={course.courseID}
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
