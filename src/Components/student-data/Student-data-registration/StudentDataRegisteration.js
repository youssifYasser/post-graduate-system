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
  isEditing,
  setIsEditing,
  editIndex,
  editStudent,
  setShowSave,
  showSave,
  copyStudents,
  setCopyStudents,
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
    type: '',
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
  const [file, setFile] = useState({})
  const [btnRefText, setBtnRefText] = useState('ارفع الملف')
  const [btnRepText, setBtnRepText] = useState('ارفع الملف')
  const [btnEx1Text, setBtnEx1Text] = useState('ارفع الملف')
  const [btnEx2Text, setBtnEx2Text] = useState('ارفع الملف')
  const [btnPText, setBtnPText] = useState('ارفع الملف')

  useEffect(() => {
    console.log(file)
  }, [file])

  async function sendEmail() {
    const { value: studyType } = await Swal.fire({
      title: 'اختر نوع الدراسة',
      input: 'select',
      confirmButtonColor: '#2f3944',
      inputOptions: {
        'اختر نوع دراسة': 'اختر نوع دراسة',
        'دبلومة الدراسات العليا': 'دبلومة الدراسات العليا',
        'تمهيدي الماجستير': 'تمهيدي الماجستير',
        'الماجستير في العلوم': 'الماجستير في العلوم',
        'دكتوراه الفلسفة في العلوم': 'دكتوراه الفلسفة في العلوم',
      },
      // inputPlaceholder: 'اختر نوع دراسة',
      showCancelButton: true,

      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value !== 'اختر نوع دراسة') {
            console.log(resolve())
          } else {
            resolve('برجاء اختيار نوع الدراسة')
          }
        })
      },
    })

    if (studyType) {
      console.log(
        JSON.stringify({
          ['study_type']: studyType,
          ['arabicName']: editStudent['personal'].arabicName,
          ['email']: editStudent['personal'].email,
          ['idS']: editStudent['personal'].idS,
        })
      )
      const sendEmailAPI = {
        url: 'http://localhost:8000/api/sendmail',
        method: 'post',
        data: JSON.stringify({
          ['study_type']: studyType,
          ['arabicName']: editStudent['personal'].arabicName,
          ['email']: editStudent['personal'].email,
          ['idS']: editStudent['personal'].idS,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
      axios(sendEmailAPI)
        .then((response) => {
          console.log(response)
          Swal.fire(`تم ارسال البريد الإلكتروني`)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleUpload = (e) => {
    setFile(e.target.files[0])
    let btn = e.target.files[0].name
    let dot = btn.lastIndexOf('.')
    let btnn = btn.slice(0, dot)
    let ext = btn.slice(dot)
    if (page === 5) {
      let btnnn = btnn.length <= 12 ? btnn : btnn.slice(0, 10) + '..'
      setBtnRefText(btnnn + ext)
      e.target.value = ''
    } else if (page === 6) {
      let btnnn = btnn.length <= 27 ? btnn : btnn.slice(0, 25) + '..'
      setBtnRepText(btnnn + ext)
      e.target.value = ''
    } else if (page === 7) {
      let btnnn = btnn.length <= 16 ? btnn : btnn.slice(0, 14) + '..'
      if (e.target.id === 'files1') {
        setBtnEx2Text(btnnn + ext)
      } else {
        setBtnEx1Text(btnnn + ext)
      }
      e.target.value = ''
    } else if (page === 8) {
      let btnnn = btnn.length <= 16 ? btnn : btnn.slice(0, 14) + '..'
      setBtnPText(btnnn + ext)
      e.target.value = ''
    }
  }

  const add = () => {
    if (page === 2) {
      setUniDegrees([...uniDegrees, { id: uniDegreesNum + 1 }])
      setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 4) {
      setStudentSups([...studentSups, { idSupervisor: uniDegreesNum + 1 }])
      setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 5) {
      setStudentRefs([...studentRefs, { idRefereed: uniDegreesNum + 1 }])
      setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 6) {
      setStudentReports([...studentReports, { idState: uniDegreesNum + 1 }])
      setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 7) {
      setStudentExcuses([...studentExcuses, { idExcuse: uniDegreesNum + 1 }])
      setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 8) {
      setStudentPayments([...studentPayments, { idPayment: uniDegreesNum + 1 }])
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
    } else if (compIndex === 's') {
      // console.log('sups')
      indexOfDash = name.lastIndexOf('-')
      let index = name.slice(indexOfDash + 1)
      name = name.slice(0, indexOfDash)
      console.log('name', name)
      console.log('value', value)
      studentSups[index] = { ...studentSups[index], [name]: value }
      setStudentSups([...studentSups])
    } else if (compIndex === 'r') {
      indexOfDash = name.lastIndexOf('-')
      let index = name.slice(indexOfDash + 1)
      name = name.slice(0, indexOfDash)
      studentRefs[index] = { ...studentRefs[index], [name]: value }
      setStudentRefs([...studentRefs])
    } else if (compIndex === 'e') {
      indexOfDash = name.lastIndexOf('-')
      let index = name.slice(indexOfDash + 1)
      name = name.slice(0, indexOfDash)
      studentExcuses[index] = { ...studentExcuses[index], [name]: value }
      setStudentExcuses([...studentExcuses])
    } else if (compIndex === 'm') {
      indexOfDash = name.lastIndexOf('-')
      let index = name.slice(indexOfDash + 1)
      name = name.slice(0, indexOfDash)
      studentPayments[index] = { ...studentPayments[index], [name]: value }
      setStudentPayments([...studentPayments])
    } else if (compIndex === 'a') {
      indexOfDash = name.lastIndexOf('-')
      let index = name.slice(indexOfDash + 1)
      name = name.slice(0, indexOfDash)
      studentReports[index] = { ...studentReports[index], [name]: value }
      setStudentReports([...studentReports])
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

  useEffect(() => {
    if (isEditing) {
      setPersonalInfo({ ...editStudent['personal'] })
      editStudent['previousstudie'] &&
        setUniDegrees([...editStudent['previousstudie']])
      editStudent['register'] && setThesisData({ ...editStudent['register'] })
      editStudent['supervisour'] &&
        setStudentSups([...editStudent['supervisour']])
      editStudent['referee'] && setStudentRefs([...editStudent['referee']])
      editStudent['excuse'] && setStudentExcuses([...editStudent['excuse']])
      editStudent['payment'] && setStudentPayments([...editStudent['payment']])
      editStudent['state'] && setStudentReports([...editStudent['state']])
    }
  }, [editIndex])

  return (
    <Container className='student-data-reg'>
      <main className='main-form'>
        <Row className={`${byExcel || 'manual-row'}`}>
          {byExcel && (
            <Col>
              <Image src={personalInfo.image} className='person-img' />
            </Col>
          )}
          <Col className={`header ${byExcel || 'manual-header'}`}>
            <h1>{isEditing ? 'تعديل' : 'تسجيل'} بيانات الطالب</h1>
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
                isEditing={isEditing}
                sendEmail={sendEmail}
              />
            </Tab>

            {isEditing && (
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
            {isEditing && (
              <Tab eventKey='5' title='المحكمين'>
                <StudentRefs
                  btnText={btnRefText}
                  handleUpload={handleUpload}
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
            {isEditing && (
              <Tab eventKey='6' title='بيان/تقرير'>
                <StudentReports
                  btnText={btnRepText}
                  handleUpload={handleUpload}
                  handleChange={handleChange}
                  studentReports={studentReports}
                  deleteItem={deleteItem}
                  // thesisData={thesisData}
                  // setThesisData={setThesisData}
                  // departments={departments}
                  // studies={studies}
                />
              </Tab>
            )}
            {isEditing && (
              <Tab eventKey='7' title='الأعذار'>
                <StudentExcuses
                  btnText1={btnEx1Text}
                  btnText2={btnEx2Text}
                  handleUpload={handleUpload}
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
            {isEditing && (
              <Tab eventKey='8' title='المصروفات'>
                <StudentPayments
                  btnText={btnPText}
                  handleUpload={handleUpload}
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

          <Form.Row className='last-row'>
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
            {isEditing && (
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
                    // onClick={() => handleDelete(supervisor.idSupervisor)}
                  >
                    مسح المشرف
                  </Button>
                </Col>

                <Col className='btn-col'>
                  <Button
                    type='button'
                    className='cancel-btn'
                    // onClick={() => handleCancel()}
                  >
                    إلغاء
                  </Button>
                </Col>
              </>
            )}
            {byExcel && !isEditing && (
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
            {page === 3 && !isEditing && (
              <Col className={`btn-col ${byExcel || page !== 1 || 'only-btn'}`}>
                <Button
                  size='lg'
                  type='submit'
                  className={`btns ${byExcel && (page === 1 || 'excel-btns')}
                     next-btn ${page === 3 && 'submit-btn'}`}
                >
                  <div>
                    تسجيل <TiUserAdd className='btn-submit' />
                  </div>
                </Button>
              </Col>
            )}
          </Form.Row>
        </Form>
      </main>
    </Container>
  )
}

export default StudentDataRegisteration
