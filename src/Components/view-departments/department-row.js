import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { Col, Row, Form, Button } from 'react-bootstrap'

import './viewDepartments-style.css'

const DepartmentRow = ({
  department,
  index,
  handleDelete,
  handleChange,
  handleSubmit,
  validated,
}) => {
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
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Control
              type='number'
              name={`id-${index}`}
              onChange={handleChange}
              value={department.id}
              disabled
            />
          </Col>

          <Col>
            <Form.Group controlId={`arabicName-${index}`}>
              <Form.Control
                type='text'
                name={`arabicName-${index}`}
                onChange={handleChange}
                value={department.arabicName}
                pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                disabled={!isEditing}
              />
              <Form.Control.Feedback type='invalid'>
                من فضلك أدخل اسم القسم باللغة العربية فقط.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col>
            <Form.Group>
              <Form.Control
                type='text'
                name={`englishName-${index}`}
                onChange={handleChange}
                value={department.englishName}
                pattern='^[a-zA-Z$@$!%*?&#^-_. +]+$'
                disabled={!isEditing}
                dir='ltr'
                lang='en'
              />
              <Form.Control.Feedback type='invalid'>
                من فضلك أدخل اسم القسم باللغة الإنجليزية فقط.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          {isEditing || (
            <>
              <Col>
                <Button type='button' onClick={() => setIsEditing(true)}>
                  {' '}
                  <FaEdit />{' '}
                </Button>
              </Col>

              <Col>
                <Button
                  type='button'
                  onClick={() => handleDelete(department.id)}
                >
                  <MdDeleteForever />{' '}
                </Button>
              </Col>
            </>
          )}
        </Form.Row>

        {isEditing && (
          <Row className='buttons-row animate__animated animate__fadeInDown'>
            <Col>
              <Button type='submit'>حفظ</Button>
              <Button type='button' onClick={() => handleDelete(department.id)}>
                مسح القسم
              </Button>
              <Button type='button' onClick={() => setIsEditing(false)}>
                إلغاء
              </Button>
            </Col>
          </Row>
        )}
      </Form>
    </section>
  )
}

export default DepartmentRow
