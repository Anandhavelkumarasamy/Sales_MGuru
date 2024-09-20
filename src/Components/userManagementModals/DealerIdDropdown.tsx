import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { dealeriddropdown } from "../../component/axios/Service";
import { Form } from "react-bootstrap";
import { listuser } from "../../component/axios/Service";
import { handleDealeruserlist } from "../../component/redux/reducers/Logintoken";
import { storedataprops } from "../../@types/store";
interface dealerdropdownprops {
  value: string;
  onChange: (event: string) => void;
  errorText?: string | string[] | null;
}
interface dealerdataprops {
  userId: number;
  userName: string;
}

export default function DealerIdDropdown({
  value,
  onChange,
  errorText,
}: dealerdropdownprops) {
  const objectToken = useSelector((state: storedataprops) => state.authLogin);
  const dispatch = useDispatch();
  const [storedealerList, setStoredealerList] = useState<dealerdataprops[]>([]);

  dispatch(handleDealeruserlist(storedealerList));
  const dealerSelector = objectToken.dealeruserList;
  console.log(dealerSelector, "dealerselector");
  const handleGetListUseres = (page = 1, size = 10) => {
    let formData = new FormData();
    formData.append("type", "3");
    formData.append("token", objectToken?.token);
    listuser(page, size, formData)
      .then((response) => {
        setStoredealerList(response?.data?.data?.items);
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
      <Form.Label>Select Dealer</Form.Label>
      <Form.Control
        as="select"
        value={value}
        onChange={(event) => {
          onChange(event?.target.value);
        }}
      >
        <option value="">Select a Dealer</option>
        {storedealerList?.map((item, index) => (
          <option key={item.userId} value={item.userId}>
            {item.userName}
          </option>
        ))}
      </Form.Control>
      {errorText && <Form.Text className="text-danger">{errorText}</Form.Text>}
    </Form.Group>
  );
}
