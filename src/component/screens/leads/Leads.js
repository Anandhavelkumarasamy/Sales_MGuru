import React, { useEffect, useState } from 'react';
import { Button, Table, Tooltip, message, Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteleaduser, leadlistuser } from '../../axios/Service';
import DeleteModalLead from '../../../Components/leadModal.js/DeleteModalLead';
import { handleleadsdata } from '../../redux/reducers/Logintoken';
import Leaddropdown from '../../../Components/leadModal.js/Leaddropdown';
import EmployeeDropdown from '../../../Components/leadModal.js/EmployeeDropdown';
import LeadFilter from '../../../Components/leadModal.js/LeadFilter';
import IsactiveModal from '../../../Components/leadModal.js/IsactiveModal';
import bookmarkimage1 from '../../assests/bookmark-white.png';
import bookmarkimage2 from '../../assests/bookmark.png';
import trash from '../../assests/trash.png';
import update from '../../assests/data-processing.png';
import updatestatus from '../../assests/search.png';
import reassign from '../../assests/shift.png';
import { useToken } from '../../../utility/hooks';
import { 
  StarOutlined, 
  StarFilled, 
  DeleteOutlined, 
  EditOutlined, 
  SyncOutlined, 
  UserSwitchOutlined 
} from '@ant-design/icons';

export default function Leads() {
  const token = useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [leaduserlist, setLeaduserlist] = useState(null);
  const [todelete, settoDelete] = useState(false);
  const [Value, setValue] = useState(null);
  const [deleteusername, setdeleteusername] = useState(null);
  const [leaddropdowns, setleaddropdowns] = useState(false);
  const [leadid, setleadid] = useState(null);
  const [employeedropdown, setemployyedropdown] = useState(false);
  const [showinputsfilter, setshowinputsfilter] = useState(false);
  const [showisactive, setshowisactive] = useState(false);
  const [isactiveitem, setisactiveitem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleDeleteClose = () => settoDelete(false);
  const toggleInputs = () => setshowinputsfilter(pre => !pre);
  const handleDeleteShow = (id, deleteusername) => {
    setValue(id);
    setdeleteusername(deleteusername);
    settoDelete(true);
  };

  useEffect(() => {
    dispatch(handleleadsdata({ isShow: false, data: null }));
  }, []);
  const handleemployeedropdownshow=(id)=>{
    setleadid(id);
    setleaddropdowns(true);
  }

  const handleleadsuserList = (page = 1, size = 10, data = {}) => {
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

  useEffect(() => {
    if (token) {
      handleleadsuserList(currentPage, itemsPerPage, {});
    }
  }, [token, currentPage]);

  const handleDeleteUser = (id) => {
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("leadId", id);
    deleteleaduser(formdata).then((response) => {
      if (response.data.status === 1) {
        message.success(`User ${deleteusername} deleted successfully`);
        handleDeleteClose();
        handleleadsuserList(currentPage, itemsPerPage);
      }else{
        message.error(response.data.msg)
       }
    });
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    handleleadsuserList(page, pageSize);
  };

  const columns = [
    {
      title: 'Serial No',
      render: (text,item, index) => (currentPage - 1) * itemsPerPage + index + 1,
      align: 'center',
    },
    {
      title: 'Name',
      dataIndex: 'leadName',
      key: 'leadName',
      align: 'center',
    },
    {
      title: 'Phone',
      dataIndex: 'mobile',
      key: 'mobile',
      align: 'center',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: 'IsActive',
      key: 'isActive',
      render: (text, record) => (
        <Tooltip title={record.isActive === 0 ? 'Not bookmarked' : 'Bookmarked'}>
          {record.isActive === 0 ? (
            <StarOutlined 
              style={{ fontSize: '18px', color: '#050a30' }} 
              onClick={() => {
                setshowisactive(true);
                setisactiveitem(record);
              }}
            />
          ) : (
            <StarFilled 
              style={{ fontSize: '18px', color: '#050a30' }} 
              onClick={() => {
                setshowisactive(true);
                setisactiveitem(record);
              }}
            />
          )}
        </Tooltip>
      ),
      align: 'center',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <div>
          <Tooltip placement="bottom" title="Delete">
            <DeleteOutlined 
              style={{ fontSize: '20px', color: '#ff4d4f', marginRight: '20px' }} 
              onClick={() => handleDeleteShow(record.leadId, record.leadName)}
            />
          </Tooltip>
          <Tooltip placement="bottom" title="Update">
            <EditOutlined 
              style={{ fontSize: '20px', color: '#52c41a', marginRight: '20px' }} 
              onClick={() => {
                navigate('/dashboard/leadsdata', { state: { isShow: true, data: record } });
              }}
            />
          </Tooltip>
          <Tooltip placement="bottom" title="Update Status">
            <SyncOutlined 
              style={{ fontSize: '20px', color: '#1890ff', marginRight: '20px' }} 
              onClick={() => handleemployeedropdownshow(record.leadId)}
            />
          </Tooltip>
          <Tooltip placement="bottom" title="Reassign">
            <UserSwitchOutlined 
              style={{ fontSize: '20px', color: '#faad14' }} 
              onClick={() => setemployyedropdown(true)}
            />
          </Tooltip>
        </div>
      ),
      align: 'center',
    },
  ];

  return (
    <>
      <div className="row">
        <div className="col-2">
          <h3>Leads Page</h3>
        </div>
        <div className="col-10">
          <Button
            type="primary"
            onClick={() => {
              navigate('/dashboard/leadsdata');
            }}
            className="float-end"
          >
            Add Lead
          </Button>
          <Button type="primary" onClick={toggleInputs} className="float-end me-3">
            <SearchOutlined />
          </Button>
        </div>
        <br />
        {showinputsfilter && <LeadFilter handleleadsuserList={handleleadsuserList} />}
      </div>
      <div >
        <Table
          columns={columns}
          dataSource={leaduserlist?.items}
          pagination={false}
          rowKey="id"
          bordered
        />
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          total={leaduserlist?.total_count || 0}
          style={{ margin: '16px 0' }}
        className='float-end'
        />
        <Leaddropdown
          leaddropdowns={leaddropdowns}
          handledropdownclose={() => setleaddropdowns(false)}
          leadid={leadid}
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
