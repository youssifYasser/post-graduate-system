import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import AddSupervisor from '../../add-supervisor/addSupervisor-container'
import SupervisorDataRegisteration from '../../supervisor-data/supervisor-data-registration/supervisor-data-registeration'

function InsertModal(props) {
  return (
    <Modal
      {...props}
      size='xl'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body dir='rtl'>
        {props.insertPage === 1 && <AddSupervisor modalShow={props.show} />}
        {props.insertPage === 2 && (
          <SupervisorDataRegisteration modalShow={props.show} />
        )}
      </Modal.Body>
    </Modal>
  )
}

export default InsertModal
