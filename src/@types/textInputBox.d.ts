export type TextInputBoxProps={
    title?: string;
    value: string;
    onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    errorText?:string | string[] | FormikErrors<any> | FormikErrors<any>[] | null;
    name?: string;
    onBlurs?: (event: React.FocusEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    isPassword?: boolean;   
}