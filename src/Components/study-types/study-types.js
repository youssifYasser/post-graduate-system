import React, { useState } from 'react'
import './study-types.css'
import { FaSearch } from 'react-icons/fa'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

const StudyTypes = () => {
  return (
    <>
      <Container className='study-types-view'>
        <Row>
          <div className='header'>
            <h2>الدراسات العليا بكلية العلوم جامعة عين شمس</h2>
          </div>
        </Row>
        <Form>
          <Form.Row>
            <Col md={2}>
              <Form.Group controlId='study-type-filter'>
                <Form.Control
                  className='form-input'
                  as='select'
                  name='study-type-filter'
                  custom
                >
                  <option value='نوع الدراسة'>نوع الدراسة</option>
                  <option value='الدبلومة'>الدبلومة</option>
                  <option value='تمهيدي الماجيستير'>تمهيدي الماجستير</option>
                  <option value='الماجيستير'>الماجيستير</option>
                  <option value='الدكتوراه'>الدكتوراه</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={2}>
              <Form.Group controlId='department-filter'>
                <Form.Control
                  className='form-input'
                  as='select'
                  name='department-filter'
                  custom
                >
                  <option>القسم</option>
                  <option>قسم الفيزياء</option>
                  <option>قسم الكيمياء</option>
                  <option>قسم الكيمياء الحيوية</option>
                  <option>قسم علم الحشرات</option>
                  <option>قسم الرياضيات</option>
                  <option>قسم الجيولوجيا</option>
                  <option>قسم الجيوفيزياء</option>
                  <option>قسم علم الحيوان</option>
                  <option>قسم علم النبات</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={{ span: 'auto', offset: '3' }}>
              <Button className='next-btn'> إعرض </Button>
            </Col>
            <Col md={3}>
              <Form.Group controlId='study-type-search'>
                <Form.Control
                  className='form.input'
                  name='study-type-search'
                  type='input'
                />
                <span className='search-icon'>
                  <FaSearch />
                </span>
              </Form.Group>
            </Col>
          </Form.Row>
        </Form>
      </Container>
    </>
  )
}

export default StudyTypes
