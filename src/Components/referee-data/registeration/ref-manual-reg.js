import React, { useState, useEffect } from 'react'
import '../ref-style.css'
import { countries } from '../../student-data/Student-data-registration/countries'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { TiUserAdd } from 'react-icons/ti'
import Swal from 'sweetalert2'
import axios from 'axios'

const RefManualReg = ({
  byExcel,
  refereeObj,
  referees,
  setRefNumber,
  refNumber,
  setShowUpload,
  isEditing,
  setIsEditing,
  editIndex,
  editRef,
  handleDelete,
  handleCancel,
  setShowSave,
  showSave,
  copyRefs,
  setRefs,
}) => {
  const [degrees, setDegrees] = useState([])
  const [departments, setDepartments] = useState([])
  const [ref, setRef] = useState({
    arabicName: '',
    englishName: '',
    nationalityId: '',
    email: '',
    degree: '',
    position: '',
    university: '',
    faculty: '',
    department: '',
    nationality: '',
    specialization: '',
    gender: '',
    mobile: '',
    idRefereed: '',
    idDegreeF: '',
  })
  const [validated, setValidated] = useState(false)

  useEffect(() => {
    const universityPositionsAPI = {
      url: 'http://localhost:8000/api/uni-positions',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(universityPositionsAPI)
      .then((response) => {
        setDegrees([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })
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
  }, [])

  useEffect(() => {
    if (refereeObj) {
      for (let j = 0; j < degrees.length; j++) {
        if (refereeObj.degree === degrees[j].arabicDegreeName) {
          refereeObj = {
            ...refereeObj,
            ['idDegreeF']: degrees[j].idUniversityPosition,
          }
          break
        }
      }
      setRef({ ...refereeObj })
    }
  }, [degrees])

  useEffect(() => {
    if (byExcel) {
      if (refNumber >= referees.length && referees.length !== 0) {
        setRefNumber(0)
        setShowUpload(true)
      } else {
        setRef({ ...refereeObj })
      }
    }
  }, [refNumber])

  useEffect(() => {
    if (isEditing) {
      setRef({ ...editRef })
    }
  }, [editIndex])

  const handleChange = (e) => {
    isEditing && setShowSave(true)
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setRef({ ...ref, [name]: checked })
      isEditing &&
        (copyRefs[editIndex] = {
          ...copyRefs[editIndex],
          [name]: checked,
        })
    } else {
      setRef({ ...ref, [name]: value })
      isEditing &&
        (copyRefs[editIndex] = {
          ...copyRefs[editIndex],
          [name]: value,
        })
    }
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
        title: 'هل أنت متأكد من حفظ تسجيل بيانات المحكم؟',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#01ad01',
        confirmButtonText: 'نعم ، احفظ',
        cancelButtonText: 'لا ، عودة',
        cancelButtonColor: '#2f3944',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'تم تسجيل بيانات المحكم بنجاح',
            showConfirmButton: false,
            timer: 1500,
          })
          setValidated(false)
          if (!isEditing) {
            for (const position of degrees) {
              if (ref.degree === position.arabicDegreeName) {
                ref.idDegreeF = position.idUniversityPosition
                break
              }
            }
          }
          if (byExcel) {
            const insertRefereeExcelAPI = {
              url: `http://localhost:8000/api/updaterefress/${ref.idRefereed}`,
              method: 'put',
              data: JSON.stringify(ref),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
              },
            }
            axios(insertRefereeExcelAPI)
              .then((response) => {
                setTimeout(() => {
                  document.documentElement.scrollTop = 0
                  setRefNumber(refNumber + 1)
                }, 1100)
              })
              .catch((err) => {
                console.log(err)
              })
          } else if (isEditing) {
            const editRefereeExcelAPI = {
              url: `http://localhost:8000/api/updaterefress/${ref.idRefereed}`,
              method: 'put',
              data: JSON.stringify(ref),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
              },
            }
            axios(editRefereeExcelAPI)
              .then((response) => {
                setRefs([...copyRefs])
                setTimeout(() => {
                  // setIsEditing(false)
                  setShowSave(false)
                  window.location.href =
                    window.location.pathname +
                    window.location.search +
                    window.location.hash
                }, 1100)
              })
              .catch((err) => {
                console.log(err)
              })
          } else {
            const insertRefereeManuallyAPI = {
              url: 'http://localhost:8000/api/insertnewrefree',
              method: 'post',
              data: JSON.stringify(ref),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
              },
            }
            axios(insertRefereeManuallyAPI)
              .then((response) => {
                setTimeout(() => {
                  window.location.href =
                    window.location.pathname +
                    window.location.search +
                    window.location.hash
                }, 1100)
              })
              .catch((err) => {
                console.log(err)
              })
          }
        }
      })
    }
  }

  return (
    <Container className='ref-form' dir='rtl'>
      <Row>
        <div className='header'>
          <h1>
            {isEditing
              ? 'تعديل بيانات الـمـحـكـــم'
              : 'تسجيل بيانات الـمـحـكـــم'}
          </h1>
        </div>
      </Row>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className='main-form'
      >
        <section className='section'>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='arabicName'>
                <Form.Label>الاسم باللغة العربية</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='arabicName'
                  value={ref.arabicName}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  required
                />

                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الاسم باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='englishName' dir='ltr' lang='en'>
                <Form.Label>الاسم باللغة الإنجليزية</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='englishName'
                  value={ref.englishName}
                  onChange={handleChange}
                  pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الاسم باللغة الإنجليزية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} xs={6}>
              <Form.Group controlId='nationalityId' dir='ltr' lang='en'>
                <Form.Label>الرقم القومى</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='number'
                  name='nationalityId'
                  value={ref.nationalityId}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الرقم القومى بالطريقة الصحيحية (أرقام فقط).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Row>
                <Col xs={6} md={5} lg={5}>
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
                        checked={ref.gender === 'ذكر'}
                        onChange={handleChange}
                      />
                      <Form.Check
                        inline
                        type='radio'
                        value='أنثى'
                        label='أنثى'
                        name='gender'
                        className='form-check-female'
                        checked={ref.gender === 'أنثى'}
                        onChange={handleChange}
                      />
                    </Col>
                  </Form.Group>
                </Col>
                <Col xs={6} md={7} lg={7}>
                  <Form.Group controlId='nationality'>
                    <Form.Label>الجنسية</Form.Label>
                    <Form.Control
                      className='form-input'
                      as='select'
                      name='nationality'
                      value={ref.nationality}
                      onChange={handleChange}
                      pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                      custom
                      required
                    >
                      <option value=''>الجنسية</option>
                      {countries.map((country, index) => {
                        return (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        )
                      })}
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      من فضلك أدخل الجنسية.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Form.Row>
          {(byExcel || isEditing) && (
            <Form.Row>
              <Col md={{ span: 5, offset: 2 }} xs={6}>
                <Form.Group>
                  {byExcel ? (
                    <Form.Label>
                      الرقم الكودي - الرقم المرسل في رسالة البريد الإلكتروني
                    </Form.Label>
                  ) : (
                    <Form.Label>الرقم الكودي</Form.Label>
                  )}
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='idRefereed'
                    value={ref.idRefereed}
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    required
                    disabled
                  />
                </Form.Group>
              </Col>
            </Form.Row>
          )}
        </section>
        <section className='section'>
          <Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='degree'>
                <Form.Label>الدرجة العلمية</Form.Label>
                <Form.Control
                  className='form-input'
                  as='select'
                  name='idDegreeF'
                  value={ref.idDegreeF}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  custom
                  required
                >
                  <option value=''>الدرجة العلمية</option>
                  {degrees.map((degree) => {
                    return (
                      <option
                        key={degree.idUniversityPosition}
                        value={degree.idUniversityPosition}
                      >
                        {degree.arabicDegreeName}
                      </option>
                    )
                  })}
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الدرجة العلمية باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='specialization'>
                <Form.Label>التخصص</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='specialization'
                  value={ref.specialization}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  required
                />

                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل التخصص باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='position'>
                <Form.Label>المنصب</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='position'
                  value={ref.position}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                />

                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل المنصب باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='department'>
                <Form.Label>القسم الذي به المحكم</Form.Label>
                <Form.Control
                  className='form-input'
                  as='select'
                  name='department'
                  value={ref.department}
                  onChange={handleChange}
                  custom
                  required
                >
                  <option value=''>القسم</option>
                  {departments.map((department) => {
                    return (
                      <option
                        key={department.idDept}
                        value={department.arabicName}
                      >
                        {department.arabicName}
                      </option>
                    )
                  })}
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل القسم باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='faculty'>
                <Form.Label>الكلية التي بها المحكم</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='faculty'
                  value={ref.faculty}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  required
                />

                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الكلية باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={5} sm={6}>
              <Form.Group controlId='university'>
                <Form.Label>الجامعة التي بها المحكم</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='university'
                  value={ref.university}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  required
                />

                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الجامعة باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </section>
        <section className='section'>
          <Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='email' dir='ltr' lang='en'>
                <Form.Label>البريد الإلكترونى</Form.Label>
                <Form.Control
                  className='form-input'
                  type='email'
                  name='email'
                  value={ref.email}
                  onChange={handleChange}
                  pattern='^[a-zA-Z0-9$@$!%*?&#^-_. +]+$'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل البريد الإلكترونى بالطريقة الصحيحة
                  (example@mail.com).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='mobile' dir='ltr' lang='en'>
                <Form.Label>رقم الهاتف</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='mobile'
                  value={ref.mobile}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل رقم الهاتف بالطريقة الصحيحة(أرقام فقط).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </section>
        <Form.Row className='btns-row'>
          {!isEditing ? (
            <Col className='submit-col'>
              <Button type='submit' className='submit-btn'>
                تسجيل
                <TiUserAdd className='btn-submit' />
              </Button>
            </Col>
          ) : (
            <>
              <Col className='btn-col btn-save'>
                <Button
                  type='submit'
                  className='submit-btn'
                  disabled={!showSave}
                >
                  حفظ
                </Button>
              </Col>
              <Col className='btn-col'>
                <Button
                  type='button'
                  className='delete-btn'
                  onClick={() => handleDelete(editRef.idRefereed)}
                >
                  مسح المحكم
                </Button>
              </Col>

              <Col className='btn-col'>
                <Button
                  type='button'
                  className='cancel-btn'
                  onClick={() => handleCancel()}
                >
                  إلغاء
                </Button>
              </Col>
            </>
          )}
        </Form.Row>
      </Form>
    </Container>
  )
}

export default RefManualReg
