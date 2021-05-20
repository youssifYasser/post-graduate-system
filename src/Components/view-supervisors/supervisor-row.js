import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'
import { Col, Row, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import isEqual from 'lodash/isEqual'

import './view-supervisors-style.css'

const SupervisorRow = ({
  index,
  supervisor,
  handleDelete,
  setIsEditing,
  setEditIndex,
}) => {
  return (
    <Row className='animate__animated animate__flipInX'>
      <section className='section'>
        <Row>
          <Col>{supervisor.arabicName}</Col>
          <Col>{supervisor.sciDegree}</Col>
          <Col>{supervisor.department}</Col>
          <Col>{supervisor.specialization}</Col>
          <Col className='section-edit-btns'>
            <Button
              type='button'
              onClick={() => {
                setEditIndex(index)
                setIsEditing(true)
              }}
            >
              {' '}
              <FaEdit />{' '}
            </Button>
          </Col>

          <Col className='section-del-btns'>
            <Button
              type='button'
              onClick={() => handleDelete(supervisor.idSupervisor)}
            >
              <MdDeleteForever />{' '}
            </Button>
          </Col>
        </Row>
      </section>
    </Row>
  )
}

export default SupervisorRow
