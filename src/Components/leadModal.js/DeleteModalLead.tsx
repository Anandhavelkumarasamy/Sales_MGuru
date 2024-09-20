import React from 'react'
import { Modal,Button } from 'react-bootstrap'
import { deletemodalleadprops } from '../../@types/deletemodallead';

export default function DeleteModalLead({todelete,handleDeleteClose,deleteuserid,handleDeleteUser,displayusername}:deletemodalleadprops) {
  console.log(deleteuserid,"delted");
  return (
    <div>
      <Modal show={todelete} onHide={handleDeleteClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are You sure?{displayusername}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleDeleteUser(deleteuserid)}>
              ok
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}

