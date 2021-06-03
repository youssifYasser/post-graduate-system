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
import isEqual from 'lodash/isEqual'

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

  const [allRefs, setAllRefs] = useState([])
  const [allSups, setAllSups] = useState([])
  const [student, setStudent] = useState({})
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
    let lastID
    if (page === 2) {
      lastID =
        uniDegrees.length !== 0 ? uniDegrees[uniDegrees.length - 1].id : 0
      setUniDegrees([
        ...uniDegrees,
        {
          id: lastID + 1,
          new: true,
          degree: '',
          dateObtained: '',
          specialization: '',
          faculty: '',
          university: '',
        },
      ])
      // setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 4) {
      lastID =
        studentSups.length !== 0
          ? studentSups[studentSups.length - 1].idSupervisor
          : 0
      setStudentSups([
        ...studentSups,
        {
          idSupervisor: lastID + 1,
          new: true,
          arabicName: '',
          specialization: '',
          registrationDate: '',
          cancelationDate: '',
          currentState: '',
        },
      ])
      // setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 5) {
      lastID =
        studentRefs.length !== 0
          ? studentRefs[studentRefs.length - 1].idRefereed
          : 0
      setStudentRefs([
        ...studentRefs,
        {
          idRefereed: lastID + 1,
          new: true,
          arabicName: '',
          specialization: '',
          URLReport: '',
          reportState: '',
          dateReport: '',
        },
      ])
      // setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 6) {
      lastID =
        studentReports.length !== 0
          ? studentReports[studentReports.length - 1].idState
          : 0
      setStudentReports([
        ...studentReports,
        {
          idState: lastID + 1,
          new: true,
          status: '',
          startDate: '',
          fileURL: '',
        },
      ])
      // setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 7) {
      lastID =
        studentExcuses.length !== 0
          ? studentExcuses[studentExcuses.length - 1].idExcuse
          : 0
      setStudentExcuses([
        ...studentExcuses,
        {
          idExcuse: lastID + 1,
          new: true,
          excuseDate: '',
          cancelDate: '',
          submittedDocURL: '',
          extendedPeriodDocURL: '',
          content: '',
          numberMonthExtendedPeriod: '',
        },
      ])
      // setUniDegreesNum(uniDegreesNum + 1)
    } else if (page === 8) {
      lastID =
        studentPayments.length !== 0
          ? studentPayments[studentPayments.length - 1].idPayment
          : 0
      setStudentPayments([
        ...studentPayments,
        {
          idPayment: lastID + 1,
          new: true,
          paymentDate: '',
          receiptNumber: '',
          amountPaid: '',
          forYear: '',
          URLImage: '',
        },
      ])
      // setUniDegreesNum(uniDegreesNum + 1)
    }
  }

  const deleteItem = (deletedId) => {
    if (page === 2) {
      Swal.fire({
        icon: 'warning',
        title: 'هل أنت متأكد من إزالة هذه الدراسة؟',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `نعم ، امسح الدراسة`,
        cancelButtonText: 'لا ، عودة',
        cancelButtonColor: '#2f3944',
        denyButtonColor: '#be0707',
      }).then((result) => {
        if (result.isDenied) {
          setUniDegrees([
            ...uniDegrees.filter((deg) => {
              return deg.id !== deletedId
            }),
          ])

          const deleteStateAPI = {
            url: `http://localhost:8000/api/deletepreviousstudy/${deletedId}`,
            method: 'delete',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
            },
          }
          axios(deleteStateAPI)
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'تمت إزالة الدراسة بنجاح',
                showConfirmButton: false,
                timer: 1500,
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    } else if (page === 4) {
      Swal.fire({
        icon: 'warning',
        title: 'هل أنت متأكد من إزالة المشرف من هذه الدراسة؟',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `نعم ، امسح المشرف`,
        cancelButtonText: 'لا ، عودة',
        cancelButtonColor: '#2f3944',
        denyButtonColor: '#be0707',
      }).then((result) => {
        if (result.isDenied) {
          setStudentSups([
            ...studentSups.filter((sup) => {
              return sup.idSupervisor !== deletedId
            }),
          ])
          const deleteSupervisorAPI = {
            url: `http://localhost:8000/api/deletesupervisorfromregister/${deletedId}`,
            data: JSON.stringify({
              idRegistration: editStudent.register.idRegistration,
            }),
            method: 'delete',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
            },
          }
          axios(deleteSupervisorAPI)
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'تمت إزالة المشرف من هذه الدراسة بنجاح',
                showConfirmButton: false,
                timer: 1500,
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    } else if (page === 5) {
      Swal.fire({
        icon: 'warning',
        title: 'هل أنت متأكد من إزالة المحكم من هذه الدراسة؟',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `نعم ، امسح المحكم`,
        cancelButtonText: 'لا ، عودة',
        cancelButtonColor: '#2f3944',
        denyButtonColor: '#be0707',
      }).then((result) => {
        if (result.isDenied) {
          setStudentRefs([
            ...studentRefs.filter((ref) => {
              return ref.idRefereed !== deletedId
            }),
          ])

          const deleteRefereeAPI = {
            url: `http://localhost:8000/api/deleterefreefromregister/${deletedId}`,
            data: JSON.stringify({
              idRegistration: editStudent.register.idRegistration,
            }),
            method: 'delete',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
            },
          }
          axios(deleteRefereeAPI)
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'تمت إزالة المحكم من هذه الدراسة بنجاح',
                showConfirmButton: false,
                timer: 1500,
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    } else if (page === 6) {
      Swal.fire({
        icon: 'warning',
        title: 'هل أنت متأكد من إزالة هذا التقرير من هذه الدراسة؟',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `نعم ، امسح التقرير`,
        cancelButtonText: 'لا ، عودة',
        cancelButtonColor: '#2f3944',
        denyButtonColor: '#be0707',
      }).then((result) => {
        if (result.isDenied) {
          setStudentReports([
            ...studentReports.filter((rep) => {
              return rep.idState !== deletedId
            }),
          ])

          const deleteStateAPI = {
            url: `http://localhost:8000/api/deletestate/${deletedId}`,
            method: 'delete',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
            },
          }
          axios(deleteStateAPI)
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'تمت إزالة التقرير من هذه الدراسة بنجاح',
                showConfirmButton: false,
                timer: 1500,
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    } else if (page === 7) {
      Swal.fire({
        icon: 'warning',
        title: 'هل أنت متأكد من إزالة العذر من هذه الدراسة؟',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `نعم ، امسح العذر`,
        cancelButtonText: 'لا ، عودة',
        cancelButtonColor: '#2f3944',
        denyButtonColor: '#be0707',
      }).then((result) => {
        if (result.isDenied) {
          setStudentExcuses([
            ...studentExcuses.filter((exc) => {
              return exc.idExcuse !== deletedId
            }),
          ])

          const deleteExcuseAPI = {
            url: `http://localhost:8000/api/deleteexcuse/${deletedId}`,
            method: 'delete',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
            },
          }
          axios(deleteExcuseAPI)
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'تمت إزالة العذر من هذه الدراسة بنجاح',
                showConfirmButton: false,
                timer: 1500,
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    } else if (page === 8) {
      Swal.fire({
        icon: 'warning',
        title: 'هل أنت متأكد من إزالة الإيصال من هذه الدراسة؟',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `نعم ، امسح الإيصال`,
        cancelButtonText: 'لا ، عودة',
        cancelButtonColor: '#2f3944',
        denyButtonColor: '#be0707',
      }).then((result) => {
        if (result.isDenied) {
          setStudentPayments([
            ...studentPayments.filter((pay) => {
              return pay.idPayment !== deletedId
            }),
          ])

          const deletePaymentAPI = {
            url: `http://localhost:8000/api/deletepayment/${deletedId}`,
            method: 'delete',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
            },
          }
          axios(deletePaymentAPI)
            .then((response) => {
              Swal.fire({
                icon: 'success',
                title: 'تمت إزالة الإيصال من هذه الدراسة بنجاح',
                showConfirmButton: false,
                timer: 1500,
              })
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }
  }

  const handleChange = (e) => {
    setShowSave(true)
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
      if (name === 'arabicName') {
        const spec = allSups.filter((sup) => {
          if (sup.idSupervisor === parseInt(value)) {
            return sup
          }
        })
        studentSups[index] = {
          ...studentSups[index],
          ['specialization']: spec[0]['specialization'],
          ['idSupervisor']: spec[0]['idSupervisor'],
        }
      }
      studentSups[index] = { ...studentSups[index], [name]: value }
      setStudentSups([...studentSups])
    } else if (compIndex === 'r') {
      indexOfDash = name.lastIndexOf('-')
      let index = name.slice(indexOfDash + 1)
      name = name.slice(0, indexOfDash)
      if (name === 'arabicName') {
        const spec = allRefs.filter((ref) => {
          if (ref.idRefereed === parseInt(value)) {
            return ref
          }
        })
        studentRefs[index] = {
          ...studentRefs[index],
          ['specialization']: spec[0]['specialization'],
          ['idRefereed']: spec[0]['idRefereed'],
        }
      }
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
      setValidated(true)

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
              url: `http://localhost:8000/api/student/${personalInfo.idS}`,
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

            // console.log({
            //   ...thesisData,
            //   idS: personalInfo.idS,
            // })
            const thesisDataAPI = {
              url: 'http://localhost:8000/api/registrations',
              method: 'post',
              data: JSON.stringify({
                ...thesisData,
                idS: personalInfo.idS,
              }),
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
                  url: `http://localhost:8000/api/previousstudy/${personalInfo.idS}`,
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
          } else if (isEditing) {
            console.log({
              idRegistration: thesisData.idRegistration,
              supervisours: studentSups,
            })

            //supervisors
            const updateSupervisor = {
              url: `http://localhost:8000/api/addsupervisourtoregister`,
              method: 'post',
              data: JSON.stringify({
                idRegistration: thesisData.idRegistration,
                supervisours: studentSups,
              }),
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
              },
            }
            axios(updateSupervisor)
              .then((response) => {
                console.log(response)
                // setCopySupervisors([...copySupervisors])
                // set([...copySupervisors])
                setTimeout(() => {
                  // setIsEditing(false)
                  setShowSave(false)
                  // window.location.href =
                  //   window.location.pathname +
                  //   window.location.search +
                  //   window.location.hash
                }, 1100)
              })
              .catch((err) => {
                console.log(err)
              })

            //reports
            if (studentReports.length !== 0) {
              let newReports = []
              for (let i = 0; i < studentReports.length; i++) {
                if (studentReports[i].new) {
                  newReports.push(studentReports[i])
                  studentReports.splice(i, 1)
                  i = i - 1
                }
              }
              console.log(newReports)

              let updateReports = []
              for (let i = 0; i < studentReports.length; i++) {
                if (!isEqual(editStudent['state'][i], studentReports[i])) {
                  studentReports[i] = {
                    ...studentReports[i],
                    ['idRegistration']: thesisData.idRegistration,
                  }
                  updateReports.push(studentReports[i])
                }
              }

              console.log(updateReports)

              for (let i = 0; i < updateReports.length; i++) {
                console.log('hi')
                const updateReportsAPI = {
                  url: 'http://localhost:8000/api/updatestate',
                  method: 'put',
                  data: JSON.stringify(updateReports[i]),
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                  },
                }
                axios(updateReportsAPI)
                  .then((response) => {
                    copyStudents[editIndex]['state'] = [...studentReports]
                    setCopyStudents([...copyStudents])
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }

              const addReportAPI = {
                url: `http://localhost:8000/api/addstate`,
                method: 'post',
                data: JSON.stringify({
                  ['idRegistration']: thesisData.idRegistration,
                  ['states']: newReports,
                }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
                },
              }
              axios(addReportAPI)
                .then((response) => {
                  setStudentReports([...studentReports, ...newReports])
                  copyStudents[editIndex]['state'] = [
                    ...studentReports,
                    ...newReports,
                  ]
                  setCopyStudents([...copyStudents])
                })
                .catch((err) => {
                  console.log(err)
                })
            }

            //excuses
            if (studentExcuses.length !== 0) {
              let newExcuses = []
              for (let i = 0; i < studentExcuses.length; i++) {
                if (studentExcuses[i].new) {
                  newExcuses.push(studentExcuses[i])
                  studentExcuses.splice(i, 1)
                  i = i - 1
                }
              }
              console.log(newExcuses)

              let updateExcuses = []
              for (let i = 0; i < studentExcuses.length; i++) {
                if (!isEqual(editStudent['excuse'][i], studentExcuses[i])) {
                  studentExcuses[i] = {
                    ...studentExcuses[i],
                    ['idRegistration']: thesisData.idRegistration,
                  }
                  updateExcuses.push(studentExcuses[i])
                }
              }

              console.log(updateExcuses)

              for (let i = 0; i < updateExcuses.length; i++) {
                console.log('hi')
                const updateExcusesAPI = {
                  url: 'http://localhost:8000/api/updateexcuse',
                  method: 'put',
                  data: JSON.stringify(updateExcuses[i]),
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                  },
                }
                axios(updateExcusesAPI)
                  .then((response) => {
                    copyStudents[editIndex]['excuse'] = [...studentExcuses]
                    setCopyStudents([...copyStudents])
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }

              const addExcuseAPI = {
                url: `http://localhost:8000/api/addexcuse`,
                method: 'post',
                data: JSON.stringify({
                  ['idRegistration']: thesisData.idRegistration,
                  ['excuses']: newExcuses,
                }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
                },
              }
              axios(addExcuseAPI)
                .then((response) => {
                  setStudentExcuses([...studentExcuses, ...newExcuses])
                  copyStudents[editIndex]['excuse'] = [
                    ...studentExcuses,
                    ...newExcuses,
                  ]
                  setCopyStudents([...copyStudents])
                })
                .catch((err) => {
                  console.log(err)
                })
            }

            //payments
            if (studentPayments.length !== 0) {
              let newPayments = []
              for (let i = 0; i < studentPayments.length; i++) {
                if (studentPayments[i].new) {
                  newPayments.push(studentPayments[i])
                  studentPayments.splice(i, 1)
                  i = i - 1
                }
              }
              console.log(newPayments)

              let updatePayments = []
              for (let i = 0; i < studentPayments.length; i++) {
                if (!isEqual(editStudent['payment'][i], studentPayments[i])) {
                  studentPayments[i] = {
                    ...studentPayments[i],
                    ['idRegistration']: thesisData.idRegistration,
                  }
                  updatePayments.push(studentPayments[i])
                }
              }

              console.log(updatePayments)

              for (let i = 0; i < updatePayments.length; i++) {
                console.log('hi')
                const updatePaymentsAPI = {
                  url: 'http://localhost:8000/api/updatepayment',
                  method: 'put',
                  data: JSON.stringify(updatePayments[i]),
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                  },
                }
                axios(updatePaymentsAPI)
                  .then((response) => {
                    copyStudents[editIndex]['payment'] = [...studentPayments]
                    setCopyStudents([...copyStudents])
                  })
                  .catch((err) => {
                    console.log(err)
                  })
              }

              const addPaymentAPI = {
                url: `http://localhost:8000/api/addpayment`,
                method: 'post',
                data: JSON.stringify({
                  ['idRegistration']: thesisData.idRegistration,
                  ['payments']: newPayments,
                }),
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8',
                },
              }
              axios(addPaymentAPI)
                .then((response) => {
                  setStudentExcuses([...studentPayments, ...newPayments])
                  copyStudents[editIndex]['payment'] = [
                    ...studentPayments,
                    ...newPayments,
                  ]
                  setCopyStudents([...copyStudents])
                })
                .catch((err) => {
                  console.log(err)
                })

              //previous Studies

              if (uniDegrees.length !== 0) {
                let newDegrees = []
                for (let i = 0; i < uniDegrees.length; i++) {
                  if (uniDegrees[i].new) {
                    newDegrees.push(uniDegrees[i])
                    uniDegrees.splice(i, 1)
                    i = i - 1
                  }
                }
                console.log(newDegrees)

                let updateDegrees = []
                for (let i = 0; i < uniDegrees.length; i++) {
                  if (
                    !isEqual(editStudent['previousstudie'][i], uniDegrees[i])
                  ) {
                    uniDegrees[i] = {
                      ...uniDegrees[i],
                    }
                    updateDegrees.push(uniDegrees[i])
                  }
                }

                console.log(updateDegrees)

                for (let i = 0; i < updateDegrees.length; i++) {
                  console.log('hi')
                  const updateDegreesAPI = {
                    url: `http://localhost:8000/api/updatepreviousstudy/${updateDegrees[i].id}`,
                    method: 'put',
                    data: JSON.stringify(updateDegrees[i]),
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json;charset=UTF-8',
                    },
                  }
                  axios(updateDegreesAPI)
                    .then((response) => {
                      copyStudents[editIndex]['previousstudie'] = [
                        ...uniDegrees,
                      ]
                      setCopyStudents([...copyStudents])
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                }
                for (let i = 0; i < newDegrees.length; i++) {
                  const addDegreeAPI = {
                    url: `http://localhost:8000/api/previousstudy/${personalInfo.idS}`,
                    method: 'post',
                    data: JSON.stringify({
                      ['degree']: newDegrees[i].degree,
                      ['faculty']: newDegrees[i].faculty,
                      ['university']: newDegrees[i].university,
                      ['dateObtained']: newDegrees[i].dateObtained,
                      ['specialization']: newDegrees[i].specialization,
                    }),
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json;charset=UTF-8',
                    },
                  }
                  axios(addDegreeAPI)
                    .then((response) => {
                      setUniDegrees([...uniDegrees, ...newDegrees])
                      copyStudents[editIndex]['previousstudie'] = [
                        ...uniDegrees,
                        ...newDegrees,
                      ]
                      setCopyStudents([...copyStudents])
                    })
                    .catch((err) => {
                      console.log(err)
                    })
                }
              }
              setTimeout(() => {
                window.location.href =
                  window.location.pathname +
                  window.location.search +
                  window.location.hash
                setIsEditing(false)
                setValidated(false)
                setShowSave(false)
              }, 2000)
            }
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
          setPersonalInfo({})
          setUniDegrees({})
          setThesisData({})
          setPage(1)
        }
      })
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
    console.log(data)
    let newData = []
    for (let i = 0; i < data.length; i++) {
      newData.push({
        ['الرقم الكودي']: data[i]['personalInfo'].idS,
        ['الصورة الشخصية']: data[i]['personalInfo'].image,
        ['الاسم باللغة العربية']: data[i]['personalInfo'].arabicName,
        ['الاسم باللغة الإنجليزية']: data[i]['personalInfo'].englishName,
        ['تاريخ الميلاد']: data[i]['personalInfo'].birthdate,
        ['الجنس']: data[i]['personalInfo'].gender,
        ['دولة الجنسية']: data[i]['personalInfo'].nationality,
        ['الرقم القومي']: data[i]['personalInfo'].nationalityId,
        ['مصدر شهادة الميلاد']: data[i]['personalInfo'].birthdateSource,
        ['العنوان']: data[i]['personalInfo'].Add,
        ['رقم الهاتف']: data[i]['personalInfo'].mobile,
        ['البريد الإلكتروني']: data[i]['personalInfo'].email,
        ['الوظيفة باللغة العربية']: data[i]['personalInfo'].jobArabic,
        ['الوظيفة باللغة الإنجليزية']: data[i]['personalInfo'].jobEnglish,
        ['عنوان الوظيفة']: data[i]['personalInfo'].jobAdd,
      })

      for (let j = 0; j < data[i]['uniDegrees'].length; j++) {
        newData[i] = {
          ...newData[i],
          [`الدرجة  العلمية ${j + 1}`]: data[i]['uniDegrees'][j].degree,
          [`التخصص ${j + 1}`]: data[i]['uniDegrees'][j].specialization,
          [`تاريخ الحصول عليها ${j + 1}`]:
            data[i]['uniDegrees'][j].dateObtained,
          [`الكلية التي حصل الطالب على الدرجة العلمية منها ${j + 1}`]:
            data[i]['uniDegrees'][j].faculty,
          [`الجامعة التي حصل الطالب على الدرجة العلمية منها ${j + 1}`]:
            data[i]['uniDegrees'][j].university,
        }
      }

      newData[i] = {
        ...newData[i],
        ['نوع الدراسة']: data[i]['thesisData'].type,
        ['درجة امتحان التويفل - TOEFL']: data[i]['thesisData'].toeflGrade,
        ['القسم التابعة له هذه الرسالة']: data[i]['thesisData'].departName,
      }
      if (
        data[i]['thesisData']['type'] === 'الماجستير في العلوم' ||
        data[i]['thesisData']['type'] === 'دكتوراه الفلسفة في العلوم'
      ) {
        newData[i] = {
          ...newData[i],
          ['التخصص التابعة له هذه الرسالة']: data[i]['thesisData'].spec,
          ['عنوان الرسالة باللغة العربية']: data[i]['thesisData'].arabicTitle,
          ['عنوان الرسالة باللغة الإنجليزية']:
            data[i]['thesisData'].englishTitle,
        }
      } else if (
        data[i]['thesisData'].type === 'دبلومة الدراسات العليا' ||
        data[i]['thesisData'].type === 'تمهيدي الماجستير'
      ) {
        newData[i] = {
          ...newData[i],
          ['عنوان الدبلومة']: data[i]['thesisData'].arabicTitle,
        }
      }
    }
    console.log(newData)
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(newData)
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

    const supervisorsAPI = {
      url: 'http://localhost:8000/api/supervisors',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(supervisorsAPI)
      .then((response) => {
        setAllSups([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })

    const getReferees = {
      url: 'http://localhost:8000/api/getreferees',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(getReferees)
      .then((response) => {
        setAllRefs([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })

    setTimeout(() => {
      console.log(allSups)
    }, 500)
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
        setStudent({ ...studentObj })
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
                isEditing={isEditing}
              />
            </Tab>
            <Tab eventKey='2' title='الدرجات الجامعية'>
              <UniversityDegrees
                uniDegrees={uniDegrees}
                setUniDegrees={setUniDegrees}
                byExcel={byExcel}
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
                  allSups={allSups}
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
                  allRefs={allRefs}
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
            {byExcel ||
              (page >= 2 && page !== 3 && (
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
              ))}
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
                    مسح الطالب
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
            {byExcel && (
              <Col className='btn-col'>
                <Button
                  size='lg'
                  type='button'
                  className={`btns ${byExcel && 'excel-btns'} cancel-btn`}
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

                        setPersonalInfo({})
                        setUniDegrees([])
                        setThesisData({})
                        setCanceledStudents([...canceledStudents, student])
                        setStudentNumber(studentNumber + 1)
                        setPage(1)
                        setTimeout(() => {
                          document.documentElement.scrollTop = 0
                        }, 1700)
                      } else if (result.isDenied) {
                        const deleteStudentAPI = {
                          url: `http://localhost:8000/api/deletestudent/${personalInfo.idS}`,
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
                            setPersonalInfo({})
                            setUniDegrees({})
                            setThesisData({})
                            setStudentNumber(studentNumber + 1)
                            setPage(1)
                            setTimeout(() => {
                              document.documentElement.scrollTop = 0
                            }, 1700)
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
