import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { Col, Row, Form, Button } from 'react-bootstrap'

import './view-students-style.css'
import NoSupervisors from '../../supervisor-data/view-supervisors/no-supervisors'

const StudentRow = ({
  index,
  student,
  handleDelete,
  setIsEditing,
  setEditIndex,
  startEdit,
}) => {
  return (
    <Row className='animate__animated animate__fadeIn'>
      <section className='section'>
        <Row>
          <Col>{student['personal'].arabicName}</Col>
          <Col>{student['personal'].nationalityId}</Col>
          <Col>{student['register'] ? student['register'].type : ''}</Col>
          <Col>
            {student['register'] ? student['register'].arabicTitle : ''}
          </Col>
          <Col className='section-edit-btns'>
            <Button
              type='button'
              onClick={() =>
                startEdit(
                  index,
                  student['personal'].idS,
                  student['register'] && student['register'].idStudyTypeF
                )
              }
            >
              {' '}
              <FaEdit />{' '}
            </Button>
          </Col>

          <Col className='section-del-btns'>
            <Button
              type='button'
              onClick={() => handleDelete(student['personal'].idS)}
            >
              <MdDeleteForever />{' '}
            </Button>
          </Col>
        </Row>
        <Row></Row>
      </section>
    </Row>
  )
}

export default StudentRow
