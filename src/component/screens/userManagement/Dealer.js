import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Table, Tooltip, Pagination, message } from "antd";
import { SearchOutlined } from '@ant-design/icons';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

import UserFilter from "../../../Components/userManagementModals/UserFilter";
import CreateModal from '../../../Components/userManagementModals/CreateModal';
import DeleteModal from '../../../Components/userManagementModals/DeleteModal';
import { listuser, deleteuser } from "../../axios/Service";
import { useToken } from "../../../utility/hooks";
import styles from './Dealer.module.css'; 


export default function Dealer() {
  const token = useToken();
  const [userList, setUserList] = useState({});
  const [showInput, setShowInput] = useState(false);
  const [todelete, setToDelete] = useState(false);
  const [deleteUsername, setDeleteUsername] = useState(null);
  const [value, setValue] = useState("");
  const [isShowModal, setIsShowModal] = useState({ isShow: false, data: null });

  const itemsPerPage = 10;

  useEffect(() => {
    if (token) {
      handleGetListUsers(1, itemsPerPage, {});
    }
  }, [token]);


  const handleGetListUsers = (page = 1, size , data = {}) => {
    let formData = new FormData();
    formData.append("type", "3");
    formData.append("token", token);
    formData.append("username", data.userName || "");
    formData.append("email", data.email || "");
    formData.append("phoneNumber", data.phoneNumber || "");

    listuser(page, size, formData)
      .then((response) => setUserList(response?.data?.data))
      .catch((err) => console.error(err));
  };


  const handleDeleteUser = (id) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("userId", id);

    deleteuser(formData).then((response) => {
      if (response.data.status === 1) {
        message.success(`User ${deleteUsername} deleted successfully`);
      }
      handleGetListUsers();
      setToDelete(false);
    });
  };

  const columns = [
    {
      title: 'Serial No',
      key: 'serialNo',
      render: (text, record, index) => (userList.page - 1) * itemsPerPage + index + 1,
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
              style={{ color: "red", margin: "0 10px", fontSize: '18px' }}
              onClick={() => { setValue(record.userId); setDeleteUsername(record.userName); setToDelete(true); }}
            />
          </Tooltip>
          <Tooltip title="Update" placement="bottom">
            <EditOutlined
              style={{ color: "blue", fontSize: "18px", margin: "0 10px" }}
              onClick={() => setIsShowModal({ data: record, isShow: true })}
            />
          </Tooltip>
        </>
      )
    }
  ];

  return (
    <>
      <div className="row mb-2">
        <div className="col-2">
          <h3>Dealer Page</h3>
        </div>
        <div className="col-10">
          <Button
           style={{background:'#002244'}}
            onClick={() => setIsShowModal({ data: null, isShow: true })}
            className="float-end me-5"
          >
            Add Dealer
          </Button>
          <Button style={{background:'#002244'}} onClick={() => setShowInput((prev) => !prev)} className="float-end me-3">
            <SearchOutlined />
          </Button>
        </div>
      </div>
      <br />
      <br />
      {showInput && (
        <div className="mb-5">
          <UserFilter handleGetListUsers={handleGetListUsers} />
        </div>
      )}

      <div>
        <Table
          columns={columns}
          dataSource={userList.items}
          pagination={false}
          rowKey="userId"
           bordered
          className={styles.customTable}
          
  
        />

        <Pagination
          className="mt-4"
          pageSize={itemsPerPage}
          align="end"
          onChange={(val, size) => handleGetListUsers(val, size)}
          total={userList.total_count}
        />

        <DeleteModal
          todelete={todelete}
          handleDeleteClose={() => setToDelete(false)}
          displayusername={deleteUsername}
          handleDeleteUser={handleDeleteUser}
          deleteuserid={value}
        />
        {isShowModal.isShow && (
          <CreateModal
            editData={isShowModal.data}
            show={isShowModal.isShow}
            handleClose={() => setIsShowModal({ data: null, isShow: false })}
            apical={handleGetListUsers}
            usertype={"3"}
          />
        )}
      </div>
    </>
  );
}
