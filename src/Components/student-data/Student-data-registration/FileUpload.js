import React, { useState } from 'react'
import 'animate.css/animate.min.css'
import { Container, Row, Form, Col } from 'react-bootstrap'
import * as XLSX from 'xlsx'

import './StudentDataRegisteration.css'

import StudentDataRegisteration from './StudentDataRegisteration'
import UniversityDegrees from './UniversityDegrees'
import PersonalData from './PersonalData'

const UploadStudentExcel = () => {
  const [showUpload, setShowUpload] = useState(true)
  const [byExcel, setByExcel] = useState(true)
  const [students, setStudents] = useState([])
  const [personalInfo, setPersonalInfo] = useState([])
  const [uniDegrees, setUniDegrees] = useState([])
  const [thesisData, setThesisData] = useState([])
  const [studentNumber, setStudentNumber] = useState(0)

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
        for (let i = 0; i < data.length; i++) {
          let studentObj = {}
          studentObj['personalInfo'] = {
            image: data[i]['الصورة الشخصية'],
            idS: data[i][
              'الرقم الكودي - الرقم المرسل في رسالة البريد الإلكتروني'
            ],
            arabicName: data[i]['الاسم باللغة العربية'],
            englishName: data[i]['الاسم باللغة الإنجليزية'],
            birthdate: data[i]['تاريخ الميلاد'],
            gender: data[i]['الجنس'],
            nationality: data[i]['دولة الجنسية (مثال: مصر)'],
            nationalityId: data[i]['الرقم القومي'],
            birthdateSource: data[i]['مصدر شهادة الميلاد'],
            Add: data[i]['العنوان'],
            mobile: data[i]['رقم الهاتف'],
            email: data[i]['البريد الإلكتروني'],
            jobArabic: data[i]['الوظيفة باللغة العربية'],
            jobEnglish: data[i]['الوظيفة باللغة الإنجليزية'],
            jobAdd: data[i]['عنوان الوظيفة'],
          }
          // personalInfo.push(personalObj)

          studentObj['uniDegrees'] = []
          let degreesObj = {
            degree: data[i]['الدرجة  العلمية'],
            faculty: data[i]['الكلية التي حصل الطالب على الدرجة العلمية منها'],
            university:
              data[i]['الجامعة التي حصل الطالب على الدرجة العلمية منها'],
            dateObtained: data[i]['تاريخ الحصول عليها'],
            specialization: data[i]['التخصص'],
          }
          studentObj['uniDegrees'].push(degreesObj)
          if (data[i]['الدرجة  العلمية2'] != null) {
            degreesObj = {
              degree: data[i]['الدرجة  العلمية2'],
              faculty:
                data[i]['الكلية التي حصل الطالب على الدرجة العلمية منها2'],
              university:
                data[i]['الجامعة التي حصل الطالب على الدرجة العلمية منها2'],
              dateObtained: data[i]['تاريخ الحصول عليها2'],
              specialization: data[i]['التخصص2'],
            }
            studentObj['uniDegrees'].push(degreesObj)
          }
          if (data[i]['الدرجة  العلمية3'] != null) {
            degreesObj = {
              degree: data[i]['الدرجة  العلمية3'],
              faculty:
                data[i]['الكلية التي حصل الطالب على الدرجة العلمية منها3'],
              university:
                data[i]['الجامعة التي حصل الطالب على الدرجة العلمية منها3'],
              dateObtained: data[i]['تاريخ الحصول عليها3'],
              specialization: data[i]['التخصص3'],
            }
            studentObj['uniDegrees'].push(degreesObj)
          }
          // uniDegrees.push(degreesArr)

          let title = ''
          if (data[i]['تأكيد نوع التسجيل'] === 'دبلومة الدراسات العليا') {
            for (let index = 1; index <= 9; index++) {
              if (index === 1) {
                if (data[i]['عنوان الدبلومة']) {
                  title = data[i]['عنوان الدبلومة']
                  break
                }
              } else {
                if (data[i][`عنوان الدبلومة${index}`]) {
                  title = data[i][`عنوان الدبلومة${index}`]
                  break
                }
              }
            }
          } else if (data[i]['تأكيد نوع التسجيل'] === 'تمهيدي الماجستير') {
            for (let index = 1; index <= 9; index++) {
              if (index === 1) {
                if (data[i]['عنوان تمهيدي الماجستير']) {
                  title = data[i]['عنوان تمهيدي الماجستير']
                  break
                }
              } else {
                if (data[i][`عنوان تمهيدي الماجستير${index}`]) {
                  title = data[i][`عنوان تمهيدي الماجستير${index}`]
                  break
                }
              }
            }
          }
          studentObj['thesisData'] = {
            sciDegree: data[i]['تأكيد نوع التسجيل'],
            toeflGrade: data[i]['درجة امتحان التويفل - TOEFL'],
            arabicTitle: title || data[i]['عنوان الرسالة باللغة العربية'],
            englishTitle: data[i]['عنوان الرسالة بالغة الإنجليزية'] || '',
            requiredCourses:
              data[i][
                'المقررات المطلوبة بالقسم التي لم يدرسها الطالب (إن وجدت)'
              ],
            department:
              data[i]['القسم التابعة له هذه الدبلومة'] ||
              data[i]['القسم التابعة له دراسة تمهيدي الماجستير'] ||
              data[i]['التخصص التابعة له هذه الرسالة'],
          }
          // thesisData.push(thesisObj)

          students.push(studentObj)
        }
        console.log(students)
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

  if (showUpload) {
    return (
      <Container className='upload-form'>
        <Row>
          <div className='header'>
            <h1>تسجيل بيانات الطالب</h1>
          </div>
        </Row>
        <Form.Row className='animate__animated animate__zoomIn'>
          <Col className='file' xs={9} md={7}>
            <Form.Group controlId='fileInput'>
              <Form.File
                className='uploader'
                label='قم برفع ملف الإكسل'
                id='fileInput'
                onChange={handleFile}
                custom
              />
            </Form.Group>
          </Col>
        </Form.Row>
      </Container>
    )
  } else {
    return (
      <StudentDataRegisteration
        byExcel={byExcel}
        studentObj={students[studentNumber]}
        students={students}
        setStudentNumber={setStudentNumber}
        studentNumber={studentNumber}
        setShowUpload={setShowUpload}
      />
    )
  }
}

export default UploadStudentExcel
