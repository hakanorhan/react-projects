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
  transmission: string,
  fuel: string,
  door: string
}

export interface InserateData {
  km : number,
  ps: number,
  description: string,
  previousOwner: number,
  year: number,
  month: number,
  price: number,
  hubraum: number,
  color: string
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
  federal_state: string,
  price: string
}

export interface AxiosImageData {
  form: FormData,
  imageName: string
}

export interface AxiosInserateResponse {
  carId: number,
  message: string
}

export interface AxiosPaper {
  inseratId: number,
  mileageKm: number,
  registrationYear: number,
  registrationMonth: number,
  psPower: number,
  vehicleOwners: number,
  fuel: string,
  accident: boolean,
  city: string
}

export interface AxiosPaperList {
  inseratId: number,
  brand: string,
  model: string,
  price: number,
  mileageKm: number,
  registrationYear: number,
  registrationMonth: number,
  psPower: number,
  fuel: string,
  accident: boolean,
  transmission: string,
  city: string,
  cartype: string, 
  federalState: string,
  isCarDealer: boolean,
  vehicleOwners: number
}

export interface AxiosDetailsearch {
  inseratId: number,
  brand: string,
  model: string,
  price: number,
  axiosPaper: AxiosPaper,
  transmission: string,
  inserateDate: string,
  cubicCapacity: number,
  auNew: boolean,
  huNew: boolean,
  cartype: string,
  doors: number,
  isCardealer: boolean,
  clima: string,
  description: string,
  scheckheft: boolean,
  fittodrive: boolean,
  abstandstempomat: boolean,
  ambientbeleuchtung: boolean,
  headupdisplay: boolean,
  totwinkelassistent: boolean,
  color: string,
  city: string,
  zipcode: string,
  federalState: string
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
  inserateId: null | number | undefined | string,
  canPublish: boolean
}
