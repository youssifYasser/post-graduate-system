import React from 'react'
import { Container, Row, Form, Col, Button } from 'react-bootstrap'
import '../ref-style.css'
import { FaSearch } from 'react-icons/fa'
import referees from './referees-array'

const Referees = () => {
  return (
    <Container className='view-ref'>
      <Row>
        <div className='header'>
          <h1>الـمـحـكـمـيـــن</h1>
        </div>
      </Row>
      <Form className='search-form'>
        <Row className='search-row'>
          <Col>
            <section className='form-group'>
              <Form.Control
                className='info'
                as='select'
                name='degree-filter'
                custom
                required
              >
                <option value=''>الدرجة العلمية</option>
                <option value='مدرس جامعي'>مدرس جامعي</option>
                <option value='استاذ مساعد'>استاذ مساعد</option>
                <option value='استاذ'>استاذ</option>
              </Form.Control>
              <article className='invalid-feedback' type='invalid'>
                من فضلك اختر الدرجة العلمية
              </article>
            </section>
          </Col>
          <Col>
            <section className='form-group'>
              <Form.Control
                className='info'
                as='select'
                name='specialization-filter'
                custom
                required
              >
                <option value=''>التخصص</option>
                <option value='تصميم ويب'>تصميم ويب</option>
                <option value='تشفير'>تشفير</option>
                <option value='الرياضيات البحتة'>الرياضيات البحتة</option>
              </Form.Control>
              <article className='invalid-feedback' type='invalid'>
                من فضلك اختر التخصص
              </article>
            </section>
          </Col>
          <Col>
            <section className='form-group'>
              <Form.Control
                className='info'
                as='select'
                name='department-filter'
                custom
                required
              >
                <option value=''>القسم</option>
                <option value='قسم الرياضيات'>قسم الرياضيات</option>
                <option value='قسم الكيمياء'>قسم الكيمياء</option>
                <option value='قسم الفيزياء'>قسم الفيزياء</option>
                <option value='قسم الحشرات'>قسم الحشرات</option>
                {/* {departments.map((department) => {
                  return (
                    <option
                      key={department.idDept}
                      value={department.arabicName}
                    >
                      {department.arabicName}
                    </option>
                  )
                })} */}
              </Form.Control>
              <article className='invalid-feedback' type='invalid'>
                من فضلك اختر القسم
              </article>
            </section>
          </Col>
          <Col>
            <Button
              className='filter-btn'
              type='button'
              //onClick={filterStudies}
            >
              {' '}
              إعرض{' '}
            </Button>
          </Col>
          <Col className='search-col'>
            <Form.Control
              className='info'
              name='ref-search'
              type='input'
              placeholder='ابحث بالاسم او التخصص او القسم او الدرجة'
              //onChange={handleSearch}
            />
            <span className='search-icon'>
              <FaSearch />
            </span>
          </Col>
        </Row>
      </Form>
    </Container>
  )
}

export default Referees
