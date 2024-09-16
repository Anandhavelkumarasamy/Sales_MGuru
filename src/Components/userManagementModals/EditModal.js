// import React,{useState} from 'react'
// import * as Yup from 'yup';
// import { useSelector } from 'react-redux';
// import { viewuser } from '../../component/axios/Service';
// import { adduser } from '../../component/axios/Service';
// import { updateuser } from '../../component/axios/Service';
// import { Modal, Button } from "react-bootstrap";
// import { useFormik } from 'formik';
// import TextInputBox from './TextInputBox';
// import { useToken } from '../../utility/hooks';
// const validationSchema= Yup.object({
//   name: Yup.string()
//       .matches(/^[a-zA-Z0-9$]+$/, 'Name is invalid')
//       .required('Name is required'),
//   userName: Yup.string()
//       .matches(/^[a-zA-Z0-9$]+$/, 'Username is invalid')
//       .required('Username is required'),
//   phoneNumber: Yup.string()
//       .matches(/^[0-9$]+$/, 'Phone number is invalid')
//       .required('Phone number is required'),
//   userType: Yup.string()
//       .matches(/^[a-zA-Z0-9$]+$/, 'Type is invalid')
//       .required('Type is required'),
//   email: Yup.string()
//       .email("The email is incorrect"),
//   landline_number: Yup.string()
//       .matches(/^[0-9$]+$/, 'Landline number is invalid'),
//   state: Yup.string()
//       .matches(/^[a-zA-Z$]+$/, 'State is invalid'),
//   city: Yup.string()
//       .matches(/^[a-zA-Z$]+$/, 'City is invalid'),
//   country: Yup.string()
//       .matches(/^[a-zA-Z$]+$/, 'Country is invalid'),
//   password: Yup.string()
//       .matches(/^[a-zA-Z0-9$]+$/, 'Password is invalid'),
//   pincode: Yup.string()
//       .matches(/^[a-zA-Z0-9$]+$/, 'Pincode is invalid'),
//   dealer_id: Yup.string()
//       .matches(/^[a-zA-Z0-9$]+$/, 'Dealer ID is invalid'),
// })

// export default function EditModal({toupdate,handleUpdateClose,editid}) {
    

//     const token=useToken();
// //   const handleEditClose = () => {
// //     settoUpdate(false);
// // }
// // // const [updatedvalue,setupdatedvalue]=useState([]);

// const [show, setShow] = useState(false);

//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);

//   const handleUpdateUser=()=>{
//     let formdata=new FormData();
//     formdata.append("token",token);
//     formdata.append("userId",values.userId);
//     formdata.append("name",values.name);
//     formdata.append("userName",values.userName);
//     formdata.append("phoneNumber",values.phoneNumber);
//     formdata.append("userType",values.userType);
//     formdata.append("email",values.email);
//     formdata.append("landline_number",values.whatsapp_no);
//     formdata.append("state",values.stateName);
//     formdata.append("city",values.cityName);
//     formdata.append("country",values.countryName);
//     formdata.append("pincode",values.pincode);
//     formdata.append("dealer_id",values.dealer_id);
//     updateuser(formdata).then((response)=>{
//         console.log('UserUpdated Successfully',response.data.data);
       
//     })
//     // handleEditClose();
//      handleUpdateClose();

// }
//   const handleUpdateShow=(editid)=>{
        
//     let formdata=new FormData();
//     formdata.append("token", token);
//     formdata.append("userId",editid);
//     viewuser(formdata).then((response)=>{
//       const updatedvalue = response.data.data;
//       console.log(response.data.data,"updated values"); 
//     setValues({
//         name: updatedvalue.name||'',
//         userName: updatedvalue.userName ||'',
//         phoneNumber: updatedvalue.phoneNumber ||'',
//         userType: updatedvalue.userType || '',
//         email: updatedvalue.email || '',
//         whatsapp_no: updatedvalue.whatsapp_no || '',
//         stateName: updatedvalue.stateName || '',
//         cityName: updatedvalue.cityName || '',
//         countryName: updatedvalue.countryName || '',
//         userId:updatedvalue.userId || '',
//         pincode: updatedvalue.pincode || '',
//         dealer_id: updatedvalue.dealerId || '',
//     });
//     // if(updatedvalue){
//     //     settoUpdate(true); 
//     // }
  
//     }).catch((err) => {
//         console.log(err)
//     })
// };
// const {  values,errors,touched,handleChange,handleBlur,setValues,handleSubmit}=useFormik({
//   initialValues: {
//       name: '',
//       userName: '',
//       phoneNumber: '',
//       userType: '',
//       email: '',
//       landline_number: '',
//       state: '',
//       city: '',
//       country: '',
//       password: '',
//       pincode: '',
//       dealer_id: '',
//   },
//   validationSchema: validationSchema,
//   onSubmit: (values) => {
      
//       let formdata = new FormData();
//       formdata.append('name', values.name);
//       formdata.append('userName', values.userName);
//       formdata.append('phoneNumber', values.phoneNumber);
//       formdata.append('userType', values.userType);
//       formdata.append('device_type', '2');
//       formdata.append("token", token);
//       formdata.append("email", values.email);
//       formdata.append("landline_number", values.landline_number);
//       formdata.append("state", values.state);
//       formdata.append("city", values.city);
//       formdata.append('country', values.country);
//       formdata.append('password', values.password);
//       formdata.append('pincode', values.pincode);
//       formdata.append('dealer_id', values.dealer_id);

//       adduser(formdata)
//           .then((response) => {
//               console.log(response.data.data);
//               handleUpdateShow();
//               handleClose();
//           })
//           .catch((error) => {
//               console.log('Error:', error);
//           });
//       }
      
//   ,
// });
//   return (
//     <div>
//         <Modal show={toupdate} onHide={handleUpdateClose}>
//                     <Modal.Header closeButton >
//                         <Modal.Title> Update an Existing domain</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <form onSubmit={handleUpdateUser}>
//                             <div className="mb-3">
//                             <TextInputBox title={"Name"}   
                                 
//                                  value={values.name}
//                                onchange={handleChange('name')} 
                                  
//                                placeholder="Enter name"
//                                onBlurs={handleBlur}
//                                 errorText={touched.name && errors.name ? errors.name :null }/>
//                             </div>

//                             <div className="mb-3">
//                             <TextInputBox title={"user Name"}   
                                 
//                                  value={values.userName}
//                                onchange={handleChange('userName')} 
                                  
//                                placeholder="Enter username"
//                                onBlurs={handleBlur}
//                                 errorText={touched.userName && errors.userName ? errors.userName :null }/>
//                             </div>

                          
//                             <div className="mb-3">
//                             <TextInputBox 
//                                 title={"Phone Number"}
//                                 value={values.phoneNumber}
//                                 onchange={handleChange('phoneNumber')}
//                                 placeholder='Enter phone Number'
//                                 errorText={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber:null}
//                                 />
//                             </div>

//                             <div className="mb-3">
//                             <TextInputBox title={"User Type"}
//                                 value={values.userType}
//                                 onchange={handleChange('userType')}
//                                 placeholder='Enter user type'
//                                 errorText={touched.userType && errors.userType ? errors.userType:null}
//                                 />
//                             </div>

//                             <div className="mb-3">
//                             <TextInputBox title={"Email"}
                               
//                                 value={values.email}
//                                 onchange={handleChange('email')}
                        
//                                 placeholder='Enter email'
//                                 errorText={touched.email && errors.email ? errors.email:null}
//                                 />
//                             </div>

//                             <div className="mb-3">
                               
//                           <TextInputBox title={"Landline Number"}
                             
//                                 value={values.landline_number}
//                                 onchange={handleChange('landline_number')}
                               
//                                 placeholder='Enter landline number'
//                                 errorText={touched.landline_number && errors.landline_number ? errors.landline_number:null}
//                                 />
//                             </div>

//                             <div className="mb-3">
//                             <TextInputBox title={"State"}
                             
//                                 value={values.state}
//                                 onchange={handleChange('state')} 
//                                 placeholder='Enter state'
//                                 errorText={touched.state && errors.state ? errors.state:null}
//                                 />
//                             </div>

//                             <div className="mb-3">
//                             <TextInputBox title={"City"}
                              
//                                 value={values.city}
//                                 onchange={handleChange('city')}
                            
//                                 placeholder='Enter city'
//                                 errorText={touched.city && errors.city ?errors.city: null}
//                                 />
//                             </div>

//                             <div className="mb-3">
//                             <TextInputBox title={"Country"}
                              
//                                 value={values.country}
//                                 onchange={handleChange('country')}
                             
//                                 placeholder='Enter country'
//                                 errorText={touched.country && errors.country ? errors.country:null}
//                                 />
//                             </div>

//                             <div className="mb-3">
                               
//                                <TextInputBox title={"Password"}
//                                    value={values.password}
//                                    onchange={handleChange('password')}
//                                    placeholder='Enter password'
//                                    errorText={touched.password && errors.password ? errors.password:null}
//                                    />
//                                </div>

//                                <div className="mb-3">
//                             <TextInputBox title={"Pincode"}
                              
//                                 value={values.pincode}
//                                 onchange={handleChange('pincode')}
                               
//                                 placeholder='Enter pincode'
//                                 errorText={touched.pincode && errors.pincode? errors.pincode:null}
//                                 />
//                             </div>

//                             <div className="mb-3">
                                
//                                 <TextInputBox title={"Dealer ID"}
                               
//                                 value={values.dealer_id}
//                                 onchange={handleChange('dealer_id')}
//                                 placeholder='Enter dealer_id'
//                                 errorText={touched.dealer_id && errors.dealer_id? errors.dealer_id:null}
//                                 />
//                             </div>

//                             <Button type="submit" variant="primary">Update</Button>
//                         </form>
//                     </Modal.Body>
//                 </Modal>
//     </div>
//   )
// }
