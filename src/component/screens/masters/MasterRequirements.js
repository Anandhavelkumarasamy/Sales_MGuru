import React, { useEffect, useState } from "react";
import { useToken } from "../../../utility/hooks";
import { Table, Tooltip, Pagination } from "antd";
import {   requirementslist } from "../../axios/Service";
import { Row, Col, Button } from "react-bootstrap";

import {
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import DeleteModalMaster from "../../../Components/masterModal/DeleteModalMaster";
import CreateModalMaster from "../../../Components/masterModal/CreateModalMaster";
import CategoryFilter from "../../../Components/masterModal/CategoryFilter";

export default function MasterRequirements() {
  const token = useToken();
  const [requirementList, setrequirementList] = useState({});
  const [show, setShow] = useState(false);
  const [todelete, settoDelete] = useState(false);
  const [deleteuserid, setDeleteuserid] = useState(null);
  const [updateId, setupdateid] = useState(null);
  const [showInput, setshowInput] = useState(false);
  const [apivalue,setapivalue]=useState("")
  

  const toggleInputs = () => setshowInput((pre) => !pre);

  const handleUpdateShow = (data) => {
    setupdateid(data);
    setapivalue("requirements");
    setShow(true);
    console.log("datassss", data);
  };
  const itemsPerPage = 10;


  const handleShow = () => {
    setupdateid(null);
    setapivalue("requirement");
    setShow(true);
  };



  const handleClose = () => {
    setShow(false);
  };
  const handleDeleteShow = (item) => {
    console.log(item,'item');
    
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

  const handleGetMasterCategoryList = (page=1, size=5, name = "") => {
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("name", name);
    requirementslist(page, size, formdata).then((response) => {
      setrequirementList(response?.data?.data);
      console.log(response?.data?.data, "enquirycatergy");
    });
  };

  const columns = [
    {
      title: "Serial No",

      key: "serialNo",
      render: (text, item, index) =>
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
      render: (text, item) => (
        <>
          <Tooltip title="Delete" placement="bottom">
            <DeleteOutlined

              type="text"
              style={{ color: "red", margin: "0 10px",fontSize: '18px' }}
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
      <Row className="mb-3">
        <Col>
          <h3>Master Requirements</h3>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleShow}>
            Add New Requirements
          </Button>
          <Button variant="primary"  onClick={toggleInputs} className="ms-3">
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
        dataSource={requirementList.items}
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
        deletuse
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
