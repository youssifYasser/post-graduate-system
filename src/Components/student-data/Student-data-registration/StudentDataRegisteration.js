import React, { useState, useEffect } from 'react'
import {
  Col,
  Container,
  Row,
  Image,
  Form,
  Button,
  Tabs,
  Tab,
} from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import { TiUserAdd, TiUserDelete } from 'react-icons/ti'
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'
import { MdAddCircle } from 'react-icons/md'
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
import StudentPayments from './payments'
import StudentSups from './supervisors'
import { add } from 'lodash'

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
  const [uniDegreesNum, setUniDegreesNum] = useState(0)
  const [thesisData, setThesisData] = useState({
    department: '',
    requiredCourses: '',
    spec: '',
    englishTitle: '',
    arabicTitle: '',
    toeflGrade: '',
    sciDegree: '',
  })
  const [studentSups, setStudentSups] = useState([])
  const [studentRefs, setStudentRefs] = useState([])
  const [studentReports, setStudentReports] = useState([])
  const [studentExcuses, setStudentExcuses] = useState([])
  const [studentPayments, setStudentPayments] = useState([])

  const [student, setStudent] = useState([])
  const [studies, setStudies] = useState([])
  const [departments, setDepartments] = useState([])

  const [page, setPage] = useState(1)
  const [validated, setValidated] = useState(false)

  const [canceledStudents, setCanceledStudents] = useState([])

  const add = () => {
    if (page === 2) {
      setUniDegrees([...uniDegrees, { idS: uniDegreesNum + 1 }])
      setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 4) {
      setStudentSups([...studentSups, { id: uniDegreesNum + 1 }])
      setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 5) {
      setStudentRefs([...studentRefs, { id: uniDegreesNum + 1 }])
      setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 6) {
      setStudentReports([...studentReports, { id: uniDegreesNum + 1 }])
      setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 7) {
      setStudentExcuses([...studentExcuses, { id: uniDegreesNum + 1 }])
      setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 8) {
      setStudentPayments([...studentPayments, { id: uniDegreesNum + 1 }])
      setUniDegreesNum(uniDegreesNum + 1)
    }
  }

  const deleteItem = (deletedId) => {
    if (page === 2) {
      setUniDegrees([
        ...uniDegrees.filter((deg) => {
          return deg.idS !== deletedId
        }),
      ])
    } else if (page === 4) {
      setStudentSups([
        ...studentSups.filter((sup) => {
          return sup.id !== deletedId
        }),
      ])
    } else if (page === 5) {
      setStudentRefs([
        ...studentRefs.filter((ref) => {
          return ref.id !== deletedId
        }),
      ])
    } else if (page === 6) {
      setStudentReports([
        ...studentReports.filter((rep) => {
          return rep.id !== deletedId
        }),
      ])
    } else if (page === 7) {
      setStudentExcuses([
        ...studentExcuses.filter((exc) => {
          return exc.id !== deletedId
        }),
      ])
    } else if (page === 8) {
      setStudentPayments([
        ...studentPayments.filter((pay) => {
          return pay.id !== deletedId
        }),
      ])
    }
  }

  // const handleUpload = (e) => {
  //   setFile(e.target.files[0])
  //   let btn = e.target.files[0].name
  //   let dot = btn.lastIndexOf('.')
  //   let btnn = btn.slice(0, dot)
  //   let ext = btn.slice(dot)
  //   if (page === 5) {
  //     let btnnn = btnn.length <= 12 ? btnn : btnn.slice(0, 10) + '..'
  //     setBtnRefText(btnnn + ext)
  //     e.target.value = ''
  //   } else if (page === 6) {
  //     let btnnn = btnn.length <= 27 ? btnn : btnn.slice(0, 25) + '..'
  //     setBtnRepText(btnnn + ext)
  //     e.target.value = ''
  //   } else if (page === 7) {
  //     let btnnn = btnn.length <= 16 ? btnn : btnn.slice(0, 14) + '..'
  //     if (e.target.id === 'files1') {
  //       setBtnEx2Text(btnnn + ext)
  //     } else {
  //       setBtnEx1Text(btnnn + ext)
  //     }
  //     e.target.value = ''
  //   } else if (page === 8) {
  //     let btnnn = btnn.length <= 16 ? btnn : btnn.slice(0, 14) + '..'
  //     setBtnPText(btnnn + ext)
  //     e.target.value = ''
  //   }
  // }

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
          setPage(page + 1)
          document.getElementById(
            `uncontrolled-tab-tab-${page}`
          ).ariaSelected = false
          document
            .getElementById(`uncontrolled-tab-tab-${page}`)
            .classList.remove('active')
          document
            .getElementById(`uncontrolled-tab-tabpane-${page}`)
            .classList.remove('active', 'show')

          document.getElementById(
            `uncontrolled-tab-tab-${page + 1}`
          ).ariaSelected = true
          document
            .getElementById(`uncontrolled-tab-tab-${page + 1}`)
            .classList.add('active')
          document
            .getElementById(`uncontrolled-tab-tabpane-${page + 1}`)
            .classList.add('active', 'show')

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

              if (byExcel) {
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
                setStudentNumber(studentNumber + 1)
              } else {
                console.log({
                  personalInfo: { ...personalInfo },
                  uniDegrees: [...uniDegrees],
                  thesisData: { ...thesisData },
                })
                const insertStudentManuallyAPI = {
                  url: 'http://localhost:8000/api/insert-student',
                  method: 'post',
                  data: JSON.stringify({
                    personalInfo: { ...personalInfo },
                    uniDegrees: [...uniDegrees],
                    thesisData: { ...thesisData },
                  }),
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                  },
                }
                axios(insertStudentManuallyAPI)
                  .then((response) => {
                    console.log(response)
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }
              // setPersonalInfo({})
              // setUniDegrees({})
              // setThesisData({})
              // setPage(1)
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
    const studyTypesAPI = {
      url: 'http://localhost:8000/api/getallstudytype',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(studyTypesAPI)
      .then((response) => {
        setStudies([...response.data])
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
    for (let i = 0; i < studies.length; i++) {
      for (let j = 0; j < departments.length; j++) {
        if (studies[i].idDeptF === departments[j].idDept) {
          studies[i] = {
            ...studies[i],
            ['department']: departments[j].arabicName,
          }
          setStudies([...studies])
        }
      }
    }
  }, [departments])

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
        <Row className={`${byExcel || 'manual-row'}`}>
          {byExcel && (
            <Col>
              <Image src={personalInfo.image} className='person-img' />
            </Col>
          )}
          <Col className={`header ${byExcel || 'manual-header'}`}>
            <h1>تسجيل بيانات الطالب</h1>
          </Col>
        </Row>

        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Tabs
            defaultActiveKey='1'
            activeKey={page}
            id='controlled-tab'
            onSelect={(k) => setPage(parseInt(k))}
          >
            <Tab eventKey='1' title='البيانات الشخصية'>
              <PersonalData
                setPersonalInfo={setPersonalInfo}
                personalInfo={personalInfo}
                handleChange={handleChange}
                byExcel={byExcel}
              />
            </Tab>
            <Tab eventKey='2' title='الدرجات الجامعية'>
              <UniversityDegrees
                uniDegrees={uniDegrees}
                setUniDegrees={setUniDegrees}
                handleChange={handleChange}
                deleteItem={deleteItem}
              />
            </Tab>
            <Tab eventKey='3' title='بيانات الرسالة'>
              <ThesisData
                thesisData={thesisData}
                setThesisData={setThesisData}
                handleChange={handleChange}
                departments={departments}
                studies={studies}
                byExcel={byExcel}
              />
            </Tab>

            {byExcel && (
              <Tab eventKey='4' title='المشرفين'>
                <StudentSups
                  studentSups={studentSups}
                  setStudentSups={setStudentSups}
                  handleChange={handleChange}
                  deleteItem={deleteItem}
                  // departments={departments}
                  // studies={studies}
                />
              </Tab>
            )}
            {byExcel && (
              <Tab eventKey='5' title='المحكمين'>
                <StudentRefs
                  handleChange={handleChange}
                  studentRefs={studentRefs}
                  deleteItem={deleteItem}
                  // thesisData={thesisData}
                  // setThesisData={setThesisData}
                  // departments={departments}
                  // studies={studies}
                />
              </Tab>
            )}
            {byExcel && (
              <Tab eventKey='6' title='بيان/تقرير'>
                <StudentReports
                  studentReports={studentReports}
                  deleteItem={deleteItem}
                  handleChange={handleChange}
                  // thesisData={thesisData}
                  // setThesisData={setThesisData}
                  // departments={departments}
                  // studies={studies}
                />
              </Tab>
            )}
            {byExcel && (
              <Tab eventKey='7' title='الأعذار'>
                <StudentExcuses
                  handleChange={handleChange}
                  studentExcuses={studentExcuses}
                  deleteItem={deleteItem}
                  // thesisData={thesisData}
                  // setThesisData={setThesisData}
                  // departments={departments}
                  // studies={studies}
                />
              </Tab>
            )}
            {byExcel && (
              <Tab eventKey='8' title='المصروفات'>
                <StudentPayments
                  handleChange={handleChange}
                  studentPayments={studentPayments}
                  deleteItem={deleteItem}
                  // thesisData={thesisData}
                  // setThesisData={setThesisData}
                  // departments={departments}
                  // studies={studies}
                />
              </Tab>
            )}
          </Tabs>

          <Form.Row>
            {page === 1 || (
              <Col className='btn-col'>
                <Button
                  size='lg'
                  type='button'
                  className={`btns ${byExcel && 'excel-btns'}`}
                  onClick={() => {
                    document.documentElement.scrollTop = 0
                    setPage(page - 1)
                    document.getElementById(
                      `uncontrolled-tab-tab-${page}`
                    ).ariaSelected = false
                    document
                      .getElementById(`uncontrolled-tab-tab-${page}`)
                      .classList.remove('active')
                    document
                      .getElementById(`uncontrolled-tab-tabpane-${page}`)
                      .classList.remove('active', 'show')

                    document.getElementById(
                      `uncontrolled-tab-tab-${page - 1}`
                    ).ariaSelected = true
                    document
                      .getElementById(`uncontrolled-tab-tab-${page - 1}`)
                      .classList.add('active')
                    document
                      .getElementById(`uncontrolled-tab-tabpane-${page - 1}`)
                      .classList.add('active', 'show')
                  }}
                >
                  <BsFillCaretRightFill className='btn-previous' />
                  الســابق
                </Button>
              </Col>
            )}
            {page >= 2 && page !== 3 && (
              <Col className='btn-col'>
                <Button
                  size='lg'
                  type='button'
                  className={`btns ${byExcel && 'excel-btns'} add-degree`}
                  onClick={() => add()}
                >
                  {page === 2 && 'إضـافة دراسة'}
                  {page === 4 && 'إضـافة مشرف'}
                  {page === 5 && 'إضـافة محكم'}
                  {page === 6 && 'إضـافة تقرير'}
                  {page === 7 && 'إضـافة عذر'}
                  {page === 8 && 'إضـافة إيصال'}
                  <MdAddCircle className='btn-submit' />
                </Button>
              </Col>
            )}
            {byExcel && (
              <Col className='btn-col'>
                <Button
                  size='lg'
                  type='button'
                  className={`btns ${
                    byExcel && (page === 1 || 'excel-btns')
                  } cancel-btn`}
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
                            setPage(1)
                          })
                          .catch((err) => {
                            console.log(err)
                          })
                      }
                    })
                  }}
                >
                  إلغـاء الطـالب <TiUserDelete className='btn-submit' />
                </Button>
              </Col>
            )}
            <Col className={`btn-col ${byExcel || page !== 1 || 'only-btn'}`}>
              <Button
                size='lg'
                type='submit'
                className={`btns ${byExcel && (page === 1 || 'excel-btns')}
                     next-btn ${page === 3 && 'submit-btn'}`}
              >
                {page === 3 ? (
                  <div>
                    تسجيل <TiUserAdd className='btn-submit' />
                  </div>
                ) : (
                  <div>
                    التــالى <BsFillCaretLeftFill className='btn-next' />
                  </div>
                )}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </main>
    </Container>
  )
}

export default StudentDataRegisteration
