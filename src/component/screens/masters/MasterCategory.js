import React, { useEffect, useState } from 'react'
import { useToken } from '../../../utility/hooks'
import { Table,Tooltip } from 'antd';
import { categorylist } from '../../axios/Service';

import {DeleteOutlined} from "@ant-design/icons";

export default function MasterCategory() {
   const token=useToken();
   const [categoryList,setcategoryList]=useState({});
   useEffect(()=>{
    handleGetMasterCategoryList();
   },[token]);
  const handleGetMasterCategoryList=()=>{
    let formdata=new FormData();
    formdata.append('token',token);
    categorylist(formdata).then((response)=>{
      setcategoryList(response.data.data);
      console.log(response.data,"mastercatergy");
    })
  }
  
   const columns =[
    {
      title: 'Serial No',

      key:'serialNo',
      align:'center',
    },
    {
      title:'Name',
      dataIndex: 'customerCategoryName',
      key:'customerCategoryName',
      align:'center',
    },{
      title:'Phone Number',
      dataIndex: 'createdBy',
      key:'createdBy',
      align:'center',
    },{
      title:'Actions',
      key:'actions',
      align:'center',
      render:(text,item)=>(
        <Tooltip title='Delete' placement="bottom">
          {
            <DeleteOutlined type="text" style={{color:'red'}} onClick={()=>handleDeleteShow(item.userId, item.userName)} />
          }
        </Tooltip>
      )

    }
   ]

  return (
    <>
      <Row className='mb-3'>
        <Col>
        <h3>MasterCategory</h3>
        </Col>
      </Row>

      <Table
        columns={columns}
          dataSource={categoryList.items}
        />
    </>
  )
}
