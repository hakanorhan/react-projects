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
  city: string,
  isCarDealer?: boolean
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

export interface AxiosDataImagesNames {
  imagename: string,
  firstplace: boolean,
  carId: number
}

export interface AxiosDataPublish {
  inserateId: null | number | undefined | string,
  canPublish: boolean
}
