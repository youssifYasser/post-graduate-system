import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import {
  Col,
  Container,
  Row,
  Image,
  Form,
  Button,
  Accordion,
  Card,
} from 'react-bootstrap'

import './viewDepartments-style.css'
import 'animate.css/animate.min.css'

import DepartmentRow from './department-row'

const ViewDepartments = () => {
  const [departments, setDepartments] = useState([
    {
      arabicName: 'قسم الرياضيات',
      englishName: 'Mathematics department',
      id: '1',
    },
    {
      arabicName: 'قسم الفيزياء',
      englishName: 'Physics department',
      id: '2',
    },
    {
      arabicName: 'قسم الكيمياء',
      englishName: 'Chemistery department',
      id: '3',
    },
  ])

  // let EditingMode

  // useEffect(() => {
  //   let department = departments[editing - 1]
  //   console.log(department)
  //   EditingMode = (
  //     <React.Fragment>
  //       <Form.Row>
  //         <Col>
  //           <Form.Control type='number' name='id' value={department.id} />
  //         </Col>

  //         <Col>
  //           <Form.Control
  //             type='text'
  //             name='arabicName'
  //             value={department.arabicName}
  //             pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
  //           />
  //         </Col>

  //         <Col>
  //           <Form.Control
  //             type='text'
  //             name='englishName'
  //             value={department.englishName}
  //             pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
  //           />
  //         </Col>
  //       </Form.Row>
  //     </React.Fragment>
  //   )
  // }, [editing])

  const handleEdit = (department) => {
    // setEditing(department.id)
    let element = document.getElementById(department.id)
    // console.log(element.children[0].childNodes[0].firstChild)
    for (let i = 0; i < 3; i++) {
      element.children[0].childNodes[i].firstChild.disabled = false
    }
    element.className = 'editing animate__animated animate__fadeIn'
    element.lastChild.style.display = 'block'

    document.getElementsByClassName(department.id)[0].style.display = 'none'
    document.getElementsByClassName(department.id)[1].style.display = 'none'
    // element.innerHTML = `<>${EditingMode}</>`
    // console.log(element)
  }

  const handleSave = (department) => {
    let element = document.getElementById(department.id)
    for (let i = 0; i < 3; i++) {
      element.children[0].childNodes[i].firstChild.disabled = true
    }
    element.className = 'animate__animated animate__fadeInUp'
    element.lastChild.style.display = 'none'

    document.getElementsByClassName(department.id)[0].style.display = 'block'
    document.getElementsByClassName(department.id)[1].style.display = 'block'
  }

  const handleCancel = (department) => {
    let element = document.getElementById(department.id)
    for (let i = 0; i < 3; i++) {
      element.children[0].childNodes[i].firstChild.disabled = true
    }
    element.className = 'animate__animated animate__fadeInUp'
    element.lastChild.style.display = 'none'

    document.getElementsByClassName(department.id)[0].style.display = 'block'
    document.getElementsByClassName(department.id)[1].style.display = 'block'
  }

  return (
    <Container className='view-department'>
      <div className='main-form'>
        <Row>
          <Col className='header'>
            <h1>الأقسام</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <FaSearch />
            <Form.Control type='text' placeholder='ابحث عن القسم' />
          </Col>
        </Row>

        {departments.map((department) => {
          return (
            <DepartmentRow
              department={department}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          )
        })}
      </div>
    </Container>
  )
}

export default ViewDepartments
