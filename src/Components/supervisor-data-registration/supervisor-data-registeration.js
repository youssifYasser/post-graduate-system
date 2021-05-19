import React, { useState, useEffect } from 'react'
import { Container, Form, Col, Row, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import { TiUserAdd } from 'react-icons/ti'

import { countries } from './countries'
import './supervisor-data-registeration.css'

const SupervisorDataRegisteration = ({
  byExcel,
  supervisors,
  supervisorObj,
  setSupervisorNumber,
  supervisorNumber,
  setShowUpload,
}) => {
  const [validated, setValidated] = useState(false)
  const [departments, setDepartments] = useState([])
  const [universityPositions, setUniversityPositions] = useState([])
  const [supervisor, setSupervisor] = useState({
    arabicName: '',
    englishName: '',
    nationalityId: '',
    gender: '',
    nationality: '',
    sciDegree: '',
    idDegreeF: '',
    specialization: '',
    department: '',
    faculty: '',
    university: '',
    email: '',
    mobile: '',
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    type === 'checkbox'
      ? setSupervisor({ ...supervisor, [name]: checked })
      : setSupervisor({ ...supervisor, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ',
        text: '.من فضلك راجع البيانات',
        confirmButtonText: 'حسنــاً',
        confirmButtonColor: '#2f3944',
      }).then((result) => {
        if (result.isConfirmed) {
          setTimeout(() => {
            const element =
              document.getElementsByClassName('invalid-feedback')[0]
            const offset = 100
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = element.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            })
          }, 300)
        }
      })
    } else {
      setValidated(true)
      Swal.fire({
        icon: 'info',
        title: 'هل أنت متأكد من تسجيل بيانات المشرف؟',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#01ad01',
        confirmButtonText: 'نعم ، سجل',
        cancelButtonText: 'لا ، عودة',
        cancelButtonColor: '#2f3944',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'تم تسجيل بيانات المشرف بنجاح',
            showConfirmButton: false,
            timer: 1500,
          })
          setValidated(false)
          for (const position of universityPositions) {
            if (supervisor.sciDegree === position.arabicDegreeName) {
              supervisor.idDegreeF = position.idUniversityPosition
              break
            }
          }

          if (byExcel) {
            const updateSupervisor = {
              url: `http://localhost:8000/api/supervisors/${supervisor.idSupervisor}`,
              method: 'put',
              data: JSON.stringify(supervisor),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
              },
            }
            axios(updateSupervisor)
              .then((response) => {
                setTimeout(() => {
                  document.documentElement.scrollTop = 0
                  setSupervisorNumber(supervisorNumber + 1)
                }, 1500)
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            // console.log(JSON.stringify(supervisor))
            const registerSupervisor = {
              url: 'http://localhost:8000/api/supervisors',
              method: 'post',
              data: JSON.stringify(supervisor),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
              },
            }
            axios(registerSupervisor)
              .then((response) => {
                setTimeout(() => {
                  document.documentElement.scrollTop = 0
                  setSupervisor({
                    arabicName: '',
                    englishName: '',
                    nationalityId: '',
                    email: '',
                    position: '',
                    university: '',
                    faculty: '',
                    sciDegree: '',
                    idDegreeF: '',
                    department: '',
                    nationality: '',
                    specialization: '',
                    gender: '',
                    mobile: '',
                  })
                }, 1500)
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
      })
    }
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
        setDepartments([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })

    const universityPositionsAPI = {
      url: 'http://localhost:8000/api/universityPositions',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(universityPositionsAPI)
      .then((response) => {
        setUniversityPositions([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    // console.log(supervisorObj)
    if (byExcel) {
      if (supervisorNumber >= supervisors.length && supervisors.length !== 0) {
        setSupervisorNumber(0)
        setShowUpload(true)
      } else {
        setSupervisor({ ...supervisorObj })
      }
    }
  }, [supervisorNumber])

  return (
    <Container className='supervisor-reg'>
      <div className='main-form'>
        <Row>
          <Col className='header'>
            <h1>تسجيل بيانات المشرف</h1>
          </Col>
        </Row>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <section className='section'>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>الاسم باللغة العربية</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='arabicName'
                    value={supervisor.arabicName}
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل الاسم باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>الاسم باللغة الإنجليزية</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='englishName'
                    value={supervisor.englishName}
                    onChange={handleChange}
                    pattern='^[a-zA-Z ]+$'
                    dir='ltr'
                    lang='en'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل الاسم باللغة الإنجليزية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>الرقم القومى</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='number'
                    name='nationalityId'
                    value={supervisor.nationalityId}
                    onChange={handleChange}
                    dir='ltr'
                    lang='en'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل الرقم القومى بالطريقة الصحيحية (أرقام فقط).
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Row>
                  <Col className='gender-col'>
                    <Form.Group>
                      <Form.Label>الجنس</Form.Label>
                      <div className='gender'>
                        <Form.Check
                          inline
                          type='radio'
                          label='ذكر'
                          value='ذكر'
                          name='gender'
                          className='form-check-male'
                          checked={supervisor.gender === 'ذكر'}
                          onChange={handleChange}
                        />
                        <Form.Check
                          inline
                          type='radio'
                          value='أنثى'
                          label='أنثى'
                          name='gender'
                          className='form-check-female'
                          checked={supervisor.gender === 'أنثى'}
                          onChange={handleChange}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col className='nation-col'>
                    <Form.Group>
                      <Form.Label>الجنسية</Form.Label>
                      <Form.Control
                        className='form-input'
                        as='select'
                        name='nationality'
                        value={supervisor.nationality}
                        onChange={handleChange}
                        pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                        custom
                        required
                      >
                        <option value=''>اختر الجنسية</option>
                        {countries.map((country, index) => {
                          return (
                            <option key={index} value={country}>
                              {country}
                            </option>
                          )
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Form.Row>
          </section>
          <section className='section'>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>الدرجة العلمية</Form.Label>
                  <Form.Control
                    className='form-input'
                    as='select'
                    name='sciDegree'
                    value={supervisor.sciDegree}
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    custom
                    required
                  >
                    <option value=''>اختر الدرجة العلمية</option>
                    {universityPositions.map((position) => {
                      return (
                        <option
                          key={position.idUniversityPosition}
                          value={position.arabicDegreeName}
                        >
                          {position.arabicDegreeName}
                        </option>
                      )
                    })}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>التخصص</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='specialization'
                    value={supervisor.specialization}
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل التخصص باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>القسم الذي به المشرف</Form.Label>
                  <Form.Control
                    className='form-input'
                    as='select'
                    name='department'
                    value={supervisor.department}
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    custom
                  >
                    <option value=''>اختر القسم</option>
                    {departments.map((dept) => {
                      return (
                        <option key={dept.idDept} value={dept.arabicName}>
                          {dept.arabicName}
                        </option>
                      )
                    })}
                  </Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل ألقسم باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>الكلية التي بها المشرف</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='faculty'
                    value={supervisor.faculty}
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل الكلية باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>الجامعة التي بها المشرف</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='university'
                    value={supervisor.university}
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل الجامعة باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              {byExcel && (
                <Col>
                  <Form.Group>
                    <Form.Label>
                      الرقم الكودي - الرقم المرسل في رسالة البريد الإلكتروني
                    </Form.Label>
                    <Form.Control
                      className='form-input'
                      type='text'
                      name='idSupervisor'
                      value={supervisor.idSupervisor}
                      onChange={handleChange}
                      pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                      required
                      disabled
                    />
                  </Form.Group>
                </Col>
              )}
            </Form.Row>
          </section>
          <section className='section'>
            <Form.Row>
              <Col>
                <Form.Group>
                  <Form.Label>البريد الإلكترونى</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='email'
                    name='email'
                    value={supervisor.email}
                    onChange={handleChange}
                    pattern='^[a-zA-Z0-9$@$!%*?&#^-_. +]+$'
                    dir='ltr'
                    lang='en'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل البريد الإلكترونى بالطريقة الصحيحة
                    (example@mail.com).
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>رقم الهاتف</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='mobile'
                    value={supervisor.mobile}
                    onChange={handleChange}
                    dir='ltr'
                    lang='en'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل رقم الهاتف بالطريقة الصحيحة(أرقام فقط).
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
          </section>
          <Form.Row>
            <Col className='btn-col'>
              <Button type='submit' className='submit-btn'>
                تسجيل
                <TiUserAdd className='btn-submit' />
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </div>
    </Container>
  )
}

export default SupervisorDataRegisteration
