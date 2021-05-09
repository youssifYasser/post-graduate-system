import React, { useState } from 'react'
import './study-types.css'
import { FaSearch } from 'react-icons/fa'
import StudyType from './study-type'
import studytypes from './study-types-array'
import NoStudies from './no-studies'
import { Row, Col, Form, Button } from 'react-bootstrap'

const StudyTypes = () => {
  const [studies, setStudies] = useState([...studytypes])
  const [copyStudies, setCopyStudies] = useState(studies)

  const handleDelete = (stID) => {
    const sts = copyStudies.filter((item) => {
      return item.code !== stID
    })
    setCopyStudies(sts)
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    let indexOfDash = name.lastIndexOf('-')
    let index = name.slice(indexOfDash + 1)
    name = name.slice(0, indexOfDash)
    copyStudies[index] = { ...copyStudies[index], [name]: value }
    console.log(name, value, index)
    setCopyStudies([...copyStudies])
  }

  const handleSearch = (e) => {
    const value = e.target.value
    const newStudies = studies.filter((study) => {
      if (study.arabicName.includes(value)) {
        return study
      } else if (
        study.englishName.toLowerCase().includes(value.toLowerCase())
      ) {
        return study
      } else if (
        study.academicCode.toLowerCase().includes(value.toLowerCase())
      ) {
        return study
      }
    })
    setCopyStudies(newStudies)
  }

  const filterStudies = () => {
    const studyTypeFilter = document.getElementsByName('study-type-filter')[0]
      .value
    const departmentFilter = document.getElementsByName('department-filter')[0]
      .options[document.getElementsByName('department-filter')[0].selectedIndex]
      .text
    const newStudies = studies.filter((study) => {
      if (studyTypeFilter === 'نوع الدراسة' || departmentFilter === 'القسم') {
        if (study.type === studyTypeFilter) {
          return study
        }
        if (study.department === departmentFilter) {
          return study
        }
      } else {
        if (
          study.type === studyTypeFilter &&
          study.department === departmentFilter
        ) {
          return study
        }
      }
    })
    setCopyStudies(newStudies)
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
            <Button className='filter-btn' onClick={() => filterStudies()}>
              {' '}
              إعرض{' '}
            </Button>
          </Col>
          <Col md={3}>
            <Form.Control
              className='info'
              name='study-type-search'
              type='input'
              placeholder='ابحث عن الدراسة'
              onChange={handleSearch}
            />
            <span className='search-icon'>
              <FaSearch />
            </span>
          </Col>
        </Form.Row>
        {copyStudies.length !== 0 ? (
          copyStudies.map((studytype, index) => {
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
