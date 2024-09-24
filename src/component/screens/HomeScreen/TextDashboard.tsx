import React, { useEffect, useState } from "react";
import { useToken } from "../../../utility/hooks";
import { Users } from "../../axios/Service";
import { Card } from "react-bootstrap";

export default function TextDashboard() {
  const token = useToken();
  const [data, setData] = useState([]);
  const handledata = () => {
    let formdata = new FormData();
    formdata.append("token", token);
    Users(formdata).then((response) => {
      setData(response?.data?.data);
      console.log(response.data.data);
    });
  };
  useEffect(() => {
    handledata();
  }, [token]);
  console.log(data, "data");
  return (
    <div>
      <h2>TestDashBoard</h2>

      {data?.map((ele, index) => {
        return ele?.displayName + " " + ele?.leads?.value;
      })}
      {/* <button
        onClick={() => handledata()}
        style={{ backgroundColor: "skyblue" }}
      >
        submit
      </button> */}
    </div>
  );
}
