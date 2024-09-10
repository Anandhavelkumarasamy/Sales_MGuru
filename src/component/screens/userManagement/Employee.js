import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteuser, listuser } from "../../axios/Service";
import { Button } from "react-bootstrap";

import { Pagination } from "antd";
import {SearchOutlined } from '@ant-design/icons';
import UserFilter from "../../../Components/userManagementModals/UserFilter";

import TextInputBox from '../../../Components/userManagementModals/TextInputBox';
import CreateModal from '../../../Components/userManagementModals/CreateModal'
import DeleteModal from '../../../Components/userManagementModals/DeleteModal'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Employee() {
  const objectToken = useSelector((state) => state.authLogin);
  const [show, setShow] = useState(false);
  const [userList, setuserList] = useState({});

  const [Value, setValue] = useState("");
  const [deleteusername,setdeleteusername]=useState(null);
  const [todelete, settoDelete] = useState(false);
  const [showInput, setshowInput] = useState(false);
  const toggleInputs = () => setshowInput((pre) => !pre);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => settoDelete(false);
  const handleDeleteShow = (id,username) => {
    setValue(id);
    setdeleteusername(username);
    settoDelete(true);
  };

  const [isShowModal, setisShowModal] = useState({
    isShow: false,
    data: null,
  });
  const [toupdate, settoUpdate] = useState(false);
  const handleUpdateClose = () => settoUpdate(false);

  const [editid, seteditid] = useState(null);

  const handleUpdateShow = (value) => {
    console.log(value, "updatedid");
    seteditid(value);
    settoUpdate(true);
  };
  const itemsPerPage = 5;
  console.log(userList, "KKKKKKKKKKKKKKK");

  const handleGetListUseres = (page = 1, size = 5, data = {}) => {
    let formData = new FormData();
    formData.append("type", "4");
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

  const handleDeleteUser = (id) => {
    let formdata = new FormData();
    formdata.append("token", objectToken.token);
    formdata.append("userId", id);
    console.log(id, "ytghuijo");
    deleteuser(formdata).then((response) => {
      toast.success("User deleted successfully!");
      console.log(response.data.data, "deleteSuccessfully");
      handleDeleteClose();
      // handleAdmin();
      handleGetListUseres();
    }).catch((error)=> toast.error( error,"Failed to delete user. Please try again."));
  };
  const handleSerialNo = (index) => {
    return (userList.page - 1) * itemsPerPage + index + 1;

 
  };
 

  return (
    <>
      <div className="row mb-2">
        <div className="col-2 ">
          <h3> Employee Page</h3>
        </div>
        <div className="col-10 ">
          <Button
            variant="primary"
            onClick={() => setisShowModal({ data: null, isShow: true })}
            className="float-end  me-5"
          >
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
          <UserFilter handleGetListUseres={handleGetListUseres}  />
        </div>
      )}

      <div className="border border-black">
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
                <td className="text-center">{handleSerialNo(index)}</td>

                <td className="text-center">{item.userId}</td>
                <td className="text-center">{item.userName}</td>
                <td className="text-center">{item.phoneNumber}</td>
                <td className="text-center">{item.userTypeName}</td>
                <td className="text-center">{item.email}</td>
                <td className="text-center">
                  <Button

                    variant="danger"
                  
                    onClick={() => handleDeleteShow(item.userId,item.userName)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="success"
                    className="ms-5"
                    onClick={() => setisShowModal({ data: item, isShow: true })}
                  > Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          pageSize={userList?.size}
          align="end"
          onChange={(val, size) => {
            handleGetListUseres(val, size);
          }}
          total={userList.total_count}
        />

        <DeleteModal
          todelete={todelete}
          handleDeleteClose={handleDeleteClose}
          deleteuserid={Value}
          handleDeleteUser={handleDeleteUser}
          displayusername={deleteusername}
        />
        {isShowModal?.isShow && (
          <CreateModal
            editData={isShowModal?.data}
            show={isShowModal?.isShow}
            handleClose={() => setisShowModal({ data: null, isShow: false })}
            apical={handleGetListUseres}
            usertype={"4"}
          />
        )}
        {/* <EditModal
         editid={editid}
         toupdate={toupdate}
         handleUpdateClose={handleUpdateClose}
        /> */}
      </div>
    </>
  );
}
