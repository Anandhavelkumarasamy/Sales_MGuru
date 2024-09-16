import React,{useState} from 'react'
import{EyeOutlined,EyeInvisibleOutlined} from '@ant-design/icons'
import classes from './TextInputBox.module.css';

import { TextInputBoxProps } from '../../@types/textInputBox';
export default function TextInputBox({title,value,onchange,placeholder,errorText,name,onBlurs,isRequired=false,isPassword=false}:TextInputBoxProps) {

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    console.log('fgh');
    setIsPasswordVisible((prev) => !prev);
  }; 
  return (
    <div >


 {title  && <p className="form-label" >{title} {isRequired && <span className='text-danger'>*</span>}</p>}
<div className={classes.inputboxcontainer1} >
  <div style={{width:isPassword ? '87%': '100%'}}  >
   <input    type={isPasswordVisible ? 'password' : 'text'} value={value} onChange={onchange}  placeholder={placeholder} onBlur={onBlurs} className={classes.inputboxcontainer3} />
   </div>

{ isPassword && <div className={classes.inputboxcontainer4} >



<div onClick={togglePasswordVisibility} role='button'>
  {isPasswordVisible  ?   <EyeInvisibleOutlined/>  : <EyeOutlined/> }
   </div>

</div>}
</div>

{errorText && (
  <p className={`text-danger ${classes.errortext} ${errorText ? classes.showError : ''}`}>
    {errorText}
  </p>
)}

      
    </div>
  )
}