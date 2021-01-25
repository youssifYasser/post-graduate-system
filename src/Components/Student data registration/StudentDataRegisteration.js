import React, { useState, useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import './StudentDataRegisteration.css'
import * as XLSX from 'xlsx'

const StudentDataRegisteration = () => {
  const [showUpload, setShowUpload] = useState(true)
  const [students, setStudents] = useState([])

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
        const data = XLSX.utils.sheet_to_json(ws)
        setStudents(data)
        setShowUpload(false)
      } catch (error) {
        setShowUpload(false)
        throw new Error('قم برفع ملف صحيح')
      }
    }
    fileReader.onerror = (error) => {
      throw new Error('saa')
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
    return <div>hi</div>
  }
}

export default StudentDataRegisteration
