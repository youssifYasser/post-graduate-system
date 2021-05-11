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
  const [filterValidated, setFilterValidated] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
    }
  }

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

  const filterStudies = (e) => {
    e.preventDefault()
    const studyTypeFilter = document.getElementsByName('study-type-filter')[0]
      .value
    const departmentFilter = document.getElementsByName('department-filter')[0]
      .value
    if (studyTypeFilter === '' && departmentFilter === '') {
      const form = e.currentTarget
      if (form.checkValidity() === false) {
        e.stopPropagation()
        setValidated(true)
        console.log('mama zmanha gaya')
      }
    } else {
      const newStudies = studies.filter((study) => {
        if (studyTypeFilter === '' || departmentFilter === '') {
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
  }

  return (
    <div className='study-types-view'>
      <Row>
        <div className='header'>
          <h2>الدراسات العليا بكلية العلوم جامعة عين شمس</h2>
        </div>
      </Row>
      <Form
        className='studies-form'
        noValidate
        validated={validated}
        onSubmit={filterStudies}
      >
        <Form.Row className='search-row'>
          <Col md={2}>
            <section className='form-group' controlId='study-type-filter'>
              <Form.Control
                className='info'
                as='select'
                name='study-type-filter'
                custom
                required
              >
                <option value=''>نوع الدراسة</option>
                <option value='دبلومة الدراسات العليا'>
                  دبلومة الدراسات العليا
                </option>
                <option value='تمهيدي الماجيستير'>تمهيدي الماجستير</option>
                <option value='الماجستير في العلوم'>الماجستير في العلوم</option>
                <option value='دكتوراه الفلسفة في العلوم'>
                  دكتوراه الفلسفة في العلوم
                </option>
              </Form.Control>
              <article className='invalid-feedback' type='invalid'>
                من فضلك اختر نوع الدراسة
              </article>
            </section>
          </Col>
          <Col md={2}>
            <section className='form-group' controlId='department-filter'>
              <Form.Control
                className='info'
                as='select'
                name='department-filter'
                custom
                required
              >
                <option value=''>القسم</option>
                <option value='قسم الفيزياء'>قسم الفيزياء</option>
                <option value='قسم الكيمياء'>قسم الكيمياء</option>
                <option value='قسم الكيمياء الحيوية'>
                  قسم الكيمياء الحيوية
                </option>
                <option value='قسم علم الحشرات'>قسم علم الحشرات</option>
                <option value='قسم الرياضيات'>قسم الرياضيات</option>
                <option value='قسم الجيولوجيا'>قسم الجيولوجيا</option>
                <option value='قسم الجيوفيزياء'>قسم الجيوفيزياء</option>
                <option value='قسم علم الحيوان'>قسم علم الحيوان</option>
                <option value='قسم علم النبات'>قسم علم النبات</option>
              </Form.Control>
              <article className='invalid-feedback' type='invalid'>
                من فضلك اختر القسم
              </article>
            </section>
          </Col>
          <Col md={{ span: '1', offset: '4' }}>
            <Button className='filter-btn' type='submit'>
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
      </Form>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
