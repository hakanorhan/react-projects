export interface IUseForm {
    id: string,
    label: string,
    inputRef: React.RefObject<HTMLInputElement>
  }

  export interface IUseForm2 {
    id: string,
    label: string,
    onChange: (value: string) => void; // callback,
    regex: RegExp,
    refresh?: boolean
  }

  export interface IUseFormTextArea {
    id: string,
    label: string,
    onChange: (value: string) => void; // callback,
    placeholder: string,
    minRows: number,
    maxRows: number,
    refresh?: boolean
  }

  export interface IUseFormPasswordConfirm {
    id: string,
    label: string,
    onChange: (value: string) => void; // callback,
    password1: string,
    regex: RegExp
  }

  export interface IUseFormAdress {
    streetNrField: IUseForm,
    zipcodeField: IUseForm,
    cityField: IUseForm,
    bundeslandField:IUseForm
  }

  export interface IUseFormCheckbox {
    onChange: (value: string) => void;
    id: string;
    label: string;
    refresh: boolean;
  }