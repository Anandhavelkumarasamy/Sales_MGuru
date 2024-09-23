import React, { useEffect, useState } from "react";
import { Button, Table, Tooltip, message, Pagination, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteleaduser, leadlistuser } from "../../axios/Service";
import DeleteModalLead from "../../../Components/leadModal.js/DeleteModalLead";
import { handleleadsdata } from "../../redux/reducers/Logintoken";
import Leaddropdown from "../../../Components/leadModal.js/Leaddropdown";
import EmployeeDropdown from "../../../Components/leadModal.js/EmployeeDropdown";
import LeadFilter from "../../../Components/leadModal.js/LeadFilter";
import IsactiveModal from "../../../Components/leadModal.js/IsactiveModal";
import { ColumnsType } from "antd/es/table";
import { useToken } from "../../../utility/hooks";
import styles from "./Leads.module.css";
import {
  StarOutlined,
  StarFilled,
  DeleteOutlined,
  EditOutlined,
  SyncOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import {
  LeadItems,
  leaduserlistprops,
  RecordType,
} from "../../../@types/leads";
import { Helmet } from "react-helmet";

export default function Leads() {
  const token = useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [leaduserlist, setLeaduserlist] = useState<leaduserlistprops>({
    items: [],
    page: 1,
    total_count: 0,
  });
  const [todelete, settoDelete] = useState<boolean>(false);
  const [Value, setValue] = useState<number | null>(null);
  const [deleteusername, setdeleteusername] = useState<string>("");
  const [leaddropdowns, setleaddropdowns] = useState<boolean>(false);
  const [leadid, setleadid] = useState<number | null>(null);
  const [employeedropdown, setemployyedropdown] = useState<boolean>(false);
  const [showinputsfilter, setshowinputsfilter] = useState<boolean>(false);
  const [showisactive, setshowisactive] = useState<boolean>(false);
  const [isactiveitem, setisactiveitem] = useState<RecordType | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  const handleDeleteClose = () => settoDelete(false);
  const toggleInputs = () => setshowinputsfilter((pre) => !pre);
  const handleDeleteShow = (id: number, deleteusername: string) => {
    setValue(id);
    setdeleteusername(deleteusername);
    settoDelete(true);
  };
  console.log(leaduserlist, "leaduserlisttt");
  useEffect(() => {
    dispatch(handleleadsdata({ isShow: false, data: null }));
  }, []);
  const handleemployeedropdownshow = (id: number) => {
    setleadid(id);
    setleaddropdowns(true);
  };

  const handleleadsuserList = (
    page: number = 1,
    size: number = 10,
    data: { leadName?: string; state?: string; mobile?: string } = {}
  ) => {
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("name", data.leadName || "");
    formdata.append("state", data.state || "");
    formdata.append("phone", data.mobile || "");
    leadlistuser(page, size, formdata)
      .then((response) => {
        setLeaduserlist(response?.data?.data);
      })
      .catch((error) => console.log(error));
  };
  console.log(leaduserlist, "leadss");
  useEffect(() => {
    if (token) {
      handleleadsuserList(currentPage, itemsPerPage, {});
    }
  }, [token, currentPage]);

  const handleDeleteUser = (id: number | null) => {
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("leadId", id?.toString() || "");
    deleteleaduser(formdata).then((response) => {
      if (response?.data?.status === 1) {
        message.success(`User ${deleteusername} deleted successfully`);
        handleDeleteClose();
        handleleadsuserList(currentPage, itemsPerPage);
      } else {
        message.error(response.data.msg);
      }
    });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    handleleadsuserList(page, pageSize);
  };

  const columns: ColumnsType<LeadItems> = [
    {
      title: "Serial No",
      render: (text: any, item: LeadItems, index: number) =>
        (currentPage - 1) * itemsPerPage + index + 1,
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "leadName",
      key: "leadName",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "mobile",
      key: "mobile",
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "LeadStatusName",
      dataIndex: "leadStatusName",
      key: "leadStatusName",
      align: "center",
    },

    {
      title: "IsActive",
      key: "isActive",

      render: (text: any, record: RecordType) => (
        <Tooltip
          title={record.isActive === 0 ? "Not bookmarked" : "Bookmarked"}
        >
          {record.isActive === 0 ? (
            <StarOutlined
              className={styles.staricon}
              onClick={() => {
                setshowisactive(true);
                setisactiveitem(record);
              }}
            />
          ) : (
            <StarFilled
              className={styles.starfilledicon}
              onClick={() => {
                setshowisactive(true);
                setisactiveitem(record);
              }}
            />
          )}
        </Tooltip>
      ),
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",

      render: (text: any, record: RecordType) => (
        <Space size="middle">
          <Tooltip placement="bottom" title="Delete">
            <DeleteOutlined
              className={styles.deleteleadicon}
              onClick={() => handleDeleteShow(record.leadId, record.leadName)}
            />
          </Tooltip>
          <Tooltip placement="bottom" title="Update">
            <EditOutlined
              className={styles.editleadicon}
              onClick={() => {
                navigate("/dashboard/leadsdata", {
                  state: { isShow: true, data: record },
                });
              }}
            />
          </Tooltip>
          <Tooltip placement="bottom" title="Update Status">
            <SyncOutlined
              className={styles.syncoutlineicon}
              onClick={() => handleemployeedropdownshow(record.leadId)}
            />
          </Tooltip>
          <Tooltip placement="bottom" title="Reassign">
            <UserSwitchOutlined
              className={styles.userswitchicon}
              onClick={() => setemployyedropdown(true)}
            />
          </Tooltip>
        </Space>
      ),
      align: "center",
    },
  ];

  return (
    <>
      <div>
        <Helmet>
          <title>Lead</title>
          <meta name="keywords" content="dashboard,dash,home" />
        </Helmet>
      </div>
      <div className="row">
        <div className="col-6">
          <h3>Leads Page</h3>
        </div>
        <div className="col-6">
          <Button
            onClick={() => {
              navigate("/dashboard/leadsdata");
            }}
            className="float-end text-white"
          >
            Add Lead
          </Button>
          <Button onClick={toggleInputs} className="float-end me-3">
            <SearchOutlined className="text-white" />
          </Button>
        </div>
        <br />
        {showinputsfilter && (
          <LeadFilter handleleadsuserList={handleleadsuserList} />
        )}
      </div>
      <div>
        <Table
          columns={columns}
          dataSource={leaduserlist?.items}
          pagination={false}
          rowKey="id"
          bordered
          rowClassName={(record) =>
            record.isActive === 1 ? "active-row" : "inactive-row"
          }
          className="  table-responsive mx-auto"
        />
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          total={leaduserlist?.total_count || 0}
          className=" float-end mt-4"
        />
        <Leaddropdown
          leaddropdowns={leaddropdowns}
          handledropdownclose={() => setleaddropdowns(false)}
          leadid={leadid}
          errorText={null}
        />
        <EmployeeDropdown
          employeedropdown={employeedropdown}
          leadid={leadid}
          handleemployeedropdownclose={() => setemployyedropdown(false)}
        />
        <IsactiveModal
          showisactive={showisactive}
          handlecloseisactive={() => setshowisactive(false)}
          handleleadsuserList={handleleadsuserList}
          isactiveitem={isactiveitem}
        />
        <DeleteModalLead
          todelete={todelete}
          handleDeleteClose={handleDeleteClose}
          displayusername={deleteusername}
          handleDeleteUser={handleDeleteUser}
          deleteuserid={Value}
        />
      </div>
    </>
  );
}
