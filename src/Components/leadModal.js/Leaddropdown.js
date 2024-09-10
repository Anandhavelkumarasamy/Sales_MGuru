import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Form from react-bootstrap
import { useSelector } from 'react-redux';
import { changeleadstatus, leaddropdown } from '../../component/axios/Service';

export default function Leaddropdown({  errorText, leaddropdowns, handledropdownclose, leadid }) {
    const objectToken = useSelector((state) => state.authLogin);
    const [leaddata, setleaddata] = useState(null);
    const [selectedLeadStatusId, setSelectedLeadStatusId] = useState(leadid);

    const handleleadstatus=(statusid)=>{
        let formdata= new FormData();
        formdata.append("token",objectToken.token);
        formdata.append("leadId",leadid);
        formdata.append("leadStatus",statusid);
        changeleadstatus(formdata).then((response)=>{
            console.log(response,"leadstatussss")
            handledropdownclose();
        })
    }
    const handleleaddata = () => {
        let formdata = new FormData();
        formdata.append("token", objectToken.token);
        leaddropdown(formdata).then((response) => {
            setleaddata(response.data.data);
            console.log(response.data.data,"leaddropdown")
        }).catch((error) => error);
    }

    useEffect(() => {
        handleleaddata();
    }, [objectToken.token]);

    return (
        <div>
            <Modal show={leaddropdowns} onHide={handledropdownclose} animation={false}>
            
                <Modal.Body >
                    <Form.Group controlId="dealerIdDropdown">
                        <Form.Label>Select Requirement ID</Form.Label>
                        <Form.Control as="select" value={selectedLeadStatusId}
                        onChange={(e) => setSelectedLeadStatusId(e.target.value)}>
                            <option value="">Select a Requirement ID</option>
                            {leaddata?.map((item) => (
                                <option key={item.leadStatusId} value={item.leadStatusId}>
                                    {item.leadStatusName}
                                </option>
                            ))}
                        </Form.Control>
                        {errorText && <Form.Text className="text-danger">{errorText}</Form.Text>}
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handledropdownclose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{handleleadstatus(selectedLeadStatusId)}}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
