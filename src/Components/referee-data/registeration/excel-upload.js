import React, { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import * as XLSX from 'xlsx'
import RefManualReg from './ref-manual-reg'

import '../ref-style.css'

const UploadRefExcel = () => {
  const [showUpload, setShowUpload] = useState(true)
  const [byExcel, setByExcel] = useState(true)
  const [referees, setReferees] = useState([])
  const [refNumber, setRefNumber] = useState(0)

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
            idRefereed:
              data[i]['الرقم الكودي - الرقم المرسل في رسالة البريد الإلكتروني'],
            arabicName: data[i]['الاسم باللغة العربية'],
            englishName: data[i]['الاسم باللغة الإنجليزية'],
            nationalityId: data[i]['الرقم القومي'],
            gender: data[i]['الجنس'],
            nationality: data[i]['دولة الجنسية (مثال: مصر)'],
            degree: data[i]['الدرجة العلمية'],
            specialization: data[i]['التخصص'],
            position: data[i]['المنصب'],
            department: data[i]['القسم الذي به المحكم'],
            faculty: data[i]['الكلية التي بها المحكم'],
            university: data[i]['الجامعة التي بها المحكم'],
            email: data[i]['البريد الإلكتروني'],
            mobile: data[i]['رقم الهاتف'],
          }
          referees.push(tempObj)
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
            <h1>تسجيل بيانات المحكــم</h1>
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
      <RefManualReg
        byExcel={byExcel}
        refereeObj={referees[refNumber]}
        referees={referees}
        setRefNumber={setRefNumber}
        refNumber={refNumber}
        setShowUpload={setShowUpload}
      />
    )
  }
}

export default UploadRefExcel
