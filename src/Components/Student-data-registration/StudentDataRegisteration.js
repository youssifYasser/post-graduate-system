import React, { useState } from 'react'
import { Col, Container, Row, Image, Form, Button } from 'react-bootstrap'
import './StudentDataRegisteration.css'
import * as XLSX from 'xlsx'
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs'
import { TiUserAdd, TiUserDelete } from 'react-icons/ti'

import PersonalData from '../personal-data/PersonalData'
import ThesisData from '../thesis-data/ThesisData'
import UniversityDegrees from '../university-degrees/UniversityDegrees'
import FileUpload from '../file-upload/FileUpload'

const StudentDataRegisteration = () => {
  const [showUpload, setShowUpload] = useState(true)
  const [students, setStudents] = useState(null)
  const [page, setPage] = useState(1)

  const [validated, setValidated] = useState(false);


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
          if (ws[item].t == 'n') {
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
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);

    } else {
      setValidated(true);
      switch (page) {
        case 1:
        case 2:
          setPage(page + 1)
          break
        case 3:
          setPage(1)
          break
      }
      setValidated(false)
    }
  }

  if (showUpload) {
    return <FileUpload handleFile={handleFile} />
  } else {
    return (
      <>
        {students.map((item) => {
          const personalData = {
            image: item['الصورة الشخصية'],
            id: item['الرقم الكودي - الرقم المرسل في رسالة البريد الإلكتروني'],
            arabicName: item['الاسم باللغة العربية'],
            englishName: item['الاسم باللغة الإنجليزية'],
            birthDate: item['تاريخ الميلاد'],
            gender: item['الجنس'],
            country: item['دولة الجنسية (مثال: مصر)'],
            nationalID: item['الرقم القومي'],
            birthCertificateSource: item['مصدر شهادة الميلاد']
              ? item['مصدر شهادة الميلاد']
              : '',
            address: item['العنوان'] ? item['العنوان'] : '',
            phoneNumber: item['رقم الهاتف'],
            email: item['البريد الإلكتروني'],
            arabicJobName: item['الوظيفة باللغة العربية'],
            englishJobName: item['الوظيفة باللغة الإنجليزية']
              ? item['الوظيفة باللغة الإنجليزية']
              : '',
            jobAddress: item['عنوان الوظيفة'] ? item['عنوان الوظيفة'] : '',
          }

          const universityDegrees = [
            {
              scientificDegree: item['الدرجة  العلمية'],
              specialization: item['التخصص'],
              date: item['تاريخ الحصول عليها'],
              college: item['الكلية التي حصل الطالب على الدرجة العلمية منها'],
              university:
                item['الجامعة التي حصل الطالب على الدرجة العلمية منها'],
            },

            {
              scientificDegree: item['الدرجة  العلمية2']
                ? item['الدرجة  العلمية2']
                : '',
              specialization: item['التخصص2'] ? item['التخصص2'] : '',
              date: item['تاريخ الحصول عليها2']
                ? item['تاريخ الحصول عليها2']
                : '',
              college: item['الكلية التي حصل الطالب على الدرجة العلمية منها2']
                ? item['الكلية التي حصل الطالب على الدرجة العلمية منها2']
                : '',
              university: item[
                'الجامعة التي حصل الطالب على الدرجة العلمية منها2'
              ]
                ? item['الجامعة التي حصل الطالب على الدرجة العلمية منها2']
                : '',
            },
            {
              scientificDegree: item['الدرجة  العلمية3']
                ? item['الدرجة  العلمية3']
                : '',
              specialization: item['التخصص3'] ? item['التخصص3'] : '',
              date: item['تاريخ الحصول عليها3']
                ? item['تاريخ الحصول عليها3']
                : '',
              college: item['الكلية التي حصل الطالب على الدرجة العلمية منها3']
                ? item['الكلية التي حصل الطالب على الدرجة العلمية منها3']
                : '',
              university: item[
                'الجامعة التي حصل الطالب على الدرجة العلمية منها3'
              ]
                ? item['الجامعة التي حصل الطالب على الدرجة العلمية منها3']
                : '',
            },
          ]

          const academicThesisData = {
            registerationType: item['تأكيد نوع التسجيل'],
            toeflDegree: item['درجة امتحان التويفل - TOEFL']
              ? item['درجة امتحان التويفل - TOEFL']
              : '',
            arabicTitle: item['عنوان الرسالة باللغة العربية'],
            englishTitle: item['عنوان الرسالة بالغة الإنجليزية'],
            courses: item['المقررات الملتحقة بالدراسة']
              ? item['المقررات الملتحقة بالدراسة']
              : '',
          }

          return (
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
                      <Col className={`number1 ${page === 1 && 'active-page'}`}>
                        1
                      </Col>
                      <Col className={`number2 ${page === 2 && 'active-page'}`}>
                        2
                      </Col>
                      <Col className={`number3 ${page === 3 && 'active-page'}`}>
                        3
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                      <Form.Row>
                        {page === 1 && <PersonalData personalData={personalData} />}
                        {page === 2 && <UniversityDegrees universityDegrees={universityDegrees} />}
                        {page === 3 && <ThesisData academicThesisData={academicThesisData} />}
                      </Form.Row>
                      <Form.Row>
                        {page === 1 || <Col className='btn-col'>
                          <Button size='lg' type='button' className='next-btn' onClick={() => setPage(page - 1)}>
                            <BsFillCaretRightFill className='btn-previous' />
                            السابق
                          </Button>
                        </Col>
                        }
                        <Col className='btn-col'>
                          <Button size='lg' type='button' className='next-btn cancel-btn'>
                            إلغاء <TiUserDelete className='btn-submit' />
                          </Button>
                        </Col>
                        <Col className='btn-col'>
                          <Button size='lg' type='submit' className={`next-btn ${page === 3 && 'submit-btn'}`}>
                            {page === 3 ?
                              <div>
                                تسجيل <TiUserAdd className='btn-submit' />
                              </div>
                              :
                              <div>
                                التالى <BsFillCaretLeftFill className='btn-next' />
                              </div>
                            }
                          </Button>
                        </Col>
                      </Form.Row>
                    </Form>
                  </Col>
                </Row>
                {/* <Row>
                  
                </Row> */}
              </main>
            </Container>
          )
        })}
      </>
    )
  }
}

export default StudentDataRegisteration
