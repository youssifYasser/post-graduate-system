import React from 'react'
import { Col, Form, Container, Row } from 'react-bootstrap'
import './PersonalData.css'
import { countries } from './countries'

const PersonalData = ({
  personalInfo,
  setPersonalInfo,
  className,
  handleChange,
}) => {
  // const [student, setStudent] = React.useState(personalData)

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target
  //   type === 'checkbox'
  //     ? setPersonalInfo({ ...personalInfo, [name]: checked })
  //     : setPersonalInfo({ ...personalInfo, [name]: value })
  // }

  // React.useEffect(() => {
  //   setPersonalInfo(student)
  // }, [student])

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
                  name='arabicName-p'
                  value={personalInfo.arabicName}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الاسم باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='enName' dir='ltr' lang='en'>
                <Form.Label>الاسم باللغة الإنجليزية</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='text'
                  name='englishName-p'
                  value={personalInfo.englishName}
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
              <Form.Group controlId='bDate' dir='ltr' lang='en'>
                <Form.Label>تاريخ الميلاد</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='text'
                  name='birthdate-p'
                  value={personalInfo.birthdate}
                  onChange={handleChange}
                  pattern='^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$'
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
                        name='gender-p'
                        className='form-check-male'
                        checked={personalInfo.gender === 'ذكر'}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        type='radio'
                        value='أنثى'
                        label='أنثى'
                        name='gender-p'
                        className='form-check-female'
                        checked={personalInfo.gender === 'أنثى'}
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
                      name='nationality-p'
                      value={personalInfo.nationality}
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
              <Form.Group controlId='natId' dir='ltr' lang='en'>
                <Form.Label>الرقم القومى</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='number'
                  name='nationalityId-p'
                  value={personalInfo.nationalityId}
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
                  name='birthdateSource-p'
                  value={personalInfo.birthdateSource}
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
                  name='idS-p'
                  value={personalInfo.idS}
                  onChange={handleChange}
                  disabled
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الرقم الكودى بالطريقة الصحيحة(أرقام فقط).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='email' dir='ltr' lang='en'>
                <Form.Label>البريد الإلكترونى</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='email'
                  name='email-p'
                  value={personalInfo.email}
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
                  name='Add-p'
                  value={personalInfo.Add}
                  onChange={handleChange}
                  pattern='^[\u0621-\u064A-0-9 ]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل العنوان بالطريقة الصحيحة.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='phoneNum' dir='ltr' lang='en'>
                <Form.Label>رقم الهاتف</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='text'
                  name='mobile-p'
                  value={personalInfo.mobile}
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
                  name='jobArabic-p'
                  value={personalInfo.jobArabic}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الوظيفة باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} xs={6}>
              <Form.Group controlId='enJob' dir='ltr' lang='en'>
                <Form.Label>الوظيفة باللغة الإنجليزية</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='text'
                  name='jobEnglish-p'
                  value={personalInfo.jobEnglish}
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
                  name='jobAdd-p'
                  value={personalInfo.jobAdd}
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
