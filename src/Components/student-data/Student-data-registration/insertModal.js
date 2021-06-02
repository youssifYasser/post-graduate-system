import React from 'react'
import { Modal } from 'react-bootstrap'
import AddSupervisor from '../../add-supervisor/addSupervisor-container'
import AddReferee from '../../add-referee/addReferee-container'
import RefManualReg from '../../referee-data/registeration/ref-manual-reg'
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
        {props.insertPage === 2 && <SupervisorDataRegisteration />}
        {props.insertPage === 3 && <AddReferee modalShow={props.show} />}
        {props.insertPage === 4 && <RefManualReg />}
      </Modal.Body>
    </Modal>
  )
}

export default InsertModal
