// import React, { useEffect, useState } from 'react';
// import { Select } from 'antd';
// import { countrydropdown } from '../component/axios/Service';
// import { useSelector } from 'react-redux';

// export default function CountryDropdown({ value, onChange, errorText }) {
//   const objectToken = useSelector((state) => state.authLogin);
//   const [storecountry, setStorecountry] = useState([]);

//   const handleCountrydropdown = () => {
//     let formdata = new FormData();
//     formdata.append("token", objectToken.token);
//     countrydropdown(formdata).then((response) => {
//       setStorecountry(response.data.data);
//       console.log(response.data.data,"countrydropdown");

//     });
//   };

//   useEffect(() => {
//     handleCountrydropdown();
//   }, [objectToken.token]);

//   return (
//     <div> <br></br>
//       <label  >Country</label>
//       <Select
//         style={{ width: '100%' }}
//         placeholder="Select a country"
//         value={value}  
//         onChange={onChange}  
       
//         options={storecountry.map((country) => ({
//           value: country.id,  
//           label: country.name,  
//         }))}
//       />
//       {errorText && <div style={{ color: 'red', marginTop: '5px' }}>{errorText}</div>}
//     </div>
//   );
// }
