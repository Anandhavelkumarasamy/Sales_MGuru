import React from 'react'
import { Modal,Button } from 'react-bootstrap'
import { usermanagementdeleteprops } from '../../@types/usermanagementdeletemodalprops';

export default function DeleteModal({todelete,handleDeleteClose,deleteuserid,handleDeleteUser,displayusername}:usermanagementdeleteprops) {
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
            <Button variant="primary" onClick={() =>{if(deleteuserid!==null){handleDeleteUser(deleteuserid)} }}>
              ok
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}
