export type customerdropdownprops = {
  value: string;
  onChange: (event: string) => void;
  errorText?:
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[]
    | null;
};
export type customercategorydataprops = {
  categoryId: string;
  categoryName: string;
};
