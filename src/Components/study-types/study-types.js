import React, { useState } from 'react'
import './study-types.css'
import { FaSearch } from 'react-icons/fa'
import StudyType from './study-type'
import studytypes from './study-types-array'
import { Row, Col, Form, Button } from 'react-bootstrap'

const StudyTypes = () => {
  return (
    <div className='study-types-view'>
      <Row>
        <div className='header'>
          <h2>الدراسات العليا بكلية العلوم جامعة عين شمس</h2>
        </div>
      </Row>
      <Form>
        <Form.Row>
          <Col md={2}>
            <Form.Control
              className='info'
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
          </Col>
          <Col md={2}>
            <Form.Control
              className='info'
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
          </Col>
          <Col md={{ span: '1', offset: '4' }}>
            <Button className='filter-btn'> إعرض </Button>
          </Col>
          <Col md={3}>
            <Form.Control
              className='info'
              name='study-type-search'
              type='input'
            />
            <span className='search-icon'>
              <FaSearch />
            </span>
          </Col>
        </Form.Row>
        {studytypes.map((studytype) => {
          return <StudyType studytype={studytype} key={studytype.code} />
        })}
      </Form>
    </div>
  )
}

export default StudyTypes
