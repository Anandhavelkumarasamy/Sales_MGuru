import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  changeleadstatus,
  competitordropdown,
  enquirydropdown,
  leaddropdown,
} from "../../component/axios/Service";
import { DatePicker, message } from "antd";
import { useToken } from "../../utility/hooks";
import {
  competitorprops,
  enquiryprops,
  leaddataprops,
  leaddropdownprops,
} from "../../@types/leaddropdown";
import Leads from "../../component/screens/leads/Leads";
// import 'antd/dist/antd.css'; // Ensure this line is included

export default function Leaddropdown({
  errorText,
  leaddropdowns,
  handledropdownclose,
  leadid,
}: leaddropdownprops) {
  const token = useToken();
  const [leaddata, setleaddata] = useState<leaddataprops[]>([]);
  const [selectedLeadStatusId, setSelectedLeadStatusId] = useState<
    number | null
  >(leadid);
  const [notes, setNotes] = useState<string>("");
  const [competitor, setCompetitor] = useState<competitorprops[]>([]);
  const [selectedCompetitor, setSelectedCompetitor] = useState<string>("");
  const [selectedDateTime, setSelectedDateTime] = useState<string>("");
  const [followDateTime, setFollowDateTime] = useState<string>("");
  const [pocDateTime, setPocDateTime] = useState<string>("");

  const [enquirydata, setenquirydata] = useState<enquiryprops[]>([]);
  const [selectedEnquiry, setSelectedEnquiry] = useState("");

  const handleleadstatus = (statusid: number) => {
    if (token) {
      let formdata = new FormData();
      formdata.append("token", token);
      if (leadid !== null) {
        formdata.append("leadId", leadid.toString());
      }
      formdata.append("leadStatus", statusid.toString());
      formdata.append("competitor", selectedCompetitor);
      formdata.append("comment", notes);
      formdata.append("demo_date", selectedDateTime);
      formdata.append("enquiry_type", selectedEnquiry);
      formdata.append("follow_up_date", followDateTime);
      formdata.append("poc_date", pocDateTime);

      changeleadstatus(formdata).then((response) => {
        if (response.data.status === 1) {
          message.success(response.data.msg);
          setSelectedLeadStatusId(0);
          setNotes("");
          handledropdownclose();
        } else {
          message.error(response.data.msg);
        }
      });
    }
  };

  const handleleaddata = () => {
    if (token) {
      let formdata = new FormData();
      formdata.append("token", token);
      leaddropdown(formdata)
        .then((response) => {
          setleaddata(response.data.data);
        })
        .catch((error) => console.error(error));
    }
  };

  const handlecompetitor = () => {
    if (token) {
      let formdata = new FormData();
      formdata.append("token", token);
      competitordropdown(formdata).then((response) => {
        setCompetitor(response.data.data);
      });
    }
  };

  useEffect(() => {
    handleleaddata();
  }, [token]);

  useEffect(() => {
    if (selectedLeadStatusId === 7) {
      handlecompetitor();
    }
  }, [selectedLeadStatusId]);

  const handleenquiry = () => {
    if (token) {
      let formdata = new FormData();
      formdata.append("token", token);
      enquirydropdown(formdata).then((response) => {
        setenquirydata(response.data.data);
      });
    }
  };

  useEffect(() => {
    handleenquiry();
  }, [token]);

  useEffect(() => {
    if (selectedLeadStatusId === 5) {
      handleenquiry();
    }
  }, [selectedLeadStatusId]);

  const handleDemoDateChange = (
    date: moment.Moment | null,
    dateString: string | string[]
  ) => {
    if (Array.isArray(dateString)) {
      console.error("Date string is an array:", dateString);
    } else {
      setSelectedDateTime(dateString);
    }
  };

  const handleDateFollowChange = (
    date: moment.Moment | null,
    dateString: string | string[]
  ) => {
    if (Array.isArray(dateString)) {
      console.error("Date string is an array:", dateString);
    } else {
      setFollowDateTime(dateString);
    }
  };

  const handlePocDateChange = (
    date: moment.Moment | null,
    dateString: string | string[]
  ) => {
    if (Array.isArray(dateString)) {
      console.error("Date string is an array:", dateString);
    } else {
      setPocDateTime(dateString);
    }
  };

  return (
    <div>
      <Modal
        show={leaddropdowns}
        onHide={handledropdownclose}
        animation={false}
      >
        <Modal.Body>
          <Form.Group controlId="dealerIdDropdown">
            <Form.Label>Select Lead</Form.Label>
            <Form.Control
              as="select"
              value={selectedLeadStatusId ?? ""}
              onChange={(e) => setSelectedLeadStatusId(Number(e.target.value))}
            >
              <option value="">Select a lead</option>
              {leaddata?.map((item) => (
                <option key={item.leadStatusId} value={item.leadStatusId}>
                  {item.leadStatusName}
                </option>
              ))}
            </Form.Control>
            {errorText && (
              <Form.Text className="text-danger">{errorText}</Form.Text>
            )}
          </Form.Group>
          <br />
          {selectedLeadStatusId === 3 && (
            <Form.Group>
              <Form.Label>Select Demo Time</Form.Label> <br />
              <DatePicker
                showTime
                getPopupContainer={(trigger: HTMLElement) => {
                  // Ensure the trigger is an HTMLElement and return its parentNode
                  return trigger.parentNode as HTMLElement;
                }}
                onChange={handleDemoDateChange}
              />
            </Form.Group>
          )}
          {selectedLeadStatusId === 5 && (
            <Form.Group>
              <Form.Label>Select Follow-up Time</Form.Label> <br />
              <DatePicker
                showTime
                getPopupContainer={(trigger: HTMLElement) => {
                  // Ensure the trigger is an HTMLElement and return its parentNode
                  return trigger.parentNode as HTMLElement;
                }}
                onChange={handleDateFollowChange}
              />
            </Form.Group>
          )}
          {selectedLeadStatusId === 24 && (
            <Form.Group>
              <Form.Label>Select POC Time</Form.Label> <br />
              <DatePicker
                showTime
                getPopupContainer={(trigger: HTMLElement) => {
                  return trigger.parentNode as HTMLElement;
                }}
                onChange={handlePocDateChange}
              />
            </Form.Group>
          )}
          {selectedLeadStatusId === 5 && (
            <Form.Group controlId="EnquiryIdDropdown">
              <Form.Label>Select Enquiry</Form.Label>
              <Form.Control
                as="select"
                value={selectedEnquiry}
                onChange={(e) => setSelectedEnquiry(e.target.value)}
              >
                <option value="">Select an Enquiry</option>
                {enquirydata?.map((item) => (
                  <option key={item.enquiryId} value={item.enquiryId}>
                    {item.enquiryName}
                  </option>
                ))}
              </Form.Control>
              {errorText && (
                <Form.Text className="text-danger">{errorText}</Form.Text>
              )}
            </Form.Group>
          )}
          {selectedLeadStatusId === 7 && (
            <Form.Group controlId="CompetitorIdDropdown">
              <Form.Label>Select Competitor</Form.Label>
              <Form.Control
                as="select"
                value={selectedCompetitor}
                onChange={(e) => setSelectedCompetitor(e.target.value)}
              >
                <option value="">Select a Competitor</option>
                {competitor?.map((item) => (
                  <option key={item.competitorId} value={item.competitorId}>
                    {item.competitorName}
                  </option>
                ))}
              </Form.Control>
              {errorText && (
                <Form.Text className="text-danger">{errorText}</Form.Text>
              )}
            </Form.Group>
          )}
          {selectedLeadStatusId && (
            <Form.Group controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Form.Group>
          )}
          <br />
          <Button
            variant="primary"
            onClick={() => handleleadstatus(selectedLeadStatusId ?? 0)}
          >
            Submit
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
