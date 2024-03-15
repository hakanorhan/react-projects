export interface SignInForm {
  email: string,
  password: string
}

export interface SignUpForm {
  name: string,
  familyname: string,
  email: string,
  password1: string,
  password2: string,
  isDealer: boolean
}

export interface FormBaureiheSelect {
  brand: string,
  model: string,
  cartype: string
}

export interface FormBaureihe {
  baureihe: string,
  kw: string,
  hubraum: string
}

export interface AxiosDataBaureihe {
  formBaureiheSelect: FormBaureiheSelect,
  formBaureihe: FormBaureihe,
  from: number | undefined,
  to: number | undefined
}

export interface AxiosDataModel {
  brandid: string,
  model: string
}

// Car inserate
export interface InserateSelect {
  brand: string,
  model: string,
  baureihe: string,
  cartype: string,
  transmission: string,
  fuel: string
}

export interface InserateData {
  kilometerstand : string,
  kw: string,
  beschreibung: string
}

export interface AxiosDataInserate {
  inserateSelect: InserateSelect,
  inserateData: InserateData
}
