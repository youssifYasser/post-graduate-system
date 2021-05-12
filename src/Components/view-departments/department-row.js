import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { Col, Row, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import isEqual from 'lodash/isEqual'

import './viewDepartments-style.css'

const DepartmentRow = ({
  department,
  index,
  handleDelete,
  handleChange,
  setCopyDepts,
  copyDepts,
  departments,
  setDepartments,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [validated, setValidated] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    console.log(e.currentTarget)
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
      Swal.fire({
        icon: 'error',
        title: 'حدث خطأ',
        text: '.من فضلك راجع البيانات',
        confirmButtonText: 'حسنــاً',
        confirmButtonColor: '#2f3944',
      })
    } else {
      setValidated(true)
      Swal.fire({
        icon: 'info',
        title: 'هل أنت متأكد من حفظ تغيير بيانات القسم؟',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonColor: '#01ad01',
        confirmButtonText: 'نعم ، احفظ',
        cancelButtonText: 'لا ، عودة',
        cancelButtonColor: '#2f3944',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire({
            icon: 'success',
            title: 'تم تغيير بيانات القسم بنجاح',
            confirmButtonText: 'حسنــاً',
            confirmButtonColor: '#2f3944',
          })
          setIsEditing(false)
          setValidated(false)

          const updateDepartmentsAPI = {
            url: `http://localhost:8000/api/departments/${department.idDept}`,
            method: 'put',
            data: JSON.stringify(department),
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json;charset=UTF-8',
            },
          }
          axios(updateDepartmentsAPI)
            .then((response) => {
              setDepartments([...copyDepts])
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }
  }

  const handleCancel = () => {
    if (!isEqual(copyDepts[index], departments[index])) {
      Swal.fire({
        icon: 'warning',
        title: '!لن يتم حفظ البيانات التي قمت بتعديلها',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `نعم ، إلغاء`,
        cancelButtonText: 'لا ، عودة',
        cancelButtonColor: '#2f3944',
        denyButtonColor: '#be0707',
      }).then((result) => {
        if (result.isDenied) {
          copyDepts[index] = departments[index]
          setCopyDepts([...copyDepts])
          setIsEditing(false)
          setValidated(false)
        }
      })
    } else {
      setIsEditing(false)
      setValidated(false)
    }
  }

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
              name={`idDept-${index}`}
              onChange={handleChange}
              value={department.idDept}
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
                pattern='^[a-zA-Z ]+$'
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
                  onClick={() => handleDelete(department.idDept)}
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
              <Button
                type='button'
                onClick={() => handleDelete(department.idDept)}
              >
                مسح القسم
              </Button>
              <Button
                type='button'
                onClick={() => {
                  handleCancel()
                }}
              >
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
