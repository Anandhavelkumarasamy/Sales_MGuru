import React, { useEffect, useState } from "react";
import { useToken } from "../../../utility/hooks";
import { Table, Tooltip, Pagination } from "antd";
import {  enquirylist } from "../../axios/Service";
import { Row, Col, Button } from "react-bootstrap";

import {
  DeleteOutlined,
  SearchOutlined,
  EditOutlined,
} from "@ant-design/icons";
import DeleteModalMaster from "../../../Components/masterModal/DeleteModalMaster";
import CreateModalMaster from "../../../Components/masterModal/CreateModalMaster";
import CategoryFilter from "../../../Components/masterModal/CategoryFilter";

export default function MasterEnquiry() {
  const token = useToken();
  const [enquiryList, setenquiryList] = useState({});
  const [show, setShow] = useState(false);
  const [todelete, settoDelete] = useState(false);
  const [deleteuserid, setDeleteuserid] = useState(null);
  const [updateId, setupdateid] = useState(null);
  const [showInput, setshowInput] = useState(false);
  const [apivalue,setapivalue]=useState("")
  

  const toggleInputs = () => setshowInput((pre) => !pre);

  const handleUpdateShow = (data) => {
    setupdateid(data);
    setapivalue("Enquiry");
    setShow(true);
    console.log("datassss", data);
  };
  const itemsPerPage = 10;


  const handleShow = () => {
    setupdateid(null);
    setapivalue("enquiry");
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
    enquirylist(page, size, formdata).then((response) => {
      setenquiryList(response?.data?.data);
      console.log(response?.data?.data, "enquirycatergy");
    });
  };

  const columns = [
    {
      title: "Serial No",

      key: "serialNo",
      render: (text, item, index) =>
        (enquiryList.page - 1) * itemsPerPage + index + 1,
      align: "center",
    },
    // {
    //   title: "ID",
    //   dataIndex: "enquireId",
    //   key: "enquireId",
    //   align: "center",
    // },
    {
      title: "Name",
      dataIndex: "enquireTypeName",
      key: "enquireTypeName",
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
          <h3>Master Enquiry</h3>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleShow}>
            Add New Enquiry
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
        dataSource={enquiryList.items}
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
        current={enquiryList?.page}
        pageSize={itemsPerPage}
        total={enquiryList?.total_count}
        onChange={(page, pageSize) =>
          handleGetMasterCategoryList(page, pageSize)
        }
      />
    </>
  );
}
