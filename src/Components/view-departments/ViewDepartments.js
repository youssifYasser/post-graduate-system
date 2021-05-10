import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Col, Container, Row, Form } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'

import './viewDepartments-style.css'
import 'animate.css/animate.min.css'

import DepartmentRow from './department-row'
import NoDepartments from './no-departments'

const ViewDepartments = () => {
  const [departments, setDepartments] = useState([])
  const [copyDepts, setCopyDepts] = useState([])

  const handleDelete = (deptID) => {
    Swal.fire({
      icon: 'warning',
      title: 'هل أنت متأكد من إزالة القسم',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `نعم ، امسح القسم`,
      cancelButtonText: 'لا ، عودة',
      cancelButtonColor: '#2f3944',
      denyButtonColor: '#be0707',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        Swal.fire({
          icon: 'success',
          title: 'تمت إزالة القسم بنجاح',
          confirmButtonText: 'حسنــاً',
          confirmButtonColor: '#2f3944',
        })
        const newDepartments = copyDepts.filter((department) => {
          return department.idDept !== deptID
        })
        setCopyDepts(newDepartments)

        const deleteDepartmentsAPI = {
          url: `http://localhost:8000/api/departments/${deptID}`,
          method: 'delete',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
        axios(deleteDepartmentsAPI)
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    let indexOfDash = name.lastIndexOf('-')
    let index = name.slice(indexOfDash + 1)
    name = name.slice(0, indexOfDash)

    copyDepts[index] = { ...copyDepts[index], [name]: value }
    setCopyDepts([...copyDepts])
  }

  const handleSearch = (e) => {
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

  useEffect(() => {
    const departmentsAPI = {
      url: 'http://localhost:8000/api/departments',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(departmentsAPI)
      .then((response) => {
        console.log(response.data)
        setDepartments([...response.data])
        setCopyDepts([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
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
              onChange={handleSearch}
            />
          </Col>
        </Row>
        {copyDepts.length !== 0 ? (
          copyDepts.map((department, index) => {
            return (
              <DepartmentRow
                key={department.idDept}
                index={index}
                department={department}
                handleDelete={handleDelete}
                handleChange={handleChange}
                departments={departments}
                setDepartments={setDepartments}
                copyDepts={copyDepts}
                setCopyDepts={setCopyDepts}
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
