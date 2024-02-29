import { useRef } from "react";

export interface IUseForm {
    id: string,
    label: string,
    inputRef: React.RefObject<HTMLInputElement>
  }

  export interface IUseFormPasswordConfirm {
    passwordField: IUseForm,
    passwordConfirmField: IUseForm
  }

  export interface IUseFormAdress {
    streetNrField: IUseForm,
    zipcodeField: IUseForm,
    cityField: IUseForm,
    bundeslandField:IUseForm
  }