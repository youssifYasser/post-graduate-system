import React, { useState, useEffect } from 'react'
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import './StudentDataRegisteration.css'
import * as XLSX from 'xlsx'
import 'animate.css/animate.min.css'
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'
import { TiUserAdd, TiUserDelete } from 'react-icons/ti'
import PersonalData from '../personal-data/PersonalData'
import ThesisData from '../thesis-data/ThesisData'
import UniversityDegrees from '../university-degrees/UniversityDegrees'
import FileUpload from '../file-upload/FileUpload'
import Swal from 'sweetalert2'
import axios from 'axios'
import { saveAs } from 'file-saver'

const StudentDataRegisteration = () => {
  const [showUpload, setShowUpload] = useState(true)
  const [students, setStudents] = useState([])

  const [personalInfo, setPersonalInfo] = useState({})
  const [uniDegrees, setUniDegrees] = useState({})
  const [thesisData, setThesisData] = useState({})

  const [page, setPage] = useState(1)
  const [studentNumber, setStudentNumber] = useState(0)
  const [validated, setValidated] = useState(false)
  const [animate, setAnimate] = useState('animate__animated animate__fadeIn')

  const [canceledStudents, setCanceledStudents] = useState([])

  const handleFile = (e) => {
    setShowUpload(true)
    const file = e.target.files[0]
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(file)
    fileReader.onload = (e) => {
      try {
        const bufferArray = e.target.result
        const wb = XLSX.read(bufferArray, { type: 'buffer' })
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        for (const item in ws) {
          if (ws[item].t === 'n') {
            delete ws[item].w
            ws[item].z = 'dd/mm/yyyy'
            XLSX.utils.format_cell(ws[item])
          }
        }
        const data = XLSX.utils.sheet_to_json(ws, {
          raw: false,
        })
        setStudents(data)
        setShowUpload(false)
      } catch (error) {
        setShowUpload(false)
        throw new Error('قم برفع ملف صحيح')
      }
    }
    fileReader.onerror = (error) => {
      throw new Error('Load error')
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
            const element = document.getElementsByClassName(
              'invalid-feedback'
            )[0]
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
                confirmButtonText: 'حسنــاً',
                confirmButtonColor: '#2f3944',
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
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
    saveAs(
      new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
      'canceledStudents.xlsx'
    )
    setCanceledStudents([])
  }

  useEffect(() => {
    if (studentNumber >= students.length && students.length !== 0) {
      setStudentNumber(0)
      setShowUpload(true)
      canceledStudents.length > 0 && handleCanceledStudents(canceledStudents)
    }
  }, [studentNumber])

  const mainForm = []
  for (const student of students) {
    const personalData = {
      image: personalInfo.image
        ? personalInfo.image
        : student['الصورة الشخصية'],
      id: personalInfo.id
        ? personalInfo.id
        : student['الرقم الكودي - الرقم المرسل في رسالة البريد الإلكتروني'],
      arabicName: personalInfo.arabicName
        ? personalInfo.arabicName
        : student['الاسم باللغة العربية'],
      englishName: personalInfo.englishName
        ? personalInfo.englishName
        : student['الاسم باللغة الإنجليزية'],
      birthdate: personalInfo.birthdate
        ? personalInfo.birthdate
        : student['تاريخ الميلاد'],
      gender: personalInfo.gender ? personalInfo.gender : student['الجنس'],
      nationality: personalInfo.nationality
        ? personalInfo.nationality
        : student['دولة الجنسية (مثال: مصر)'],
      nationalityId: personalInfo.nationalityId
        ? personalInfo.nationalityId
        : student['الرقم القومي'],
      birthdateSource: personalInfo.birthdateSource
        ? personalInfo.birthdateSource
        : student['مصدر شهادة الميلاد'] || '',
      Add: personalInfo.Add ? personalInfo.Add : student['العنوان'] || '',
      mobile: personalInfo.mobile ? personalInfo.mobile : student['رقم الهاتف'],
      email: personalInfo.email
        ? personalInfo.email
        : student['البريد الإلكتروني'],
      jobArabic: personalInfo.jobArabic
        ? personalInfo.jobArabic
        : student['الوظيفة باللغة العربية'],
      jobEnglish: personalInfo.jobEnglish
        ? personalInfo.jobEnglish
        : student['الوظيفة باللغة الإنجليزية'] || '',
      jobAdd: personalInfo.jobAdd
        ? personalInfo.jobAdd
        : student['عنوان الوظيفة'] || '',
    }

    const universityDegrees = [
      {
        degree: uniDegrees[0]
          ? uniDegrees[0].degree
          : student['الدرجة  العلمية'],
        specialization: uniDegrees[0]
          ? uniDegrees[0].specialization
          : student['التخصص'],
        dateObtained: uniDegrees[0]
          ? uniDegrees[0].dateObtained
          : student['تاريخ الحصول عليها'],
        faculty: uniDegrees[0]
          ? uniDegrees[0].faculty
          : student['الكلية التي حصل الطالب على الدرجة العلمية منها'],
        university: uniDegrees[0]
          ? uniDegrees[0].university
          : student['الجامعة التي حصل الطالب على الدرجة العلمية منها'],
      },
      {
        degree: uniDegrees[1]
          ? uniDegrees[1].degree
          : student['الدرجة  العلمية2'] || '',
        specialization: uniDegrees[1]
          ? uniDegrees[1].specialization
          : student['التخصص2'] || '',
        dateObtained: uniDegrees[1]
          ? uniDegrees[1].dateObtained
          : student['تاريخ الحصول عليها2'] || '',
        faculty: uniDegrees[1]
          ? uniDegrees[1].faculty
          : student['الكلية التي حصل الطالب على الدرجة العلمية منها2'] || '',
        university: uniDegrees[1]
          ? uniDegrees[1].university
          : student['الجامعة التي حصل الطالب على الدرجة العلمية منها2'] || '',
      },
      {
        degree: uniDegrees[2]
          ? uniDegrees[2].degree
          : student['الدرجة  العلمية3'] || '',
        specialization: uniDegrees[2]
          ? uniDegrees[2].specialization
          : student['التخصص3'] || '',
        dateObtained: uniDegrees[2]
          ? uniDegrees[2].dateObtained
          : student['تاريخ الحصول عليها3'] || '',
        faculty: uniDegrees[2]
          ? uniDegrees[2].faculty
          : student['الكلية التي حصل الطالب على الدرجة العلمية منها3'] || '',
        university: uniDegrees[2]
          ? uniDegrees[2].university
          : student['الجامعة التي حصل الطالب على الدرجة العلمية منها3'] || '',
      },
    ]

    let title = ''
    if (student['تأكيد نوع التسجيل'] === 'دبلومة الدراسات العليا') {
      for (let index = 1; index <= 9; index++) {
        if (index === 1) {
          if (student['عنوان الدبلومة']) {
            title = student['عنوان الدبلومة']
            break
          }
        } else {
          if (student[`عنوان الدبلومة${index}`]) {
            title = student[`عنوان الدبلومة${index}`]
            break
          }
        }
      }
    } else if (student['تأكيد نوع التسجيل'] === 'تمهيدي الماجستير') {
      for (let index = 1; index <= 9; index++) {
        if (index === 1) {
          if (student['عنوان تمهيدي الماجستير']) {
            title = student['عنوان تمهيدي الماجستير']
            break
          }
        } else {
          if (student[`عنوان تمهيدي الماجستير${index}`]) {
            title = student[`عنوان تمهيدي الماجستير${index}`]
            break
          }
        }
      }
    }
    const academicThesisData = {
      study_type: thesisData.study_type
        ? thesisData.study_type
        : student['تأكيد نوع التسجيل'],
      toeflGrade: thesisData.toeflGrade
        ? thesisData.toeflGrade
        : student['درجة امتحان التويفل - TOEFL'] || '',
      arabicTitle: title
        ? thesisData.arabicTitle || title
        : thesisData.arabicTitle || student['عنوان الرسالة باللغة العربية'],
      englishTitle: thesisData.englishTitle
        ? thesisData.englishTitle
        : student['عنوان الرسالة بالغة الإنجليزية'] || '',
      department: thesisData.department
        ? thesisData.department
        : student['القسم التابعة له هذه الدبلومة']
        ? student['القسم التابعة له هذه الدبلومة']
        : student['التخصص التابعة له هذه الرسالة'],
      // diplomaTitle: thesisData.diplomaTitle ? thesisData.diplomaTitle : title,
      requiredCourses: thesisData.requiredCourses
        ? thesisData.requiredCourses
        : student['المقررات المطلوبة بالقسم التي لم يدرسها الطالب (إن وجدت)'] ||
          '',
    }

    mainForm.push(
      <Container key={personalData.id}>
        <main className='main-form'>
          <Row>
            <Col xs={{ order: 2 }} md={{ order: 1 }}>
              <Image src={personalData.image} className='person-img' />
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
                    page === 1 &&
                    'active-page animate__animated animate__flipInX'
                  }
                >
                  1
                </Col>
                <Col
                  className={
                    page === 2 &&
                    'active-page animate__animated animate__flipInX'
                  }
                >
                  2
                </Col>
                <Col
                  className={
                    page === 3 &&
                    'active-page animate__animated animate__flipInX'
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
                    <PersonalData
                      className={animate}
                      setPersonalInfo={setPersonalInfo}
                      personalData={personalData}
                    />
                  )}
                  {page === 2 && (
                    <UniversityDegrees
                      className={animate}
                      universityDegrees={universityDegrees}
                      setUniDegrees={setUniDegrees}
                    />
                  )}
                  {page === 3 && (
                    <ThesisData
                      className={animate}
                      academicThesisData={academicThesisData}
                      setThesisData={setThesisData}
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
                          title: 'هل أنت متأكد من إزالة الطالب؟',
                          showDenyButton: true,
                          showCancelButton: true,
                          showConfirmButton: false,
                          denyButtonText: `نعم ، امسح الطالب`,
                          cancelButtonText: 'لا ، عودة',
                          cancelButtonColor: '#2f3944',
                          denyButtonColor: '#be0707',
                        }).then((result) => {
                          /* Read more about isConfirmed, isDenied below */
                          if (result.isDenied) {
                            Swal.fire({
                              icon: 'success',
                              title: 'تمت إزالة الطالب بنجاح',
                              confirmButtonText: 'حسنــاً',
                              confirmButtonColor: '#2f3944',
                            })
                            document.documentElement.scrollTop = 0
                            setPersonalInfo({})
                            setUniDegrees({})
                            setThesisData({})
                            setCanceledStudents([...canceledStudents, student])
                            setStudentNumber(studentNumber + 1)
                            setAnimate('animate__animated animate__fadeIn')
                            setPage(1)
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

  if (showUpload) {
    return <FileUpload handleFile={handleFile} />
  } else {
    return <>{mainForm[studentNumber]}</>
  }
}

export default StudentDataRegisteration
