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
  impressumdaten: string | null,
  companyname: string | null,
  // Address
  street: string,
  nr: string,
  city: string,
  zipcode: number
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
  unfallFahrzeug: boolean,
  scheckheft: boolean,
  fittodrive: boolean,
  abstandstempomat: boolean,
  ambientbeleuchtung: boolean,
  headupdisplay: boolean,
  totwinkelassistent: boolean
}

export interface AxiosDataInserate {
  inserateSelect: InserateSelect,
  inserateData: InserateData,
  inserateCheckbox: InserateCheckbox,
  klima: string
}

export interface AxiosSearch {
  brand: string,
  model: string,
  cartype: string,
  yearFrom: number,
  yearTo: number,
  bundesland: string,
  prices: string
}

export interface AxiosImageData {
  form: FormData,
  imageName: string
}

export interface AxiosInserateResponse {
  carId: number,
  message: string
}

export interface AxiosDetailsearch {
  carId: number,
  brand: string,
  model: string,
  price: number,
  km: number,
  year: number,
  month: number,
  transmission: string,
  advertiseddate: string,
  ps: number,
  hubraum: number,
  auNew: boolean,
  huNew: boolean,
  accident: boolean,
  cartype: string,
  previousOwner: number,
  doors: number,
  fuel: string,
  isCardealer: boolean,
  klima: string,
  description: string,
  scheckheft: boolean,
  fittodrive: boolean,
  abstandstempomat: boolean,
  ambientbeleuchtung: boolean,
  headupdisplay: boolean,
  totwinkelassistent: boolean
}

export interface AxiosDataImagesNames {
  imagename: string,
  firstplace: boolean,
  carId: number
}

export interface AxiosDataSignup {
  form: SignUpForm,
  selectedBundesland: string,
  isCheckedDealer: boolean,
  isCheckedEmail: boolean,
  isCheckedTelefon: boolean,
  isCheckedchat: boolean,
  formattedDate: string,
  telefonNr: string,
}

export interface AxiosDataPublish {
  carId: number | undefined,
  canPublish: boolean
}
