import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './StudentDataRegisteration.css'
import * as XLSX from 'xlsx'

const StudentDataRegisteration = () => {
  const [showUpload, setShowUpload] = useState(true)
  const [students, setStudents] = useState(null)

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
        const data = XLSX.utils.sheet_to_json(ws, { raw: false })
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

  if (showUpload) {
    return (
      <Container fluid>
        <Row>
          <div className='header'>
            <h1>تسجيل بيانات الطالب</h1>
          </div>
        </Row>
        <Row>
          <div className='center'>
            <label htmlFor='fileInput'>قم برفع ملف الإكسل:</label>
            <input type='file' id='fileInput' onChange={handleFile} />
          </div>
        </Row>
      </Container>
    )
  } else {
    return (
      <Container fluid>
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
          return <></>
        })}
      </Container>
    )
  }
}

export default StudentDataRegisteration
