import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; 
import { useSelector } from 'react-redux';
import { changeleadstatus, competitordropdown, enquirydropdown, leaddropdown } from '../../component/axios/Service';
import {  DatePicker } from 'antd';

// const { RangePicker }=DatePicker
// const { Title } = Typography;
export default function Leaddropdown({ errorText, leaddropdowns, handledropdownclose, leadid }) {
    const objectToken = useSelector((state) => state.authLogin);
    const [leaddata, setleaddata] = useState(null);
    const [selectedLeadStatusId, setSelectedLeadStatusId] = useState(leadid);
    const [notes, setNotes] = useState(''); 
    const [competitor, setCompetitor] = useState([]);
    const [selectedCompetitor, setSelectedCompetitor] = useState('');
    const [selectedDateTime, setSelectedDateTime] = useState(null); 
    const [followDateTime,setFollowDateTime]=useState(null);
    const [pocDateTime,setPocDateTime]=useState(null);

    const [enquirydata, setenquirydata] = useState([]);
    const [selectedEnquiry, setSelectedEnquiry] = useState('');




    const handleleadstatus = (statusid) => {
        if (objectToken.token) {
            let formdata = new FormData();
            formdata.append("token", objectToken.token);
            formdata.append("leadId", leadid);
            formdata.append("leadStatus", statusid);
            formdata.append("competitor", selectedCompetitor);
            formdata.append("comment", notes);
            formdata.append("demo_date", selectedDateTime ? selectedDateTime : ""); 
            formdata.append("enquiry_type",selectedEnquiry);
            formdata.append("follow_up_date",followDateTime ? followDateTime: "");
            formdata.append("poc_date",pocDateTime ? pocDateTime: "");
          
            changeleadstatus(formdata).then((response) => {
                console.log(response, "leadstatussss");
                setSelectedLeadStatusId('');
                setNotes('');
                handledropdownclose();
            });
        }
    };

    const handleleaddata = () => {
        if (objectToken.token) {
            let formdata = new FormData();
            formdata.append("token", objectToken.token);
            leaddropdown(formdata).then((response) => {
                setleaddata(response.data.data);
                console.log(response.data.data, "leaddropdown");
            }).catch((error) => error);
        }
    };

    const handlecompetitor = () => {
        if (objectToken.token) {
            let formdata = new FormData();
            formdata.append("token", objectToken.token);
            competitordropdown(formdata).then((response) => {
                setCompetitor(response.data.data);
                console.log(response.data.data, "competitor");
            });
        }
    };

    useEffect(() => {
        handleleaddata();
    }, [objectToken.token]);

    useEffect(() => {
        if (selectedLeadStatusId === '7') {
            handlecompetitor();
        }
    }, [selectedLeadStatusId]);


    const handleenquiry = () => {
        if (objectToken.token) {
            let formdata = new FormData();
            formdata.append("token", objectToken.token);
            enquirydropdown(formdata).then((response) => {
                setenquirydata(response.data.data);
                console.log(response.data.data, "competitor");
            });
        }
    };

    useEffect(() => {
        handleenquiry();
    }, [objectToken.token]);

    useEffect(() => {
        if (selectedLeadStatusId === '5') {
            handleenquiry();
        }
    }, [selectedLeadStatusId]);






    const handleDemoDateChange = (date,dateString) => {
        console.log('Selected Date and Time:', dateString);
        setSelectedDateTime(dateString);
    };
    const handleDateFollowChange = (date,dateString) => {
        console.log('Selected Date and Time:', dateString);
        setFollowDateTime(dateString);
    };
    const handlePocDateChange = (date,dateString) => {
        console.log('Selected Date and Time:', dateString);
        setPocDateTime(dateString);
    };


    return (
        <div>
            <Modal show={leaddropdowns} onHide={handledropdownclose} animation={false}>
                <Modal.Body>
                    <Form.Group controlId="dealerIdDropdown">
                        <Form.Label>Select Lead</Form.Label>
                        <Form.Control as="select" value={selectedLeadStatusId}
                            onChange={(e) => setSelectedLeadStatusId(e.target.value)}>
                            <option value="">Select a lead</option>
                            {leaddata?.map((item) => (
                                <option key={item.leadStatusId} value={item.leadStatusId}>
                                    {item.leadStatusName}
                                </option>
                            ))}
                        </Form.Control>
                        {errorText && <Form.Text className="text-danger">{errorText}</Form.Text>}
                    </Form.Group>
<br></br>


{(() => {
                        if (selectedLeadStatusId === '3') {
                            return (
                                <Form.Group>
                                    <Form.Label>Select Demo Time</Form.Label> <br />
                                    <DatePicker
                                        showTime
                                        getPopupContainer={(trigger) => trigger.parentNode}
                                        onChange={handleDemoDateChange}
                                    />
                                </Form.Group>
                            );
                        } else if (selectedLeadStatusId === '5') {
                            return (
                                <Form.Group>
                                    <Form.Label>Select Follow-up Time</Form.Label> <br />
                                    <DatePicker
                                        showTime
                                        getPopupContainer={(trigger) => trigger.parentNode}
                                        onChange={handleDateFollowChange}
                                    />
                                </Form.Group>
                            );
                        } else if (selectedLeadStatusId === '24') {
                            return (
                                <Form.Group>
                                    <Form.Label>Select POC Time</Form.Label> <br />
                                    <DatePicker
                                        showTime
                                        getPopupContainer={(trigger) => trigger.parentNode}
                                        onChange={handlePocDateChange}
                                    />
                                </Form.Group>
                            );
                        }
                    })}



                    {console.log(selectedLeadStatusId,"selecedlead")}


                    {
                        selectedLeadStatusId === '5' && (
                            <Form.Group controlId="EnquiryIdDropdown">
                            <Form.Label>Select Enquiry</Form.Label>
                            <Form.Control as="select" value={selectedEnquiry}
                                onChange={(e) => setSelectedEnquiry(e.target.value)}>
                                <option value="">Select a Enquiry</option>
                                {enquirydata?.map((item) => (
                                    <option key={item.enquiryId} value={item.enquiryId}>
                                        {item.enquiryName}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        )
                    }

                    {selectedLeadStatusId === '7' && (
                        <Form.Group controlId="competitorIdDropdown">
                            <Form.Label>Select Competitor</Form.Label>
                            <Form.Control as="select" value={selectedCompetitor}
                                onChange={(e) => setSelectedCompetitor(e.target.value)}>
                                <option value="">Select a competitor</option>
                                {competitor?.map((item) => (
                                    <option key={item.competitorId} value={item.competitorName}>
                                        {item.competitorName}
                                    </option>
                                ))}
                            </Form.Control>
                            {errorText && <Form.Text className="text-danger">{errorText}</Form.Text>}
                        </Form.Group>
                    )}

                    {selectedLeadStatusId && (
                        <Form.Group>
                            <Form.Label>Comments</Form.Label>
                            <Form.Control 
                                as="textarea" 
                                rows={6} 
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)} 
                                placeholder="Add feedback or important points here"
                            />
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handledropdownclose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handleleadstatus(selectedLeadStatusId)}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
