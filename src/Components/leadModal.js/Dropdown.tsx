import React from "react";
import { Form } from "react-bootstrap";
import { customercategorydataprops } from "../../@types/customerdropdown";
import { enquirydata } from "../../@types/enquirydropdown";
import { requirementdropdownprops } from "../../@types/requirementsdropdown";
import { FormikErrors } from "formik";
import { employeedataprops } from "../../@types/assignedemployeedropdown";

interface DropdownProps {
  dropdowndata:
    | customercategorydataprops[]
    | enquirydata[]
    | requirementdropdownprops[]
    | employeedataprops[];

  dropdownid: string;
  dropdownname: string;
  errorText:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | undefined;
  dropdowntitle: string;
  value: string | number;
  onChange: (value: string) => void;
}

export default function Dropdown({
  dropdowndata,
  dropdownid,
  dropdownname,
  errorText,
  dropdowntitle,
  value,
  onChange,
}: DropdownProps) {
  // console.log(
  //   dropdowndata,
  //   "newdropdwonsss",
  //   dropdownid,
  //   dropdowntitle,
  //   dropdownname,
  //   dropdowndata[0]
  // );

  return (
    <Form.Group controlId={`${dropdowntitle}Dropdown`}>
      <Form.Label>
        Select a {dropdowntitle}
        {dropdowntitle === "requirement" ? (
          <span className="text-danger"> *</span>
        ) : null}
      </Form.Label>
      <Form.Control
        as="select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        style={{
          fontSize: "14px",
        }}
      >
        <option value="">Select a {dropdowntitle}</option>
        {dropdowndata?.map((item: any) => (
          <option key={item[dropdownid]} value={item[dropdownid]}>
            {/* {item[dropdownname].split("("[0])} */}
            {item[dropdownname]?.split("(")[0]}
          </option>
        ))}
      </Form.Control>
      <div className="text-danger">
        {Array.isArray(errorText)
          ? errorText.join(", ")
          : typeof errorText === "object"
          ? JSON.stringify(errorText)
          : errorText}
      </div>
    </Form.Group>
  );
}
