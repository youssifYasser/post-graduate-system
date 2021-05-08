import { React, useState } from 'react'
import './study-types.css'
import { Container, Col, Form } from 'react-bootstrap'
import Course from './course'
import NoCourses from './no-courses'

const Courses = ({ isEditing, courses }) => {
  const [subjects, setSubjects] = useState([...courses])

  const deleteCourse = (courseID) => {
    console.log('courseID', courseID)
    const corses = subjects.filter((item) => {
      console.log(item.courseCode)
      return item.courseCode !== courseID
    })
    setSubjects(corses)
  }

  const chandleChange = (e) => {
    let { name, value } = e.target
    let indexOfDash = name.lastIndexOf('-')
    let index = name.slice(indexOfDash + 1)
    name = name.slice(0, indexOfDash)
    subjects[index] = { ...subjects[index], [name]: value }
    setSubjects([...subjects])
  }

  if (subjects.length === 0 && isEditing) {
    return <NoCourses />
  }
  return (
    <Container className='courses animate__animated animate__fadeInDown'>
      <Form.Row className='course-labels'>
        <Col md={1}>كود المقرر</Col>
        <Col md={3}>اسم المقرر بالعربية</Col>
        <Col md={3}>اسم المقرر بالإنجليزية</Col>
        <Col md={2}>الدرجة العظمى للمقرر</Col>
        <Col md={2}>عدد الساعات المعتمدة</Col>
      </Form.Row>
      {subjects.map((course, index) => {
        return (
          <Course
            index={index}
            isEditing={isEditing}
            key={course.courseCode}
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
