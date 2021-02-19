import React from 'react'
import { Col, Form, Container, Row } from 'react-bootstrap'
import './PersonalData.css'
import { countries } from '../countries'

const PersonalData = ({ personalData, setPersonalInfo, className }) => {
  const [student, setStudent] = React.useState(personalData)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    type === 'checkbox'
      ? setStudent({ ...student, [name]: checked })
      : setStudent({ ...student, [name]: value })
  }

  React.useEffect(() => {
    setPersonalInfo(student)
  }, [student])

  return (
    <>
      <Container className={`form-one ${className}`}>
        <h5 className='title'> البيانات الشخصية للطالب </h5>
        <section className='section'>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='arName'>
                <Form.Label>الاسم باللغة العربية</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='arabicName'
                  value={student.arabicName}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الاسم باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='enName'>
                <Form.Label>الاسم باللغة الإنجليزية</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='text'
                  name='englishName'
                  value={student.englishName}
                  onChange={handleChange}
                  pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الاسم باللغة الإنجليزية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} sm={12}>
              <Form.Group controlId='bDate'>
                <Form.Label>تاريخ الميلاد</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='text'
                  name='birthdate'
                  value={student.birthdate}
                  onChange={handleChange}
                  pattern='^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل التاريخ بالطريقة الصحيحة (مثال: 25/02/2015).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Row>
                <Col xs={6} md={5} lg={6}>
                  <Form.Group controlId='gender'>
                    <Form.Label>الجنس</Form.Label>
                    <Col className='gender'>
                      <Form.Check
                        inline
                        type='radio'
                        label='ذكر'
                        value='ذكر'
                        name='gender'
                        className='form-check-male'
                        checked={student.gender === 'ذكر'}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        type='radio'
                        value='أنثى'
                        label='أنثى'
                        name='gender'
                        className='form-check-female'
                        checked={student.gender === 'أنثى'}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col xs={6} md={7} lg={6}>
                  <Form.Group controlId='nation'>
                    <Form.Label>الجنسية</Form.Label>
                    <Form.Control
                      className='form-input'
                      as='select'
                      name='nationality'
                      value={student.nationality}
                      onChange={handleChange}
                      pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                      custom
                    >
                      {countries.map((country, index) => {
                        return <option key={index}>{country}</option>
                      })}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} xs={6}>
              <Form.Group controlId='natId'>
                <Form.Label>الرقم القومى</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='number'
                  name='nationalityId'
                  value={student.nationalityId}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الرقم القومى بالطريقة الصحيحية (أرقام فقط).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} xs={6}>
              <Form.Group controlId='birthSrc'>
                <Form.Label>مصدر شهادة الميلاد</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='birthdateSource'
                  value={student.birthdateSource}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل المصدر باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='code'>
                <Form.Label>الرقم الكودى</Form.Label>
                <Form.Control
                  className='form-input'
                  type='number'
                  name='id'
                  value={student.id}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الرقم الكودى بالطريقة الصحيحة(أرقام فقط).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='email'>
                <Form.Label>البريد الإلكترونى</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='email'
                  name='email'
                  value={student.email}
                  onChange={handleChange}
                  pattern='^[a-zA-Z0-9$@$!%*?&#^-_. +]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل البريد الإلكترونى بالطريقة الصحيحة
                  (example@mail.com).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
        </section>
        <section className='section'>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='address'>
                <Form.Label>العنوان</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='Add'
                  value={student.Add}
                  onChange={handleChange}
                  pattern='^[\u0621-\u064A-0-9 ]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل العنوان بالطريقة الصحيحة.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='phoneNum'>
                <Form.Label>رقم الهاتف</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='number'
                  name='mobile'
                  value={student.mobile}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل رقم الهاتف بالطريقة الصحيحة(أرقام فقط).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
        </section>
        <section className='section'>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} xs={6}>
              <Form.Group controlId='arJob'>
                <Form.Label>الوظيفة باللغة العربية</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='jobArabic'
                  value={student.jobArabic}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الوظيفة باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} xs={6}>
              <Form.Group controlId='enJob'>
                <Form.Label>الوظيفة باللغة الإنجليزية</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='text'
                  name='jobEnglish'
                  value={student.jobEnglish}
                  onChange={handleChange}
                  pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الوظيفة باللغة الإنجليزية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='jobAdd'>
                <Form.Label>عنوان الوظيفة</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='jobAdd'
                  value={student.jobAdd}
                  onChange={handleChange}
                  pattern='^[\u0621-\u064A-0-9 ]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل العنوان بالطريقة الصحيحة.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
        </section>
      </Container>
    </>
  )
}

export default PersonalData
