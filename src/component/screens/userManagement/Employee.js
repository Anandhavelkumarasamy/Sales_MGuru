import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteuser, listuser } from "../../axios/Service";
import { Button, Table, Pagination, Tooltip, message } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import UserFilter from "../../../Components/userManagementModals/UserFilter";
import TextInputBox from '../../../Components/userManagementModals/TextInputBox';
import CreateModal from '../../../Components/userManagementModals/CreateModal';
import DeleteModal from '../../../Components/userManagementModals/DeleteModal';
import trash from '../../assests/trash.png';
import update from '../../assests/data-processing.png';
import { useToken } from "../../../utility/hooks";
import {DeleteOutlined,EditOutlined} from '@ant-design/icons'

export default function Employee() {
  const token = useToken();
  const [show, setShow] = useState(false);
  const [userList, setUserList] = useState({});
  const [Value, setValue] = useState("");
  const [deleteUsername, setDeleteUsername] = useState(null);
  const [toDelete, setToDelete] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [isShowModal, setIsShowModal] = useState({
    isShow: false,
    data: null,
  });
  const [toUpdate, setToUpdate] = useState(false);
  const [editId, setEditId] = useState(null);

  const toggleInputs = () => setShowInput(prev => !prev);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => setToDelete(false);
  const handleDeleteShow = (id, username) => {
    setValue(id);
    setDeleteUsername(username);
    setToDelete(true);
  };
  const handleUpdateClose = () => setToUpdate(false);
  const handleUpdateShow = (value) => {
    setEditId(value);
    setToUpdate(true);
  };

  const itemsPerPage = 5;

  const handleGetListUsers = (page = 1, size = 5, data = {}) => {
    let formData = new FormData();
    formData.append("type", "4");
    formData.append("token", token);
    formData.append("username", data.userName || "");
    formData.append("email", data.email || "");
    formData.append("phoneNumber", data.phoneNumber || "");

    listuser(page, size, formData)
      .then((response) => setUserList(response?.data?.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (token) {
      handleGetListUsers(1, 5, {});
    }
  }, [token]);

  const handleDeleteUser = (id) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("userId", id);
    
    deleteuser(formData)
      .then((response) => {
        if(response.data.status === 1) {
          message.success(`User ${deleteUsername} deleted successfully`);
        }
        handleDeleteClose();
        handleGetListUsers();
      })
      .catch((error) => error);
  };

  const columns = [
    {
      title: 'Serial No',
      key: 'serialNo',
      render: (text, record, index) => handleSerialNo(index),
      align: 'center'
    },
    // {
    //   title: 'ID',
    //   dataIndex: 'userId',
    //   key: 'userId',
    //   align: 'center'
    // },
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center'
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center'
    },
    {
      title: 'Type',
      dataIndex: 'userTypeName',
      key: 'userTypeName',
      align: 'center'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center'
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <>


<Tooltip title="Delete" placement="bottom">
            <DeleteOutlined

              type="text"
              style={{ color: "red", margin: "0 10px",fontSize: '18px' }}
              onClick={() => handleDeleteShow(record.userId, record.userName)}
            />
          </Tooltip>
          <Tooltip title="Update" placement="bottom">
            <EditOutlined
              type="text"
              style={{ color: "blue", fontSize: "18px", margin: "0 10px" }}
              onClick={() => setIsShowModal({ data: record, isShow: true })}
            />
          </Tooltip>
        </>
      )
    }
  ];

  const handleSerialNo = (index) => {
    return (userList.page - 1) * itemsPerPage + index + 1;
  };

  return (
    <>
      <div className="row mb-2">
        <div className="col-3">
          <h3>Employee Page</h3>
        </div>
        <div className="col-9">

        <Button
            style={{background:'#002244'}}
            onClick={() => setIsShowModal({ data: null, isShow: true })}
            className="float-end me-5 text-white p-3"
          >
            Add Employee
          </Button>
          <Button style={{background:'#002244'}} onClick={toggleInputs}  className="float-end me-3 text-white p-3">
            <SearchOutlined />
          </Button>
       
        </div>
      </div>
      <br />
      <br />
      {showInput && (
        <div className="mb-5">
          <UserFilter handleGetListUseres={handleGetListUsers} />
        </div>
      )}

      <div >
        <Table
          columns={columns}
          dataSource={userList.items}
          pagination={false}
          rowKey="id"
          bordered
        />
        <Pagination
        className="float-end"
          pageSize={itemsPerPage}
          current={userList.page}
          total={userList.total_count}
          onChange={(page, size) => {
            handleGetListUsers(page, size);
          }}
          style={{ marginTop: '16px' }}
        />

        <DeleteModal
          todelete={toDelete}
          handleDeleteClose={handleDeleteClose}
          deleteuserid={Value}
          handleDeleteUser={handleDeleteUser}
          displayusername={deleteUsername}
        />
        {isShowModal.isShow && (
          <CreateModal
            editData={isShowModal.data}
            show={isShowModal.isShow}
            handleClose={() => setIsShowModal({ data: null, isShow: false })}
            apical={handleGetListUsers}
            usertype={"4"}
          />
        )}
      </div>
    </>
  );
}
