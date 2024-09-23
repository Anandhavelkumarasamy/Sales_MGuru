import React, { useEffect, useState } from "react";
import { deleteuser, listuser } from "../../axios/Service";
import { Button } from "react-bootstrap";
import { Table, Pagination, Tooltip, message, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import UserFilter from "../../../Components/userManagementModals/UserFilter";
import CreateModal from "../../../Components/userManagementModals/CreateModal";
import DeleteModal from "../../../Components/userManagementModals/DeleteModal";
import { useToken } from "../../../utility/hooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  EmployeeItems,
  employeeuserlistprops,
  showmodalprops,
} from "../../../@types/employee";
import { ColumnsType } from "antd/es/table";
import { Helmet } from "react-helmet";
import styles from "./Usermanagement.module.css";

export default function Employee() {
  const token = useToken();
  const [userList, setUserList] = useState<employeeuserlistprops>({
    items: [],
    page: 1,
    total_count: 0,
  });
  const [Value, setValue] = useState<number | null>(null);
  const [deleteUsername, setDeleteUsername] = useState<string>("");
  const [toDelete, setToDelete] = useState<boolean>(false);
  const [showInput, setShowInput] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<showmodalprops>({
    isShow: false,
    data: null,
  });

  const toggleInputs = () => setShowInput((prev) => !prev);

  const itemsPerPage = 10;

  const handleGetListUsers = (
    page: number = 1,
    size: number = 10,
    data: { userName?: string; email?: string; phoneNumber?: string } = {}
  ) => {
    console.log(data, "employeetsx");
    let formData = new FormData();
    formData.append("type", "4");
    formData.append("token", token);
    if (data.userName) {
      formData.append("username", data.userName);
    }

    listuser(page, size, formData)
      .then((response) => setUserList(response?.data?.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (token) {
      handleGetListUsers(1, itemsPerPage, {});
    }
  }, [token]);
  console.log(userList, "userlistemployeepage");

  const handleDeleteUser = (id: number | null) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("userId", id?.toString() || "");

    deleteuser(formData)
      .then((response) => {
        if (response.data.status === 1) {
          message.success(`User ${deleteUsername} deleted successfully`);
        }
        setToDelete(false);
        handleGetListUsers();
      })
      .catch((error) => error);
  };

  const columns: ColumnsType<EmployeeItems> = [
    {
      title: "Serial No",
      key: "serialNo",
      render: (text: string, record: EmployeeItems, index: number) =>
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
      render: (text, record) => (
        <Space size="middle">
          <Tooltip title="Delete" placement="bottom">
            <DeleteOutlined
              type="text"
              className={styles.dealerdeleteicon}
              onClick={() => {
                setValue(record.userId);
                setDeleteUsername(record.userName);
                setToDelete(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Update" placement="bottom">
            <EditOutlined
              type="text"
              className={styles.dealerediticon}
              onClick={() => setIsShowModal({ data: record, isShow: true })}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div>
        <Helmet>
          <title>Employee</title>
          <meta name="keywords" content="dashboard,dash,home" />
        </Helmet>
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <h3>Employee Page</h3>
        </div>
        <div className="col-6">
          <Button
            onClick={() => setIsShowModal({ data: null, isShow: true })}
            className={`float-end me-3 text-white `}
          >
            Add Employee
          </Button>
          <Button
            onClick={toggleInputs}
            className={`float-end me-3 text-white  `}
          >
            <SearchOutlined />
          </Button>
        </div>
      </div>

      {showInput && (
        <div className="mb-2">
          <UserFilter handleGetListUseres={handleGetListUsers} />
        </div>
      )}

      <div>
        <Table
          columns={columns}
          dataSource={userList?.items}
          pagination={false}
          rowKey="id"
          bordered
          className=" table-responsive mx-auto"
        />
        {userList.total_count > 10 ? (
          <Pagination
            className="float-end "
            pageSize={itemsPerPage}
            current={userList.page}
            total={userList.total_count}
            onChange={(page, size) => {
              handleGetListUsers(page, size);
            }}
            style={{ marginTop: "16px" }}
          />
        ) : null}

        <DeleteModal
          todelete={toDelete}
          handleDeleteClose={() => setToDelete(false)}
          deleteuserid={Value}
          handleDeleteUser={handleDeleteUser}
          displayusername={deleteUsername}
        />
        {isShowModal.isShow && (
          <CreateModal
            editData={
              isShowModal?.data
                ? {
                    ...isShowModal.data,
                    userId: isShowModal.data.userId.toString(),
                  }
                : null
            }
            show={isShowModal.isShow}
            handleClose={() => setIsShowModal({ data: null, isShow: false })}
            handleGetListUseres={handleGetListUsers}
            usertype={"4"}
          />
        )}
      </div>
    </>
  );
}
