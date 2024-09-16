
import {React} from 'react'
import { Modal,Button } from 'react-bootstrap'
import { deletemasteruser } from '../../component/axios/Service';
import { message } from 'antd';
import { useToken } from '../../../src/utility/hooks';

export default function DeleteModalMaster({todelete,handleDeleteClose,deleteuserid,apivalue}) {
const token=useToken();
  console.log(token,"tokennnnn")
    const handleDeleteUser=(id)=>{
 let formdata=new FormData();
   formdata.append("token",token);
   formdata.append('dataId',id);
   deletemasteruser(apivalue,formdata).then((response)=>{
    if(response.data.status===1){
      message.success("deleted successfully")
    }
    else{
        message.failure("Deleting this category is restricted")
    }
   
   })    }
  return (
   
      <Modal show={todelete} onHide={handleDeleteClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are You sure?{deleteuserid?.customerCategoryName || deleteuserid?.enquireTypeName }</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleDeleteClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => handleDeleteUser(deleteuserid?.customerCategoryId || deleteuserid?.enquireId)}>
              ok
            </Button>
          </Modal.Footer>
        </Modal>

  )
}
