import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import classes from "./TextInputBox.module.css";

import { TextInputBoxProps } from "../../@types/textInputBox";
export default function TextInputBox({
  title,
  value,
  onchange,
  placeholder,
  errorText,
  onBlurs,
  isRequired = false,
  isPassword = false,
}: TextInputBoxProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev: boolean) => !prev);
  };

  return (
    <div>
      {title && (
        <p className="form-label">
          {title} {isRequired && <span className="text-danger">*</span>}
        </p>
      )}
      <div className={classes.inputboxcontainer1}>
        <div style={{ width: isPassword ? "87%" : "100%" }}>
          <input
            type={isPasswordVisible ? "password" : "text"}
            value={value}
            onChange={(event) => {
              console.log(event, "evvernttt");
              onchange(event);
            }}
            placeholder={placeholder}
            onBlur={onBlurs}
            className={classes.inputboxcontainer3}
          />
        </div>

        {isPassword && (
          <div className={classes.inputboxcontainer4}>
            <div onClick={togglePasswordVisibility} role="button">
              {isPasswordVisible ? (
                <EyeInvisibleOutlined className={classes.eyecolor} />
              ) : (
                <EyeOutlined className={classes.eyecolor} />
              )}
            </div>
          </div>
        )}
      </div>

      {errorText && (
        <p
          className={`text-danger mt-2 ${classes.errortext} ${
            errorText ? classes.showError : ""
          }`}
        >
          {errorText}
        </p>
      )}
    </div>
  );
}
