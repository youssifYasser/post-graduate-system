import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import { TiUserAdd, TiUserDelete } from 'react-icons/ti'
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

import './StudentDataRegisteration.css'
import 'animate.css/animate.min.css'

import PersonalData from './PersonalData'
import ThesisData from './ThesisData'
import UniversityDegrees from './UniversityDegrees'
import StudentRefs from './referees'
import StudentReports from './reports'
import StudentExcuses from './excuses'
import FileUpload from './FileUpload'

const StudentDataRegisteration = ({
  byExcel,
  studentObj,
  students,
  setStudentNumber,
  studentNumber,
  setShowUpload,
}) => {
  const [personalInfo, setPersonalInfo] = useState({
    image: '',
    idS: '',
    jobAdd: '',
    jobEnglish: '',
    jobArabic: '',
    email: '',
    mobile: '',
    Add: '',
    birthdateSource: '',
    nationalityId: '',
    nationality: '',
    gender: '',
    birthdate: '',
    englishName: '',
    arabicName: '',
  })
  const [uniDegrees, setUniDegrees] = useState([])
  const [thesisData, setThesisData] = useState({
    department: '',
    requiredCourses: '',
    spec: '',
    englishTitle: '',
    arabicTitle: '',
    toeflGrade: '',
    sciDegree: '',
  })

  const [student, setStudent] = useState([])

  const [page, setPage] = useState(1)
  const [validated, setValidated] = useState(false)
  const [animate, setAnimate] = useState('animate__animated animate__fadeIn')

  const [canceledStudents, setCanceledStudents] = useState([])

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target
    let indexOfDash = name.lastIndexOf('-')
    let compIndex = name.slice(indexOfDash + 1)
    name = name.slice(0, indexOfDash)
    if (compIndex === 'p') {
      type === 'checkbox'
        ? setPersonalInfo({ ...personalInfo, [name]: checked })
        : setPersonalInfo({ ...personalInfo, [name]: value })
    } else if (compIndex === 'u') {
      indexOfDash = name.lastIndexOf('-')
      let index = name.slice(indexOfDash + 1)
      name = name.slice(0, indexOfDash)
      uniDegrees[index] = { ...uniDegrees[index], [name]: value }
      setUniDegrees([...uniDegrees])
    } else if (compIndex === 't') {
      setThesisData({ ...thesisData, [name]: value })
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
            const offset = 70
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
      document.documentElement.scrollTop = 0
      setValidated(true)
      switch (page) {
        case 1:
        case 2:
          setAnimate('animate__animated animate__fadeInLeft')
          setPage(page + 1)
          break
        case 3:
          Swal.fire({
            icon: 'info',
            title: 'هل أنت متأكد من تسجيل الطالب ؟',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#01ad01',
            confirmButtonText: 'نعم ، سجل',
            cancelButtonText: 'لا ، عودة',
            cancelButtonColor: '#2f3944',
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              Swal.fire({
                icon: 'success',
                title: 'تمت إضافة الطالب بنجاح',
                showConfirmButton: false,
                timer: 1500,
              })
              // console.log(JSON.stringify(personalInfo))
              // console.log(JSON.stringify(uniDegrees))
              // console.log(JSON.stringify(thesisData))
              // console.log(uniDegrees)

              const personalInfoAPI = {
                url: `http://localhost:8000/api/student/${personalInfo.id}`,
                method: 'put',
                data: JSON.stringify(personalInfo),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
                },
              }
              axios(personalInfoAPI)
                .then((response) => {
                  console.log(response)
                })
                .catch((err) => {
                  console.log(err)
                })

              const thesisDataAPI = {
                url: 'http://localhost:8000/api/registrations',
                method: 'post',
                data: JSON.stringify({ ...thesisData, idS: personalInfo.id }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
                },
              }
              axios(thesisDataAPI)
                .then((response) => {
                  console.log(response)
                })
                .catch((err) => {
                  console.log(err)
                })

              for (let index = 0; index < uniDegrees.length; index++) {
                if (uniDegrees[index].degree) {
                  console.log(uniDegrees[index])
                  const pervStudiesAPI = {
                    url: `http://localhost:8000/api/previousstudy/${personalInfo.id}`,
                    method: 'post',
                    data: JSON.stringify(uniDegrees[index]),
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json;charset=UTF-8',
                    },
                  }
                  axios(pervStudiesAPI)
                    .then((response) => {
                      console.log(response)
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                }
              }

              setPersonalInfo({})
              setUniDegrees({})
              setThesisData({})
              setStudentNumber(studentNumber + 1)
              setAnimate('animate__animated animate__fadeIn')
              setPage(1)
            }
          })
          break
        default:
          break
      }
      setValidated(false)
    }
  }

  const s2ab = (s) => {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }

  const handleCanceledStudents = (data) => {
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(data, {
      header: [
        'الصورة الشخصية',
        'الرقم الكودي - الرقم المرسل في رسالة البريد الإلكتروني',
        'الاسم باللغة العربية',
        'الاسم باللغة الإنجليزية',
        'تاريخ الميلاد',
        'الجنس',
        'دولة الجنسية (مثال: مصر)',
        'الرقم القومي',
        'العنوان',
        'رقم الهاتف',
        'البريد الإلكتروني',
        'الوظيفة باللغة العربية',
        'الوظيفة باللغة الإنجليزية',
        'عنوان الوظيفة',
        'الدرجة  العلمية',
        'التخصص',
        'تاريخ الحصول عليها',
        'الكلية التي حصل الطالب على الدرجة العلمية منها',
        'الجامعة التي حصل الطالب على الدرجة العلمية منها',
        'الدرجة  العلمية2',
        'التخصص2',
        'تاريخ الحصول عليها2',
        'الكلية التي حصل الطالب على الدرجة العلمية منها2',
        'الجامعة التي حصل الطالب على الدرجة العلمية منها2',
        'الدرجة  العلمية3',
        'التخصص3',
        'تاريخ الحصول عليها3',
        'الكلية التي حصل الطالب على الدرجة العلمية منها3',
        'الجامعة التي حصل الطالب على الدرجة العلمية منها3',
        'تأكيد نوع التسجيل',
        'درجة امتحان التويفل - TOEFL',
        'التخصص التابعة له هذه الرسالة',
        'عنوان الرسالة باللغة العربية',
        'عنوان الرسالة بالغة الإنجليزية',
        'المقررات المطلوبة بالقسم التي لم يدرسها الطالب (إن وجدت)',
      ],
    })
    wb.SheetNames.push('الطلبة الملغيين')
    wb.Sheets['الطلبة الملغيين'] = ws
    wb.Workbook = { ['Views']: [{ RTL: true }] }
    const dat = new Date()
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
    saveAs(
      new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
      `الطلبة الملغيين ${dat.getDate()}-${
        dat.getMonth() + 1
      }-${dat.getFullYear()}.xlsx`
    )
    setCanceledStudents([])
  }

  useEffect(() => {
    if (byExcel) {
      if (studentNumber >= students.length && students.length !== 0) {
        setStudentNumber(0)
        setShowUpload(true)
        canceledStudents.length > 0 && handleCanceledStudents(canceledStudents)
      } else {
        setPersonalInfo({ ...studentObj['personalInfo'] })
        setUniDegrees([...studentObj['uniDegrees']])
        setThesisData({ ...studentObj['thesisData'] })
      }
    }
  }, [studentNumber])

  return (
    <Container key={personalInfo.idS}>
      <main className='main-form'>
        <Row>
          <Col xs={{ order: 2 }} md={{ order: 1 }}>
            <Image src={personalInfo.image} className='person-img' />
          </Col>
          <Col
            className='header'
            xs={{ order: 1, span: 9 }}
            md={{ order: 2, span: 5 }}
            lg={{ span: 5 }}
            xl={{ span: 5 }}
          >
            <h1>تسجيل بيانات الطالب</h1>
          </Col>
          <Col className='pages' xs={{ order: 3 }} md={{ order: 3 }}>
            <Row>
              <Col
                className={
                  page === 1 && 'active-page animate__animated animate__flipInX'
                }
              >
                1
              </Col>
              <Col
                className={
                  page === 2 && 'active-page animate__animated animate__flipInX'
                }
              >
                2
              </Col>
              <Col
                className={
                  page === 3 && 'active-page animate__animated animate__flipInX'
                }
              >
                3
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Row>
                {page === 1 && (
                  <StudentExcuses
                    className={animate}
                    // setPersonalInfo={setPersonalInfo}
                    // personalInfo={personalInfo}
                    handleChange={handleChange}
                  />
                )}
                {page === 2 && (
                  <UniversityDegrees
                    className={animate}
                    uniDegrees={uniDegrees}
                    setUniDegrees={setUniDegrees}
                    handleChange={handleChange}
                  />
                )}
                {page === 3 && (
                  <StudentRefs
                    className={animate}
                    // supervisors={supervisors}
                    // setSupervisors={setSupervisors}
                    handleChange={handleChange}
                  />
                )}
              </Form.Row>

              <Form.Row>
                {page === 1 || (
                  <Col className='btn-col'>
                    <Button
                      size='lg'
                      type='button'
                      className='next-btn'
                      onClick={() => {
                        document.documentElement.scrollTop = 0
                        setAnimate('animate__animated animate__fadeInRight')
                        setPage(page - 1)
                      }}
                    >
                      <BsFillCaretRightFill className='btn-previous' />
                      السابق
                    </Button>
                  </Col>
                )}
                <Col className='btn-col'>
                  <Button
                    size='lg'
                    type='button'
                    className='next-btn cancel-btn'
                    onClick={() => {
                      Swal.fire({
                        icon: 'warning',
                        title:
                          'هل تريد مسح الطالب نهائياً أم وضعه في ملف إكسل لمراجعته لاحقاً؟',
                        showConfirmButton: true,
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'ضع الطالب في ملف إكسل',
                        confirmButtonColor: '#1d6f42',
                        denyButtonText: 'امسح الطالب نهائياً',
                        cancelButtonText: 'لا ، عودة',
                        cancelButtonColor: '#2f3944',
                        denyButtonColor: '#be0707',
                      }).then((result) => {
                        /* Read more about isConfirmed, isDenied below */
                        if (result.isConfirmed) {
                          Swal.fire({
                            icon: 'success',
                            title: 'تم وضع الطالب في ملف إكسل',
                            showConfirmButton: false,
                            timer: 1500,
                          })
                          document.documentElement.scrollTop = 0
                          setPersonalInfo({})
                          setUniDegrees({})
                          setThesisData({})
                          setCanceledStudents([...canceledStudents, student])
                          setStudentNumber(studentNumber + 1)
                          setAnimate('animate__animated animate__fadeIn')
                          setPage(1)
                        } else if (result.isDenied) {
                          const deleteStudentAPI = {
                            url: `http://localhost:8000/api/deletestudent/${personalInfo.id}`,
                            method: 'delete',
                            headers: {
                              Accept: 'application/json',
                              'Content-Type': 'application/json;charset=UTF-8',
                            },
                          }
                          axios(deleteStudentAPI)
                            .then((response) => {
                              Swal.fire({
                                icon: 'success',
                                title: 'تمت إزالة الطالب نهائياً',
                                showConfirmButton: false,
                                timer: 1500,
                              })
                              document.documentElement.scrollTop = 0
                              setPersonalInfo({})
                              setUniDegrees({})
                              setThesisData({})
                              setStudentNumber(studentNumber + 1)
                              setAnimate('animate__animated animate__fadeIn')
                              setPage(1)
                            })
                            .catch((err) => {
                              console.log(err)
                            })
                        }
                      })
                    }}
                  >
                    إلغاء <TiUserDelete className='btn-submit' />
                  </Button>
                </Col>
                <Col className='btn-col'>
                  <Button
                    size='lg'
                    type='submit'
                    className={`next-btn ${page === 3 && 'submit-btn'}`}
                  >
                    {page === 3 ? (
                      <div>
                        تسجيل <TiUserAdd className='btn-submit' />
                      </div>
                    ) : (
                      <div>
                        التالى <BsFillCaretLeftFill className='btn-next' />
                      </div>
                    )}
                  </Button>
                </Col>
              </Form.Row>
            </Form>
          </Col>
        </Row>
      </main>
    </Container>
  )
}

export default StudentDataRegisteration
