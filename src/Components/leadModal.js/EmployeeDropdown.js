import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { employdropdown, dealerdropdown, leadressign } from '../../component/axios/Service';
import { message } from 'antd';

export default function EmployeeDropdown({ employeedropdown, leadid, handleemployeedropdownclose }) {
  const selector = useSelector((state) => state.authLogin);
  const [selectedemployeeid, setselectedemployeeid] = useState(leadid);
  const [employeedata, setemployeedata] = useState(null);
  
  const [selecteddealerid, setselecteddealerid] = useState(''); 
  const [dealerdata, setdealerdata] = useState(null); 

  console.log("selectortoken", selector.token);

  const handlereassignstatus = () => {
    let formdata = new FormData();
    formdata.append("token", selector.token);
    formdata.append("leadId", leadid);
    formdata.append("employeeId", selectedemployeeid );
    formdata.append("dealerId",selecteddealerid);
    
    leadressign(formdata).then((response) => {
       if (response.data.status===1){
        message.success('successfully reassigned')
       }
       else{
        message.error(response.data.msg)
       }
      console.log("leadreassign", response.data.data);
      setselectedemployeeid('');  
      setselecteddealerid('');  
      handleemployeedropdownclose();
    

    }).catch((error) => {
      console.log(error, "leadreassignerror");
    });
  };

  const handleemployeestatus = () => {
    
    if (selector.token ) {
      let formdata = new FormData();
      formdata.append('token', selector.token);
      employdropdown(formdata).then((response) => {
        setemployeedata(response.data.data);
        console.log(response.data.data, 'employeedropdown');
      }).catch((error) => {
        console.log(error, "employdropdownerror");
      });
    }
  };

  const handledealerstatus = () => {
    if (selector.token) {
      let formdata = new FormData();
      formdata.append('token', selector.token);
      formdata.append('isDealer', 1);
      dealerdropdown(formdata).then((response) => {
        setdealerdata(response.data.data);
        console.log(response.data.data, 'dealerdropdown');
      }).catch((error) => {
        console.log(error, "dealerdropdownerror");
      });
    }
  };

  useEffect(() => {
    handledealerstatus();
    handleemployeestatus();
   
  }, [selector.token]);

  return (
    <div>
      <Modal show={employeedropdown} onHide={handleemployeedropdownclose} animation={false}>
        <Modal.Body>


        <Form.Group controlId="dealeriddropdown" className="mt-3">
            <Form.Label>Select Dealer</Form.Label>
            <Form.Control
              as="select"
              value={selecteddealerid}
              onChange={(e) => setselecteddealerid(e.target.value)}
            >
              <option value="">Select a dealer</option>
              {dealerdata?.map((item) => (
                <option key={item.userId} value={item.userId}>
                  {item.userName.split('(')[0]}
                 
                </option>
              ))}
            </Form.Control>
          </Form.Group>
         
          <Form.Group controlId="employeeiddropdown">
            <Form.Label>Select Employee</Form.Label>
            <Form.Control
              as="select"
              value={selectedemployeeid}
              onChange={(e) => setselectedemployeeid(e.target.value)}
            >
              <option value="">Select an employee</option>
              {selecteddealerid ? employeedata?.map((item) => (
                <option key={item.userId} value={item.userId}>
                  {item.userName.split('(')[0]}
                </option>
              )): null}
            </Form.Control>
          </Form.Group>

          
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleemployeedropdownclose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlereassignstatus}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
