import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Col, Container, Row, Form } from 'react-bootstrap'

import './viewDepartments-style.css'
import 'animate.css/animate.min.css'

import DepartmentRow from './department-row'
import NoDepartments from './no-departments'

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
  const [copyDepts, setCopyDepts] = useState(departments)

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

  const handleDelete = (deptID) => {
    const newDepartments = copyDepts.filter((department) => {
      return department.id !== deptID
    })
    setCopyDepts(newDepartments)
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    let indexOfDash = name.lastIndexOf('-')
    let index = name.slice(indexOfDash + 1)
    name = name.slice(0, indexOfDash)
    console.log(name, value, index)

    copyDepts[index] = { ...copyDepts[index], [name]: value }
    setCopyDepts([...copyDepts])
  }

  const search = (e) => {
    const value = e.target.value
    const resultDepts = departments.filter((dept) => {
      if (dept.arabicName.includes(value)) {
        return dept
      } else if (dept.englishName.toLowerCase().includes(value.toLowerCase())) {
        return dept
      }
    })
    setCopyDepts(resultDepts)
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
            <Form.Control
              type='text'
              placeholder='ابحث عن القسم'
              onChange={search}
            />
          </Col>
        </Row>
        {copyDepts.length !== 0 ? (
          copyDepts.map((department, index) => {
            return (
              <DepartmentRow
                key={department.id}
                index={index}
                department={department}
                handleSave={handleSave}
                handleDelete={handleDelete}
                handleChange={handleChange}
              />
            )
          })
        ) : (
          <NoDepartments />
        )}
      </div>
    </Container>
  )
}

export default ViewDepartments
