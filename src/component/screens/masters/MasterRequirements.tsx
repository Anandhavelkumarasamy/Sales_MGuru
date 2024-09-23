import React, { useEffect, useState } from "react";
import { useToken } from "../../../utility/hooks";
import { Table, Tooltip, Pagination } from "antd";
import { requirementslist } from "../../axios/Service";
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
  masterlistprops,
  requirementitem,
} from "../../../@types/masterrequirementsprops";
import { ColumnsType } from "antd/es/table";
import { Helmet } from "react-helmet";

export default function MasterRequirements() {
  const token = useToken();
  const [requirementList, setrequirementList] = useState<masterlistprops>({
    items: [],
    page: 1,
    total_count: 0,
  });
  const [show, setShow] = useState<boolean>(false);
  const [todelete, settoDelete] = useState<boolean>(false);
  const [deleteuserid, setDeleteuserid] = useState<requirementitem | null>(
    null
  );
  const [updateId, setupdateid] = useState<requirementitem | null>(null);
  const [showInput, setshowInput] = useState<boolean>(false);
  const [apivalue, setapivalue] = useState<string>("");

  const toggleInputs = () => setshowInput((pre) => !pre);

  const handleUpdateShow = (data: requirementitem) => {
    setupdateid(data);
    setapivalue("requirements");
    setShow(true);
  };
  console.log("deleteuserid", deleteuserid);
  const itemsPerPage = 10;

  const handleShow = () => {
    setupdateid(null);
    setapivalue("requirement");
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleDeleteShow = (item: requirementitem) => {
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

  const handleGetMasterCategoryList = (page = 1, size = 5, name = "") => {
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("name", name);
    requirementslist(page, size, formdata).then((response) => {
      setrequirementList(response?.data?.data);
      console.log(response?.data?.data, "enquirycatergy");
    });
  };

  const columns: ColumnsType<requirementitem> = [
    {
      title: "Serial No",

      key: "serialNo",
      render: (text: string, item: requirementitem, index: number) =>
        (requirementList.page - 1) * itemsPerPage + index + 1,
      align: "center",
    },
    // {
    //   title: "ID",
    //   dataIndex: "RequirementsId",
    //   key: "RequirementsId",
    //   align: "center",
    // },
    {
      title: "Name",
      dataIndex: "RequirementsName",
      key: "RequirementsName",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text: string, item: requirementitem) => (
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

  return (
    <>
      <div>
        <Helmet>
          <title>MasterRequirements</title>
          <meta name="keywords" content="dashboard,dash,home" />
          {/* <h1>Welcome to My React Website</h1> */}
        </Helmet>
      </div>
      <Row className="mb-3">
        <Col>
          <h3>Master Requirements</h3>
        </Col>
        <Col className="text-end">
          <Button style={{ background: "#002244" }} onClick={handleShow}>
            Add New Requirements
          </Button>
          <Button
            style={{ background: "#002244" }}
            onClick={toggleInputs}
            className="ms-3"
          >
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
        dataSource={requirementList?.items}
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
        apivalue={"enquiry_type"}
      />
      <CreateModalMaster
        show={show}
        handleClose={handleClose}
        masterapical={handleGetMasterCategoryList}
        updateId={updateId}
        apivalue={apivalue}
      />
      <Pagination
        className="float-end mt-3 me-4"
        current={requirementList?.page}
        pageSize={itemsPerPage}
        total={requirementList?.total_count}
        onChange={(page, pageSize) =>
          handleGetMasterCategoryList(page, pageSize)
        }
      />
    </>
  );
}
