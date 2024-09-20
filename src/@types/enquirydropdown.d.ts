export type enquirydata = {
  enquiryId: string | number;
  enquiryName: string;
};
export type enquirydropdownprops = {
  value: string;
  onChange: (e: string) => void;
  errorText?:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | null;
};
