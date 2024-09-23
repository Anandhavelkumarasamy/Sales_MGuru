import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  employdropdown,
  dealerdropdown,
  leadressign,
} from "../../component/axios/Service";
import { message } from "antd";
import { useToken } from "../../utility/hooks";
import {
  dealerpropsvalue,
  employeedropdownprops,
  employeepropsvalue,
} from "../../@types/employeedropdown";

export default function EmployeeDropdown({
  employeedropdown,
  leadid,
  handleemployeedropdownclose,
}: employeedropdownprops) {
  // const selector = useSelector((state) => state.authLogin);
  const token = useToken();
  const [selectedemployeeid, setselectedemployeeid] = useState<number | null>(
    leadid
  );
  const [employeedata, setemployeedata] = useState<employeepropsvalue[]>([]);

  const [selecteddealerid, setselecteddealerid] = useState<string | number>("");
  const [dealerdata, setdealerdata] = useState<dealerpropsvalue[]>([]);

  console.log("selectortoken", token);
  const usertype = sessionStorage.getItem("userType");
  const userId = sessionStorage.getItem("userId");

  const handlereassignstatus = () => {
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("leadId", String(leadid));
    formdata.append("employeeId", String(selectedemployeeid));
    // formdata.append("dealerId", selecteddealerid.toString());
    if (usertype !== "3") {
      formdata.append("dealerId", selecteddealerid.toString());
    } else {
      formdata.append("dealerId", String(userId));
    }

    leadressign(formdata)
      .then((response) => {
        if (response.data.status === 1) {
          message.success("successfully reassigned");
        } else {
          message.error(response.data.msg);
        }
        console.log("leadreassign", response.data.data);
        setselectedemployeeid(null);
        setselecteddealerid("");
        handleemployeedropdownclose();
      })
      .catch((error) => {
        console.log(error, "leadreassignerror");
      });
  };

  const handleemployeestatus = () => {
    if (token) {
      let formdata = new FormData();
      formdata.append("token", token);
      employdropdown(formdata)
        .then((response) => {
          setemployeedata(response.data.data);
          console.log(response.data.data, "employeedropdown");
        })
        .catch((error) => {
          console.log(error, "employdropdownerror");
        });
    }
  };

  const handledealerstatus = () => {
    if (token) {
      let formdata = new FormData();
      formdata.append("token", token);
      formdata.append("isDealer", "1");
      dealerdropdown(formdata)
        .then((response) => {
          setdealerdata(response.data.data);
          console.log(response.data.data, "dealerdropdown");
        })
        .catch((error) => {
          console.log(error, "dealerdropdownerror");
        });
    }
  };

  useEffect(() => {
    handledealerstatus();
    handleemployeestatus();
  }, [token]);

  return (
    <div>
      <Modal
        show={employeedropdown}
        onHide={handleemployeedropdownclose}
        animation={false}
      >
        <Modal.Body>
          {usertype !== "3" && (
            <Form.Group controlId="dealeriddropdown" className="mt-3">
              <Form.Label>Select Dealer</Form.Label>

              <Form.Control
                as="select"
                value={selecteddealerid}
                onChange={(e) => setselecteddealerid(e.target.value)}
                disabled={usertype === "3"}
              >
                <option value="">Select a dealer</option>
                {dealerdata?.map((item) => (
                  <option key={item.userId} value={item.userId}>
                    {item.userName.split("(")[0]}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          )}

          <Form.Group controlId="employeeiddropdown">
            <Form.Label>Select Employee</Form.Label>

            <Form.Control
              as="select"
              value={selectedemployeeid ?? ""}
              onChange={(e) =>
                setselectedemployeeid(Number(e.target.value) || null)
              }
              // disabled={
              //   usertype === "3"
              //     ? selecteddealerid === String(userId)
              //     : selecteddealerid === ""
              // }
            >
              <option value="">Select an employee</option>
              {(selecteddealerid ? selecteddealerid : userId)
                ? employeedata?.map((item) => (
                    <option key={item.userId} value={item.userId}>
                      {item.userName.split("(")[0]}
                    </option>
                  ))
                : null}
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
