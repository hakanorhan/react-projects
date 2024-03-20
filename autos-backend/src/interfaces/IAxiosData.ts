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
  cartype: string,
  transmissionname: string,
  fuelname: string,
  doors: string
}

export interface InserateData {
  km : number,
  ps: number,
  description: string,
  previousOwner: number,
  year: number,
  month: number,
  price: number,
  hubraum: number
}

export interface InserateCheckbox {
  auNew: boolean,
  huNew: boolean,
  unfallFahrzeug: boolean
}

export interface AxiosDataInserate {
  inserateSelect: InserateSelect,
  inserateData: InserateData,
  inserateCheckbox: InserateCheckbox
}
