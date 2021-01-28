import React from 'react'
import { Container, Row, Form, Col } from 'react-bootstrap'

const FileUpload = ({ handleFile }) => {
    return (
        <Container className='upload-form'>
            <Row>
                <div className='header'>
                    <h1>تسجيل بيانات الطالب</h1>
                </div>
            </Row>
            <Form.Row>
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