import React, { useState, useEffect } from "react";
import { useToken } from "../../utility/hooks";
import { dealerdropdown } from "../../component/axios/Service";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { handleassignedselecteddealerid } from "../../component/redux/reducers/Logintoken";
import {
  assigneddealerdropdownprops,
  dealeritems,
} from "../../@types/assigneddealerdropdown";

export default function AssignedDealerdropdown({
  value,
  onChange,
}: assigneddealerdropdownprops) {
  const token = useToken();
  const [dealerdata, setdealerdata] = useState<dealeritems[]>([]);
  const dispatch = useDispatch();

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
  }, [token]);

  const handleSelectionChange = (e: any) => {
    const selectedId = e.target.value;
    onChange(selectedId);
    dispatch(handleassignedselecteddealerid(selectedId));
  };

  return (
    <div>
      <Form.Group controlId="dealeriddropdown" className="mt-3">
        <Form.Label>Select Dealer</Form.Label>
        <Form.Control
          as="select"
          value={value}
          onChange={handleSelectionChange}
        >
          <option value="">Select a dealer</option>
          {dealerdata?.map((item) => (
            <option key={item.userId} value={item.userId}>
              {item.userName.split("(")[0]}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </div>
  );
}
