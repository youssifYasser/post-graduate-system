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

const StudentDataRegisteration = () => {
  const [showUpload, setShowUpload] = useState(true)
  const [students, setStudents] = useState([])

  const [personalInfo, setPersonalInfo] = useState({})
  const [thesisData, setThesisData] = useState({})
  const [uniDegrees, setUniDegrees] = useState({})

  const [page, setPage] = useState(1)
  const [studentNumber, setStudentNumber] = useState(0)
  const [validated, setValidated] = useState(false)
  const [animate, setAnimate] = useState('animate__animated animate__fadeIn')

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
              console.log(JSON.stringify(personalInfo))
              console.log(JSON.stringify(uniDegrees))
              console.log(JSON.stringify(thesisData))
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

  useEffect(() => {
    if (studentNumber >= students.length) {
      setStudentNumber(0)
      setShowUpload(true)
    }
  }, [studentNumber])

  const mainForm = []
  for (const student of students) {
    const personalData = {
      image: student['الصورة الشخصية'],
      id: student['الرقم الكودي - الرقم المرسل في رسالة البريد الإلكتروني'],
      arabicName: student['الاسم باللغة العربية'],
      englishName: student['الاسم باللغة الإنجليزية'],
      birthDate: student['تاريخ الميلاد'],
      gender: student['الجنس'],
      country: student['دولة الجنسية (مثال: مصر)'],
      nationalID: student['الرقم القومي'],
      birthCertificateSource: student['مصدر شهادة الميلاد'] || '',
      address: student['العنوان'] || '',
      phoneNumber: student['رقم الهاتف'],
      email: student['البريد الإلكتروني'],
      arabicJobName: student['الوظيفة باللغة العربية'],
      englishJobName: student['الوظيفة باللغة الإنجليزية'] || '',
      jobAddress: student['عنوان الوظيفة'] || '',
    }

    const universityDegrees = [
      {
        scientificDegree: student['الدرجة  العلمية'],
        specialization: student['التخصص'],
        date: student['تاريخ الحصول عليها'],
        college: student['الكلية التي حصل الطالب على الدرجة العلمية منها'],
        university: student['الجامعة التي حصل الطالب على الدرجة العلمية منها'],
      },
      {
        scientificDegree: student['الدرجة  العلمية2'] || '',
        specialization: student['التخصص2'] || '',
        date: student['تاريخ الحصول عليها2'] || '',
        college:
          student['الكلية التي حصل الطالب على الدرجة العلمية منها2'] || '',
        university:
          student['الجامعة التي حصل الطالب على الدرجة العلمية منها2'] || '',
      },
      {
        scientificDegree: student['الدرجة  العلمية3'] || '',
        specialization: student['التخصص3'] || '',
        date: student['تاريخ الحصول عليها3'] || '',
        college:
          student['الكلية التي حصل الطالب على الدرجة العلمية منها3'] || '',
        university:
          student['الجامعة التي حصل الطالب على الدرجة العلمية منها3'] || '',
      },
    ]

    let title = ''
    if (student['تأكيد نوع التسجيل'] === 'دبلومة الدراسات العليا') {
      if (student['عنوان الدبلومة']) {
        title = student['عنوان الدبلومة']
      } else if (student['2عنوان الدبلومة']) {
        title = student['2عنوان الدبلومة']
      } else if (student['3عنوان الدبلومة']) {
        title = student['3عنوان الدبلومة']
      } else if (student['4عنوان الدبلومة']) {
        title = student['4عنوان الدبلومة']
      } else if (student['5عنوان الدبلومة']) {
        title = student['5عنوان الدبلومة']
      } else if (student['6عنوان الدبلومة']) {
        title = student['6عنوان الدبلومة']
      } else if (student['7عنوان الدبلومة']) {
        title = student['7عنوان الدبلومة']
      } else if (student['8عنوان الدبلومة']) {
        title = student['8عنوان الدبلومة']
      } else if (student['9عنوان الدبلومة']) {
        title = student['9عنوان الدبلومة']
      }
    } else if (student['تأكيد نوع التسجيل'] === 'تمهيدي الماجستير') {
      if (student['عنوان تمهيدي الماجستير']) {
        title = student['عنوان تمهيدي الماجستير']
      } else if (student['2عنوان تمهيدي الماجستير']) {
        title = student['2عنوان تمهيدي الماجستير']
      } else if (student['3عنوان تمهيدي الماجستير']) {
        title = student['3عنوان تمهيدي الماجستير']
      } else if (student['4عنوان تمهيدي الماجستير']) {
        title = student['4عنوان تمهيدي الماجستير']
      } else if (student['5عنوان تمهيدي الماجستير']) {
        title = student['5عنوان تمهيدي الماجستير']
      } else if (student['6عنوان تمهيدي الماجستير']) {
        title = student['6عنوان تمهيدي الماجستير']
      } else if (student['7عنوان تمهيدي الماجستير']) {
        title = student['7عنوان تمهيدي الماجستير']
      } else if (student['8عنوان تمهيدي الماجستير']) {
        title = student['8عنوان تمهيدي الماجستير']
      } else if (student['9عنوان تمهيدي الماجستير']) {
        title = student['9عنوان تمهيدي الماجستير']
      }
    }
    const academicThesisData = {
      registerationType: student['تأكيد نوع التسجيل'],
      toeflDegree: student['درجة امتحان التويفل - TOEFL'] || '',
      arabicTitle: student['عنوان الرسالة باللغة العربية'] || '',
      englishTitle: student['عنوان الرسالة بالغة الإنجليزية'] || '',
      department: student['القسم التابعة له هذه الدبلومة']
        ? student['القسم التابعة له هذه الدبلومة']
        : student['التخصص التابعة له هذه الرسالة'],
      diplomaTitle: title,
      courses:
        student['المقررات المطلوبة بالقسم التي لم يدرسها الطالب (إن وجدت)'] ||
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
