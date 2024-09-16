import React, { useEffect, useState } from "react";
import { deleteuser, listuser } from "../../axios/Service";
import { Button, Row, Col } from "react-bootstrap";
import { Table, Tooltip, Pagination, message } from "antd";
import { PlusOutlined, SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import CreateModal from '../../../Components/userManagementModals/CreateModal';
import DeleteModal from '../../../Components/userManagementModals/DeleteModal';
import UserFilter from "../../../Components/userManagementModals/UserFilter";
import { useToken } from "../../../utility/hooks";

export default function Admin() {
  const token=useToken();
  const [show, setShow] = useState(false);
  const [userList, setuserList] = useState({});
  const [displayusername, setdisplayusername] = useState('');
  const [todelete, settoDelete] = useState(false);
  const [showInput, setshowInput] = useState(false);
  const [deleteuserid, setdeleteuserid] = useState(null);
  const itemsPerPage = 2;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => settoDelete(false);
  const handleDeleteShow = (userid, username) => {
    setdeleteuserid(userid);
    setdisplayusername(username);
    settoDelete(true);
  };

  const toggleInputs = () => setshowInput((pre) => !pre);

  const handleGetListUseres = (page = 1, size, data = {}) => {
    let formData = new FormData();
    formData.append("type", "2");
    formData.append("token", token);
    formData.append("username", data.userName || "");
    formData.append("email", data.email || "");
    formData.append("phoneNumber", data.phoneNumber || "");
    
    listuser(page, size, formData)
      .then((response) => setuserList(response?.data?.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (token) {
      handleGetListUseres(1, itemsPerPage, {});
    }
  }, [token]);

  const handleDeleteUser = (deleteuserid) => {
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("userId", deleteuserid);
    deleteuser(formdata).then((response) => {
      if(response.data.status === 1){
        message.success(`User ${displayusername} deleted successfully`);
        handleDeleteClose();
        handleGetListUseres();
      }
    });
  };

  const columns = [
    {
      title: 'Serial No',
      key: 'serialNo',
      render: (text, item, index) => (userList.page - 1) * itemsPerPage + index + 1,
      align: 'center',
    },
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center',
    },
    {
      title: 'Type',
      dataIndex: 'userTypeName',
      key: 'userTypeName',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center',
      render: (text, item) => (
        <Tooltip title="Delete" placement="bottom">
            {<DeleteOutlined   type="text" style={{color:'red',fontSize:'18px'}}   onClick={() => handleDeleteShow(item.userId, item.userName)}/>}
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <Row className="mb-3">
        <Col>
          <h3>Admin Page</h3>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleShow} icon={<PlusOutlined />}>
            Add New Admin
          </Button>
          <Button variant="primary" onClick={toggleInputs} className="ms-3">
            <SearchOutlined />
          </Button>
        </Col>
      </Row>

      {showInput && <UserFilter handleGetListUseres={handleGetListUseres} />}

      <Table
        columns={columns}
        dataSource={userList.items}
        pagination={false}
        rowKey={(record) => record.userId}
         bordered
        size="middle"
        
      />

      <Pagination
        className="float-end mt-3 me-4"
        current={userList.page}
        pageSize={itemsPerPage}
        total={userList.total_count}
        onChange={(page, pageSize) => handleGetListUseres(page, pageSize)}
      />

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
        usertype="2"
      />
    </>
  );
}
