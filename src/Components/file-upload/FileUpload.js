import React from 'react'
import 'animate.css/animate.min.css'
import { Container, Row, Form, Col } from 'react-bootstrap'

const FileUpload = ({ handleFile }) => {
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
}

export default FileUpload
