export interface IUseForm {
    id: string,
    label: string,
    inputRef: React.RefObject<HTMLInputElement>
  }

  export interface IUseForm2 {
    id: string,
    label: string,
    onChange: (value: string) => void; // callback,
    regex?: RegExp,
    refresh?: boolean,
    maxLength?: number,
    checkEmail?: boolean | null
  }

  export interface IUseFormTextArea {
    padding?: string,
    id?: string,
    label?: string,
    onChange?: (value: string) => void; // callback,
    placeholder?: string,
    minRows: number,
    maxRows: number,
    refresh?: boolean,
    disbled: boolean,
    areaText?: string
  }

  export interface IUseFormPasswordConfirm {
    id: string,
    label: string,
    onChange: (value: string) => void; // callback,
    password1: string,
    regex: RegExp
  }

  export interface IUseFormAdress {
    streetNrField: IUseForm2,
    zipcodeField: IUseForm2,
    cityField: IUseForm2,
    bundeslandField:IUseForm2
  }

  export interface IUseFormCheckbox {
    onChange: (value: string) => void;
    id: string;
    label: string;
    refresh: boolean;
  }

 