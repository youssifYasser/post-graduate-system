import React, { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import * as XLSX from 'xlsx'

import SupervisorDataRegisteration from './supervisor-data-registeration'
import './supervisor-data-registeration.css'

const UploadExcel = () => {
  const [showUpload, setShowUpload] = useState(true)
  const [byExcel, setByExcel] = useState(true)
  const [supervisors, setSupervisors] = useState([])
  const [supervisorNumber, setSupervisorNumber] = useState(0)

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
        const data = XLSX.utils.sheet_to_json(ws, {
          raw: false,
        })
        for (let i = 0; i < data.length; i++) {
          let tempObj = {
            idSupervisor:
              data[i]['الرقم الكودي - الرقم المرسل في رسالة البريد الإلكتروني'],
            arabicName: data[i]['الاسم باللغة العربية'],
            englishName: data[i]['الاسم باللغة الإنجليزية'],
            nationalityId: data[i]['الرقم القومي'],
            gender: data[i]['الجنس'],
            nationality: data[i]['دولة الجنسية (مثال: مصر)'],
            sciDegree: data[i]['الدرجة العلمية'],
            specialization: data[i]['التخصص'],
            department: data[i]['القسم الذي به المشرف'],
            faculty: data[i]['الكلية التي بها المشرف'],
            university: data[i]['الجامعة التي بها المشرف'],
            email: data[i]['البريد الإلكتروني'],
            mobile: data[i]['رقم الهاتف'],
          }
          supervisors.push(tempObj)
        }
        // console.log(data)
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
            <h1>تسجيل بيانات المشرف</h1>
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
      <SupervisorDataRegisteration
        byExcel={byExcel}
        supervisorObj={supervisors[supervisorNumber]}
        supervisors={supervisors}
        setSupervisorNumber={setSupervisorNumber}
        supervisorNumber={supervisorNumber}
        setShowUpload={setShowUpload}
      />
    )
  }
}

export default UploadExcel
