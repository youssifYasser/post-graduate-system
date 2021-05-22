import React, { useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import '../ref-style.css'
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'

const Referee = ({
  referee,
  handleDelete,
  setEditIndex,
  setIsEditing,
  index,
  isFiltering,
}) => {
  return (
    <>
      <Row className='section animate__animated animate__flipInX'>
        <Col className='ref-info'>{referee.arabicName}</Col>
        <Col className='ref-info'>{referee.degree}</Col>
        <Col className='ref-info'>{referee.department}</Col>
        <Col className='ref-info'>{referee.specialization}</Col>
        <Col className='ref-btns'>
          <Button
            className='icon edit-icon'
            onClick={() => {
              setEditIndex(index)
              setIsEditing(true)
            }}
          >
            <FaEdit />
          </Button>
          <Button
            className='icon delete-icon'
            onClick={() => handleDelete(referee.idRefereed)}
          >
            <MdDeleteForever />
          </Button>
        </Col>
      </Row>
    </>
  )
}

export default Referee
