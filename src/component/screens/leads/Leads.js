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
import bookmarkimage2 from '../../assests/bookmark.png'

import EmployeeDropdown from '../../../Components/leadModal.js/EmployeeDropdown';
import { message,Tooltip } from 'antd';
import LeadFilter from '../../../Components/leadModal.js/LeadFilter';
import IsactiveModal from '../../../Components/leadModal.js/IsactiveModal';
import trash from '../../assests/trash.png';
import update from '../../assests/data-processing.png';
import updatestatus from '../../assests/search.png';
import reassign from '../../assests/shift.png'
import { useToken } from '../../../utility/hooks';


export default function Leads() {
  const token=useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [leaduserlist, setLeaduserlist] = useState(null);
  const [todelete, settoDelete] = useState(false);
  const [Value, setValue] = useState(null);
  const [deleteusername, setdeleteusername] = useState(null);
  const [leaddropdowns,setleaddropdowns]=useState(false);
  const [leadid,setleadid]=useState(null);
  const [employeedropdown,setemployyedropdown]=useState(false);
  const [showinputsfilter,setshowinputsfilter]=useState(false);
  const [showisactive,setshowisactive]=useState(false);
  const [isactiveitem,setisactiveitem]=useState(null);
  const [isactivename,setisactivename]=useState(null);
  const handleDeleteClose = () => settoDelete(false);
  const toggleInputs=()=>{
    setshowinputsfilter(pre=>!pre);
  }
  const [isShowModal, setisShowModal] = useState({
    isShow: false,
    data: null,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
 
  const handleshowisactive = (item) => {
    setshowisactive(true);
    setisactiveitem(item);
    // setisactivename(item.leadName);
  };
  console.log(isactiveitem,"isactiveitemsdsdsfdfd")
  
  const handlecloseisactive = () => {
    setshowisactive(false);
  };
  const handleDeleteShow = (id, deleteusername) => {
    setValue(id);
    setdeleteusername(deleteusername);
    settoDelete(true);
  };

  useEffect(() => {
    dispatch(handleleadsdata(isShowModal));
  }, [isShowModal]);

  const handleleadsuserList = (page = 1, size = 6,data={}) => {
    let formdata = new FormData();
    console.log(data,"dataleads")
    formdata.append("token", token);

    formdata.append("name", data.leadName ?data.leadName: ""  );
     formdata.append("state", data.state || "");
     formdata.append("phone", data.mobile ? data.mobile: "");
    leadlistuser(page, size, formdata)
      .then((response) => {
        setLeaduserlist(response?.data?.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (token) {
      handleleadsuserList(1, itemsPerPage, {});
    }
  }, [token]);

  const handleDeleteUser = (id) => {
    let formdata = new FormData();
    formdata.append("token",token);
    formdata.append("leadId", id);
    deleteleaduser(formdata).then((response) => {
      if(response.data.status===1)
        message.success(`User ${deleteusername} deleted successfully`);
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

      //  const messageText = newIsActiveValue === 1 
      //   ? `${item.leadName} has been bookmarked successfully!` 
      //   : `${item.leadName} has been unbookmarked successfully!`;

      // message.success(messageText); 
  

  
  
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
          <Button variant="primary" onClick={toggleInputs} className="float-end me-3">
            <SearchOutlined />
          </Button>
        </div>

        <br></br>
        {showinputsfilter && (<LeadFilter handleleadsuserList={handleleadsuserList}/>)}

      </div>
      <div className="border border-black rounded">
        <table className="table table-striped">
          <thead className="thead-light">
            <tr>
              <th className="p-2 text-center">Serial No</th>
              <th className="p-2 text-center">Name</th>
              <th className="p-2 text-center">Phone</th>
              
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
             
                <td className="text-center">{item.address}</td>
                <td className="text-center" onClick={() => handleshowisactive(item)}>
                       <img
                       src={item.isActive === 0  ? bookmarkimage1   :  bookmarkimage2 }
                       style={{ width: '15px', height: '15px' }}
                       alt={item.isActive === 0   ? "Not bookmarked"    : "Bookmarked"}
                     />
  </td>

                <td>



                  {/* <Button
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
                  </Button> */}


                  <Tooltip placement="bottom" title="Delete">
                    <img src={trash}
                    alt="trash"
                    className="mx-3"
                    onClick={() => handleDeleteShow(item.leadId, item.leadName)}
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                    />
                  </Tooltip>
                  <Tooltip placement="bottom" title='update'>
                  <img src={update}
                  alt="update"
                  className="mx-3"
                  onClick={() => {
                    setisShowModal({ isShow: true, data: item });
                    navigate('/dashboard/leadsdata', { state: { isShow: true, data: item } });
                  }}
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}/>
                  </Tooltip>
                  <Tooltip placement="bottom" title="updatestatus">
                    <img src={updatestatus}
                    alt="trash"
                    className="mx-3"
                    onClick={() =>handleleaddropdownshow(item.leadId) }
                    style={{ cursor: "pointer", width: "20px", height: "20px" }}
                    />
                  </Tooltip>
                  <Tooltip placement="bottom" title='reassign'>
                  <img src={reassign}
                  alt="reassign"
                  className="mx-3"
                  onClick={() =>handleemployeedropdownshow(item.leadId)}
                  style={{ cursor: "pointer", width: "20px", height: "20px" }}/>
                  </Tooltip>
                 
                  {/* <Button
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
                  </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
<IsactiveModal
 showisactive={showisactive}
 handlecloseisactive={handlecloseisactive}
//  username={isactivename}
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
        <Pagination
          current={currentPage}
          align='end'
          pageSize={itemsPerPage}
          onChange={handlePageChange}
          total={leaduserlist?.total_count || 0}
        />
<br></br>
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
