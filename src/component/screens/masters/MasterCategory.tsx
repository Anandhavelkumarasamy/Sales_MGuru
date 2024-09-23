import React, { useEffect, useState } from "react";
import { useToken } from "../../../utility/hooks";
import { Table, Tooltip, Pagination, message } from "antd";
import { categorylist } from "../../axios/Service";
import { Row, Col, Button } from "react-bootstrap";

import {
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import DeleteModalMaster from "../../../Components/masterModal/DeleteModalMaster";
import CreateModalMaster from "../../../Components/masterModal/CreateModalMaster";
import CategoryFilter from "../../../Components/masterModal/CategoryFilter";
import {
  CategoryItem,
  categorylistprops,
} from "../../../@types/mastercategory";
import { ColumnsType } from "antd/es/table";
import { Helmet } from "react-helmet";

export default function MasterCategory() {
  const token = useToken();
  const [categoryList, setcategoryList] = useState<categorylistprops>({
    items: [],
    page: 1,
    total_count: 0,
  });
  const [show, setShow] = useState<boolean>(false);
  const [todelete, settoDelete] = useState<boolean>(false);
  const [deleteuserid, setDeleteuserid] = useState<CategoryItem | null>(null);
  const [updateId, setupdateid] = useState<CategoryItem | null>(null);
  const [showInput, setshowInput] = useState<boolean>(false);
  const apivalue = "category";

  const toggleInputs = () => setshowInput((pre) => !pre);

  const handleUpdateShow = (data: CategoryItem) => {
    setupdateid(data);
    setShow(true);
    console.log("data", data);
  };
  const itemsPerPage = 10;

  const handleShow = () => {
    setupdateid(null);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleDeleteShow = (item: CategoryItem) => {
    console.log(item, "item");

    setDeleteuserid(item);
    settoDelete(true);
  };
  const handleDeleteClose = () => {
    settoDelete(false);
  };

  useEffect(() => {
    if (token) {
      handleGetMasterCategoryList(1, itemsPerPage, "");
    }
  }, [token]);

  const handleGetMasterCategoryList = (page = 1, size = 10, name = "") => {
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("name", name);
    categorylist(page, size, formdata).then((response) => {
      if (response.data.status === 1) {
        setcategoryList(response?.data?.data);
        console.log(response?.data?.data, "mastercatergy");
      } else {
        message.error(response.data.msg);
      }
    });
  };

  const columns: ColumnsType<CategoryItem> = [
    {
      title: "Serial No",

      key: "serialNo",
      render: (text: any, item: CategoryItem, index: number) =>
        (categoryList.page - 1) * itemsPerPage + index + 1,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "customerCategoryName",
      key: "customerCategoryName",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text: any, item: CategoryItem) => (
        <>
          <Tooltip title="Delete" placement="bottom">
            <DeleteOutlined
              type="text"
              style={{ color: "red", margin: "0 10px", fontSize: "18px" }}
              onClick={() => handleDeleteShow(item)}
            />
          </Tooltip>
          <Tooltip title="Update" placement="bottom">
            <EditOutlined
              type="text"
              style={{ color: "blue", fontSize: "18px", margin: "0 10px" }}
              onClick={() => handleUpdateShow(item)}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  console.log(updateId, "toddelete");
  return (
    <>
      <div>
        <Helmet>
          <title>MasterCategory</title>
          <meta name="keywords" content="dashboard,dash,home" />
        </Helmet>
      </div>
      <Row className="mb-3">
        <Col>
          <h3>Master Category</h3>
        </Col>
        <Col className="text-end">
          <Button style={{ background: "#002244" }} onClick={handleShow}>
            Add New Category
          </Button>
          <Button onClick={toggleInputs} className="ms-3">
            <SearchOutlined />
          </Button>
        </Col>
      </Row>

      {showInput && (
        <div className="mb-5">
          <CategoryFilter
            handleGetMasterCategoryList={handleGetMasterCategoryList}
          />
        </div>
      )}
      <Table
        columns={columns}
        dataSource={categoryList.items}
        pagination={false}
        rowKey={(record) => record.customerCategoryId}
        bordered
        size="middle"
      />

      <DeleteModalMaster
        todelete={todelete}
        handleDeleteClose={handleDeleteClose}
        deleteuserid={deleteuserid}
        apical={handleGetMasterCategoryList}
        apivalue={apivalue}
      />
      <CreateModalMaster
        show={show}
        handleClose={handleClose}
        masterapical={handleGetMasterCategoryList}
        updateId={updateId}
        apivalue={apivalue}
      />
      <Pagination
        className="float-end mt-3 pagination-responsive"
        current={categoryList?.page}
        pageSize={itemsPerPage}
        total={categoryList?.total_count}
        onChange={(page, pageSize) =>
          handleGetMasterCategoryList(page, pageSize, "")
        }
      />
    </>
  );
}
