import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import {
  Col,
  Container,
  Row,
  Image,
  Form,
  Button,
  Accordion,
  Card,
} from 'react-bootstrap'

import './viewDepartments-style.css'

const DepartmentRow = ({ department, handleCancel, handleSave }) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <section className={`section ${isEditing && 'editing'}`}>
      <Row>
        <Col>
          <Form.Label>الرقم الكودي</Form.Label>
        </Col>
        <Col>
          <Form.Label>اسم القسم باللغة العربية</Form.Label>
        </Col>
        <Col>
          <Form.Label>اسم القسم باللغة الإنجليزية</Form.Label>
        </Col>
      </Row>
      <div>
        <Form.Row>
          <Col>
            <Form.Control
              type='number'
              name='id'
              value={department.id}
              disabled={!isEditing}
            />
          </Col>

          <Col>
            <Form.Control
              type='text'
              name='arabicName'
              value={department.arabicName}
              pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
              disabled={!isEditing}
            />
          </Col>

          <Col>
            <Form.Control
              type='text'
              name='englishName'
              value={department.englishName}
              pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
              disabled={!isEditing}
            />
          </Col>
          {isEditing || (
            <>
              <Col>
                <Button type='button' onClick={() => setIsEditing(!isEditing)}>
                  {' '}
                  <FaEdit />{' '}
                </Button>
              </Col>

              <Col>
                <Button type='button'>
                  <MdDeleteForever />{' '}
                </Button>
              </Col>
            </>
          )}
        </Form.Row>

        {isEditing && (
          <Row className='buttons-row animate__animated animate__fadeInDown'>
            <Col>
              <Button type='button' onClick={() => handleSave(department)}>
                حفظ
              </Button>
              <Button type='button'>مسح القسم</Button>
              <Button type='button' onClick={() => setIsEditing(!isEditing)}>
                إلغاء
              </Button>
            </Col>
          </Row>
        )}
      </div>
    </section>
  )
}

export default DepartmentRow
