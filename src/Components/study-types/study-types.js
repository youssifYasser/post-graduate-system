import React, { useState } from 'react'
import './study-types.css'
import { FaSearch } from 'react-icons/fa'
import StudyType from './study-type'
import studytypes from './study-types-array'
import NoStudies from './no-studies'
import { Row, Col, Form, Button } from 'react-bootstrap'

const StudyTypes = () => {
  const [studies, setStudies] = useState([...studytypes])

  const handleDelete = (stID) => {
    const sts = studies.filter((item) => {
      return item.code !== stID
    })
    setStudies(sts)
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    let indexOfDash = name.lastIndexOf('-')
    let index = name.slice(indexOfDash + 1)
    name = name.slice(0, indexOfDash)
    studies[index] = { ...studies[index], [name]: value }
    console.log(name, value, index)
    setStudies([...studies])
  }

  return (
    <div className='study-types-view'>
      <Row>
        <div className='header'>
          <h2>الدراسات العليا بكلية العلوم جامعة عين شمس</h2>
        </div>
      </Row>
      <Form className='studies-form'>
        <Form.Row className='search-row'>
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
        {studies.length !== 0 ? (
          studies.map((studytype, index) => {
            return (
              <StudyType
                studytype={studytype}
                index={index}
                key={studytype.code}
                handleDelete={handleDelete}
                handleChange={handleChange}
              />
            )
          })
        ) : (
          <NoStudies />
        )}
      </Form>
    </div>
  )
}

export default StudyTypes
