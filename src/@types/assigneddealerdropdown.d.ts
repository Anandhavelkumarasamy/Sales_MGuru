export type assigneddealerdropdownprops={
    value: string;
    onChange: (selectedId: string) => void;
    errorText?:string | string[] | FormikErrors<any> | FormikErrors<any>[] | null;
  
}
export type dealeritems={
    userId:string,
    userName:string,
}