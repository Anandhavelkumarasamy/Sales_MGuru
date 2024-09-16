export type TextInputBoxProps={
    title?: string;
    value: string;
    onchange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    errorText?: string | null;
    name?: string;
    onBlurs?: (event: React.FocusEvent<HTMLInputElement>) => void;
    isRequired?: boolean;
    isPassword?: boolean;   
}