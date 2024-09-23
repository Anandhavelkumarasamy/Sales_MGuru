import React, { useEffect, useState } from "react";
import { deleteuser, listuser } from "../../axios/Service";
import { Button, Row, Col } from "react-bootstrap";
import { Table, Tooltip, Pagination, message } from "antd";
import { SearchOutlined, DeleteOutlined } from "@ant-design/icons";
import CreateModal from "../../../Components/userManagementModals/CreateModal";
import DeleteModal from "../../../Components/userManagementModals/DeleteModal";
import UserFilter from "../../../Components/userManagementModals/UserFilter";
import { useToken } from "../../../utility/hooks";
import { User, userlistprops } from "../../../@types/admin";
import { ColumnsType } from "antd/es/table";
import { Helmet } from "react-helmet";
import styles from "./Usermanagement.module.css";

export default function Admin() {
  const token = useToken();
  const [show, setShow] = useState<boolean>(false);
  const [userList, setuserList] = useState<userlistprops>({
    items: [],
    page: 1,
    total_count: 0,
  });
  const [displayusername, setdisplayusername] = useState<string>("");
  const [todelete, settoDelete] = useState<boolean>(false);
  const [showInput, setshowInput] = useState<boolean>(false);
  const [deleteuserid, setdeleteuserid] = useState<number | null>(null);
  const itemsPerPage = 10;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => settoDelete(false);
  const handleDeleteShow = (userid: number, username: string) => {
    setdeleteuserid(userid);
    setdisplayusername(username);
    settoDelete(true);
  };

  const toggleInputs = () => setshowInput((pre) => !pre);
  useEffect(() => {
    if (token) {
      handleGetListUseres(1, itemsPerPage, {});
    }
  }, [token]);

  const handleGetListUseres = (
    page: number = 1,
    size: number,
    data: { userName?: string; email?: string; phoneNumber?: string } = {}
  ) => {
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
  console.log(userList, "adminpage");

  const handleDeleteUser = (deleteuserid: number | null) => {
    if (deleteuserid === null) return;
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("userId", deleteuserid.toString());
    deleteuser(formdata).then((response) => {
      if (response.data.status === 1) {
        message.success(`User ${displayusername} deleted successfully`);
        handleDeleteClose();
        handleGetListUseres(1, itemsPerPage, {});
      }
    });
  };

  const columns: ColumnsType<User> = [
    {
      title: "Serial No",
      key: "serialNo",
      render: (text: any, item: User, index: number) =>
        (userList.page - 1) * itemsPerPage + index + 1,
      align: "center",
    },

    {
      title: "Name",
      dataIndex: "userName",
      key: "userName",
      align: "center",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      align: "center",
    },
    {
      title: "Type",
      dataIndex: "userTypeName",
      key: "userTypeName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text: any, item: User) => (
        <Tooltip title="Delete" placement="bottom">
          {
            <DeleteOutlined
              type="text"
              className={styles.admindeleteicon}
              onClick={() => handleDeleteShow(item.userId, item.userName)}
            />
          }
        </Tooltip>
      ),
    },
  ];

  return (
    <>
      <div>
        <Helmet>
          <title>Admin</title>
          <meta name="keywords" content="dashboard,dash,home" />
        </Helmet>
      </div>
      <Row className="mb-3">
        <Col>
          <h3>Admin Page</h3>
        </Col>
        <Col className="text-end">
          <Button className={styles.btnbg} onClick={handleShow}>
            Add New Admin
          </Button>
          <Button onClick={toggleInputs} className={`ms-3 `}>
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
        className=" table-responsive mx-auto"
      />

      {userList.total_count > 10 && (
        <Pagination
          className="float-end mt-3 "
          current={userList.page}
          pageSize={itemsPerPage}
          total={userList.total_count}
          onChange={(page, pageSize) => handleGetListUseres(page, pageSize)}
        />
      )}

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
        handleGetListUseres={handleGetListUseres}
        usertype="2"
        editData={null}
      />
    </>
  );
}
