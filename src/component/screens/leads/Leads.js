import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Pagination } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { deleteleaduser, isactive, leadlistuser } from '../../axios/Service';
import DeleteModalLead from '../../../Components/leadModal.js/DeleteModalLead';
import { handleleadsdata } from '../../redux/reducers/Logintoken';
import Leaddropdown from '../../../Components/leadModal.js/Leaddropdown';
import bookmarkimage1 from '../../assests/bookmark-white.png';
import bookmarkimage2 from '../../assests/bookmark.png';
import EmployeeDropdown from '../../../Components/leadModal.js/EmployeeDropdown';

export default function Leads() {
  const leadsSelector = useSelector((state) => state.authLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [leaduserlist, setLeaduserlist] = useState(null);
  const [todelete, settoDelete] = useState(false);
  const [Value, setValue] = useState(null);
  const [deleteusername, setdeleteusername] = useState(null);
  const [isShowModal, setisShowModal] = useState({
    isShow: false,
    data: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
 
  const [leaddropdowns,setleaddropdowns]=useState(false);
  const [leadid,setleadid]=useState(null);
  const [employeedropdown,setemployyedropdown]=useState(false);


  const handleDeleteClose = () => settoDelete(false);
  const handleDeleteShow = (id, deleteusername) => {
    setValue(id);
    setdeleteusername(deleteusername);
    settoDelete(true);
  };

  useEffect(() => {
    dispatch(handleleadsdata(isShowModal));
  }, [isShowModal]);

  const handleleadsuserList = (page = 1, size = 6) => {
    let formdata = new FormData();
    formdata.append("token", leadsSelector.token);
    leadlistuser(page, size, formdata)
      .then((response) => {
        setLeaduserlist(response?.data?.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (leadsSelector?.token) {
      handleleadsuserList(1, itemsPerPage);
    }
  }, [leadsSelector?.token]);

  const handleDeleteUser = (id) => {
    let formdata = new FormData();
    formdata.append("token", leadsSelector.token);
    formdata.append("leadId", id);
    deleteleaduser(formdata).then((response) => {
      handleDeleteClose();
      handleleadsuserList(currentPage, itemsPerPage);
    });
  };
console.log("leaduserlist",leaduserlist)
  const handleSerialNo = (index) => {
    return (currentPage - 1) * itemsPerPage + index + 1;
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    handleleadsuserList(page, pageSize);
  };

  const handleleaddropdownshow=(id)=>{
    setleadid(id);
    setleaddropdowns(true);
  }
  
  const handledropdownclose=(id)=>{
    setleaddropdowns(false);
  }
  const handleemployeedropdownshow=(id)=>{
    setleadid(id);
    setemployyedropdown(true);

  }
  const handleemployeedropdownclose=()=>{
    setemployyedropdown(false);
  }
  const handleDropdownChange=(event)=>{
    setleadid(event.target.value)
  }

  
  const isActive=(item)=>{
    let formdata= new FormData();
    formdata.append('token',leadsSelector.token);
    formdata.append('leadId',item.leadId);
    const newIsActiveValue = item.isActive === 0 ? 1 : 0;
    formdata.append('isActive',newIsActiveValue);
   
    isactive(formdata).then((response)=>{
      console.log("active status",response);
      handleleadsuserList();
    })
  }
  return (
    <>
      <div className="row">
        <div className="col-2">
          <h3>Leads Page</h3>
        </div>
        <div className="col-10">
          <Button
            variant="primary"
            onClick={() => {
              setisShowModal({ data: null, isShow: true });
              navigate('/dashboard/leadsdata');
            }}
            className="float-end"
          >
            Add Lead
          </Button>
          <Button variant="primary" className="float-end me-3">
            <SearchOutlined />
          </Button>
        </div>
      </div>
      <div className="border border-black rounded">
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th className="p-2 text-center">Serial No</th>
              <th className="p-2 text-center">Name</th>
              <th className="p-2 text-center">Phone</th>
              <th className="p-2 text-center">ReceivedDate</th>
              <th className="p-2 text-center">Address</th>
              <th className="p-2 text-center">IsActive</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaduserlist?.items.map((item, index) => (
              <tr key={item.id} style={{ textAlign: "center", verticalAlign: "middle" }}>
                <td className="text-center">{handleSerialNo(index)}</td>
                <td className="text-center">{item.leadName}</td>
                <td className="text-center">{item.mobile}</td>
                <td className="text-center">{item.receivedAt}</td>
                <td className="text-center">{item.leadId}</td>
                <td className="text-center"   onClick={() =>isActive(item) } >{item.isActive === 0 ?<img src={bookmarkimage1} style={{width:'15px',height:'15px'}}  alt='dkd' />  : <img src={bookmarkimage2} style={{width:'15px',height:'15px'}}  alt='dkd' /> }</td>
                <td>
                  <Button
                    variant="danger"
                    className="ms-5"
                    onClick={() => handleDeleteShow(item.leadId, item.leadName)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="success"
                    className="ms-5"
                    onClick={() => {
                      setisShowModal({ isShow: true, data: item });
                      navigate('/dashboard/leadsdata', { state: { isShow: true, data: item } });
                    }}
                  >
                    Edit
                  </Button>
                 
                  <Button
                    variant="success"
                    className="ms-5"
                    onClick={() =>handleleaddropdownshow(item.leadId) }
                  >
                    updateStatus
                  </Button>
                  <Button
                    variant="success"
                    className="ms-5"
                  onClick={() =>handleemployeedropdownshow(item.leadId)}
                  >
                    ReAssign
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <DeleteModalLead
          todelete={todelete}
          handleDeleteClose={handleDeleteClose}
          displayusername={deleteusername}
          handleDeleteUser={handleDeleteUser}
          deleteuserid={Value}
        />
        <Pagination
          current={currentPage}
          align='end'
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          total={leaduserlist?.total_count || 0}
        />

           <Leaddropdown
                leaddropdowns={leaddropdowns}
                handledropdownclose={handledropdownclose}
                leadid={leadid}
                onChange={handleDropdownChange}
            
            />
            <EmployeeDropdown
              employeedropdown={employeedropdown}
              leadid={leadid}
              handleemployeedropdownclose={handleemployeedropdownclose}
              onChange={handleDropdownChange}
            />
      </div>
    </>
  );
}
