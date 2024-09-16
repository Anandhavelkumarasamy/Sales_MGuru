import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import TextInputBox from '../userManagementModals/TextInputBox';
import { addmasteruser, updatemasteruser } from '../../component/axios/Service';
import { useToken } from '../../utility/hooks';

export default function CreateModalMaster({ show, handleClose, masterapical, updateId, apivalue }) {
  const token = useToken();
  const [name, setName] = useState('');
  const [errorText, setErrorText] = useState('');


  console.log(updateId, 'update id');
  

  
  useEffect(() => {
    if (updateId) {
      setName(updateId.customerCategoryName || updateId.enquireTypeName  || updateId.RequirementsName ||'');
    } else {
      setName('');
    }
  }, [updateId]);

  const handleChange = (e) => {
    setName(e.target.value);
    if (e.target.value.trim()) {
      setErrorText('');
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      setErrorText('Name is required');
      return;
    }

    const formdata = new FormData();
    formdata.append('token', token);
    formdata.append('name', name ); // Use the updated name from the input

    if (updateId) {
      formdata.append('dataId', updateId.customerCategoryId || updateId.enquireId || updateId.RequirementsId); 
      console.log(formdata,"formdataaas")
      updatemasteruser(apivalue,formdata)
        .then((response) => {
          console.log('Category updated successfully', response);
        //   updateId(null);
         
          setName(''); 
          masterapical(); 
          handleClose(); 
        })
        .catch((error) => {
          console.log('Error updating category', error);
        });
    } else {
      addmasteruser(apivalue,formdata)
        .then((response) => {
          console.log('Category added successfully', response);
          masterapical();
          setName(''); 
          handleClose();
        })
        .catch((error) => {
          console.log('Error adding category', error);
        });
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{updateId ? "Update " : "Add "}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextInputBox
            title="Name"
            value={name}
            onchange={handleChange}
            placeholder="Enter  Name"
            errorText={errorText}
            isRequired={true}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button style={{background:'#002244'}} onClick={handleSubmit}>
            {updateId ? "Update" : "Submit"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
