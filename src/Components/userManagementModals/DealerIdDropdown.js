import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dealeriddropdown } from "../../component/axios/Service";
import { Form } from "react-bootstrap";
import { listuser } from "../../component/axios/Service";
import { handleDealeruserlist } from "../../component/redux/reducers/Logintoken";

export default function DealerIdDropdown({
  value,
  onChange,
  errorText,
  
}) {
  const objectToken = useSelector((state) => state.authLogin);
  const dispatch = useDispatch();
  const [storedealerList, setStoredealerList] = useState([]);

  dispatch(handleDealeruserlist(storedealerList));
  const dealerSelector = objectToken.dealeruserList;
  console.log(dealerSelector, "dealerselector");
  const handleGetListUseres = (page = 1, size = 5) => {
    let formData = new FormData();
    formData.append("type", "3");
    formData.append("token", objectToken?.token);
    listuser(page, size, formData)
      .then((response) => {
        setStoredealerList(response?.data?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log(storedealerList, "storedealerList");

  useEffect(() => {
    if (objectToken?.token) {
      handleGetListUseres();
    }
  }, [objectToken?.token]);

  return (
    <Form.Group controlId="dealerIdDropdown">
      <Form.Label>Select Dealer ID</Form.Label>
      <Form.Control as="select" value={value} onChange={onChange}>
        <option value="">Select a Dealer ID</option>
        {storedealerList.items?.map((item, index) => (
          <option key={item.userId} value={item.userId}>
            {item.userId}
          </option>
        ))}
      </Form.Control>
      {errorText && <Form.Text className="text-danger">{errorText}</Form.Text>}
    </Form.Group>
  );
}
