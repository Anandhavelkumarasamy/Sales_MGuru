import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Table, Tooltip, Pagination, message, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import UserFilter from "../../../Components/userManagementModals/UserFilter";
import CreateModal from "../../../Components/userManagementModals/CreateModal";
import DeleteModal from "../../../Components/userManagementModals/DeleteModal";
import { listuser, deleteuser } from "../../axios/Service";
import { useToken } from "../../../utility/hooks";
import { User, userlistprops } from "../../../@types/admin";
import { DealerItems } from "../../../@types/dealer";
import { ColumnsType } from "antd/es/table";
import { Helmet } from "react-helmet";
import styles from "./Usermanagement.module.css";

export default function Dealer() {
  const token = useToken();
  const [userList, setUserList] = useState<userlistprops>({
    items: [],
    page: 1,
    total_count: 0,
  });
  const [showInput, setShowInput] = useState<boolean>(false);
  const [todelete, setToDelete] = useState<boolean>(false);
  const [deleteUsername, setDeleteUsername] = useState<string>("");
  const [value, setValue] = useState<number | null>(null);
  const [isShowModal, setIsShowModal] = useState<{
    isShow: boolean;
    data: DealerItems | null;
  }>({ isShow: false, data: null });

  const itemsPerPage = 10;

  useEffect(() => {
    if (token) {
      handleGetListUsers(1, itemsPerPage, {});
    }
  }, [token]);

  const handleGetListUsers = (
    page: number = 1,
    size: number,
    data: { userName?: string; email?: string; phoneNumber?: string } = {}
  ) => {
    console.log(data, "dealerdata");
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

  const handleDeleteUser = (id: number | null) => {
    if (id === null) return;
    let formData = new FormData();
    formData.append("token", token);
    formData.append("userId", id.toString());

    deleteuser(formData).then((response) => {
      if (response.data.status === 1) {
        message.success(`User ${deleteUsername} deleted successfully`);
      }
      handleGetListUsers(1, itemsPerPage, {});
      setToDelete(false);
    });
  };

  const columns: ColumnsType<DealerItems> = [
    {
      title: "Serial No",
      key: "serialNo",
      render: (text: any, record: DealerItems, index: number) =>
        (userList?.page - 1) * itemsPerPage + index + 1,
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
      render: (text: any, record: DealerItems) => (
        <Space size="middle">
          <Tooltip title="Delete" placement="bottom">
            <DeleteOutlined
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
          <title>Dealer</title>
          <meta name="keywords" content="dashboard,dash,home" />
        </Helmet>
      </div>
      <div className="row mb-2">
        <div className="col-6">
          <h3>Dealer Page</h3>
        </div>
        <div className="col-6">
          <Button
            onClick={() => setIsShowModal({ data: null, isShow: true })}
            className={`float-end`}
          >
            Add Dealer
          </Button>
          <Button
            onClick={() => setShowInput((prev) => !prev)}
            className={`float-end me-3 `}
          >
            <SearchOutlined />
          </Button>
        </div>
      </div>

      {showInput && (
        <div className="mb-5">
          <UserFilter handleGetListUseres={handleGetListUsers} />
        </div>
      )}

      <div>
        <Table
          columns={columns}
          dataSource={userList.items}
          pagination={false}
          rowKey="userId"
          bordered
          className={` table-responsive mx-auto${styles.customTable}`}
        />

        {userList.total_count > 10 && (
          <Pagination
            className="mt-4"
            pageSize={itemsPerPage}
            align="end"
            onChange={(val, size) => handleGetListUsers(val, size)}
            total={userList.total_count}
          />
        )}

        <DeleteModal
          todelete={todelete}
          handleDeleteClose={() => setToDelete(false)}
          displayusername={deleteUsername}
          handleDeleteUser={handleDeleteUser}
          deleteuserid={value}
        />
        {isShowModal.isShow && (
          <CreateModal
            editData={
              isShowModal.data
                ? {
                    ...isShowModal.data,
                    userId: isShowModal.data.userId.toString(),
                  }
                : null
            }
            show={isShowModal.isShow}
            handleClose={() => setIsShowModal({ data: null, isShow: false })}
            handleGetListUseres={handleGetListUsers}
            usertype={"3"}
          />
        )}
      </div>
    </>
  );
}
