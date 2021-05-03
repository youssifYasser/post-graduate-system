import React from 'react'
import './study-types.css'
import { Container, Col, Form } from 'react-bootstrap'
import Course from './course'

const Courses = ({ isEditing, isDisabled, courses }) => {
  return (
    <Container className='courses animate__animated animate__fadeInDown'>
      <Form.Row className='course-labels'>
        <Col md={1}>كود المقرر</Col>
        <Col md={3}>اسم المقرر بالعربية</Col>
        <Col md={3}>اسم المقرر بالإنجليزية</Col>
        <Col md={2}>الدرجة العظمى للمقرر</Col>
        <Col md={2}>عدد الساعات المعتمدة</Col>
      </Form.Row>
      {courses.map((course) => {
        return (
          <Course
            isEditing={isEditing}
            isDisabled={isDisabled}
            key={course.courseCode}
            course={course}
          />
        )
      })}
    </Container>
  )
}

export default Courses
