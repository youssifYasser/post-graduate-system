import React, { useState } from 'react'
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import { FaSearch, FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import './viewDepartments-style.css'
import 'animate.css/animate.min.css'

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
        <Row>
          <Col>
            <Form.Label>الرقم الكودي</Form.Label>
          </Col>
          <Col>
            <Form.Label>اسم القسم باللغة العربية</Form.Label>
          </Col>
          <Col>
            <Form.Label>اسم القسم باللغة الإنجليزية</Form.Label>
          </Col>
        </Row>
        {departments.map((department, index) => {
          return (
            <Form.Row key={department.id}>
              <Col>
                <Form.Control
                  class='form-input'
                  type='number'
                  name='id'
                  value={department.id}
                />
              </Col>
              <Col>
                <Form.Control
                  class='form-input'
                  type='text'
                  name='arabicName'
                  value={department.arabicName}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                />
              </Col>
              <Col>
                <Form.Control
                  class='form-input'
                  type='text'
                  name='englishName'
                  value={department.englishName}
                  pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
                />
              </Col>
              <Col>
                <Button type='button'>
                  {' '}
                  <FaEdit />{' '}
                </Button>
              </Col>
              <Col>
                <Button type='button'>
                  <MdDeleteForever />{' '}
                </Button>
              </Col>
            </Form.Row>
          )
        })}
      </div>
    </Container>
  )
}

export default ViewDepartments
