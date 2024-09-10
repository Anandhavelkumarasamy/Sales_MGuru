// src/pages/Admin.js

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteuser, listuser } from "../../axios/Service";
import { Button, Row, Col } from "react-bootstrap";
import { Pagination } from "antd";
import CreateModal from '../../../Components/userManagementModals/CreateModal';
import DeleteModal from '../../../Components/userManagementModals/DeleteModal';
import { SearchOutlined } from '@ant-design/icons';
import UserFilter from "../../../Components/userManagementModals/UserFilter"; // Import the filter component

export default function Admin() {
  
  const objectToken = useSelector((state) => state.authLogin);
  const [show, setShow] = useState(false);
  const [userList, setuserList] = useState({});
  const [displayusername, setdisplayusername] = useState('');
  const [todelete, settoDelete] = useState(false);
  const [showInput, setshowInput] = useState(false);
  const [deleteuserid,setdeleteuserid]=useState(null);
  const itemsPerPage = 5;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => settoDelete(false);
  const handleDeleteShow = (userid, username) => {

    setdeleteuserid(userid);
    setdisplayusername(username);
    settoDelete(true);
  };

  const toggleInputs = () => setshowInput((pre) => !pre);

  const handleGetListUseres = (page = 1, size = 5, data = {}) => {
    let formData = new FormData();
    formData.append("type", "2");
    formData.append("token", objectToken?.token);
    formData.append("username", data.userName || "");
    formData.append("email", data.email || "");
    formData.append("phoneNumber", data.phoneNumber || "");
    
    listuser(page, size, formData)
      .then((response) => setuserList(response?.data?.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (objectToken?.token) {
      handleGetListUseres(1, 5, {});
    }
  }, [objectToken?.token]);

  const handleDeleteUser = (deleteuserid) => {
    let formdata = new FormData();
    formdata.append("token", objectToken.token);
    formdata.append("userId", deleteuserid);
    console.log(deleteuserid,"deleteid");
    deleteuser(formdata).then((response) => {
      
      handleDeleteClose();
      handleGetListUseres();
    });
  };

  const handleSerialNo = (index) => {
    return (userList.page - 1) * itemsPerPage + index + 1;
  };


  return (
    <>
      <div className="row">
        <div className="col-2">
          <h3>Admin Page</h3>
        </div>
        <div className="col-10">
          <Button variant="primary" onClick={handleShow} className="float-end">
            Add New Admin
          </Button>
          <Button variant="primary" onClick={toggleInputs} className="float-end me-3">
            <SearchOutlined />
          </Button>
        </div>
      </div>
      <br />
      <br />
      {showInput && (
        <div className="mb-5">
          <UserFilter handleGetListUseres={handleGetListUseres} />
        </div>
      )}

      <div className="border border-black rounded ">
        <table className="table table-striped ">
          <thead className="thead-light">
            <tr>
              <th className="p-2 text-center">Serial No</th>
              <th className="p-2 text-center">ID</th>
              <th className="p-2 text-center">Name</th>
              <th className="p-2 text-center">Phone Number</th>
              <th className="p-2 text-center">Type</th>
              <th className="p-2 text-center">Email</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.items?.map((item, index) => (
              <tr key={item.id} style={{ textAlign: "center", verticalAlign: "middle" }}>
                <td className="text-center p-2">{handleSerialNo(index)}</td>
                <td className="text-center p-2">{item.userId}</td>
                <td className="text-center p-2">{item.userName}</td>
                <td className="text-center p-2">{item.phoneNumber}</td>
                <td className="text-center p-2">{item.userTypeName}</td>
                <td className="text-center p-2">{item.email}</td>
                <td className="text-center p-2">
                  <Button variant="danger" onClick={() => handleDeleteShow(item.userId, item.userName)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination
          pageSize={userList?.size}
          align="end"
          onChange={(val, size) => handleGetListUseres(val, size)}
          total={userList.total_count}
        />
        <br />

        <DeleteModal
          todelete={todelete}
          handleDeleteClose={handleDeleteClose}
          deleteuserid={deleteuserid}
          handleDeleteUser={handleDeleteUser}
          displayusername={displayusername}
        />
        <CreateModal
          show={show}
          handleClose={handleClose}
          apical={handleGetListUseres}
          usertype={"2"}
        />
      </div>
    </>
  );
}
