export interface IUseForm {
    id: string,
    label: string,
    inputRef: React.RefObject<HTMLInputElement>
  }

  export interface IUseForm2 {
    id: string,
    label: string,
    onChange: (value: string) => void; // callback,
    regex: RegExp  
  }

  export interface IUseFormTextArea {
    id: string,
    label: string,
    onChange: (value: string) => void; // callback,
    placeholder: string,
    minRows: number,
    maxRows: number
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