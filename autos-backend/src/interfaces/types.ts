import { Roles } from "../enums/Roles.js"
import { SelectFieldEnums } from "../enums/SelectFieldEnums.js"

export interface Brand {
    brandId: number,
    brand: string
}

export interface Model {
    modelId: number,
    model: string
}

export interface FederalState {
    federalStateId: number,
    federalState: string
}

export interface Cartype {
    cartypeId: number,
    cartype: string
}

export interface Price {
    priceId: number,
    price: number
}

export interface RequestAxiosDataModel {
    brandid: string,
    model: string
}



// ---- Axios Data Packet ---
export interface AxiosDataPacketBrand {
    dataBrands: Brand[],
    message: string
}

export interface AxiosDataPacketModel {
    dataModels: Model[],
    message: string,
    brand: string
}

// ------  Login Register -----------
export interface AxiosDataPacketSignin {
        authenticated: boolean,
        role: Roles,
        errorMessage?: string
    
}

// ------- Detail search -------------
export interface AxiosDetailsearch {
    inseratId: number,
    brand: string,
    model: string,
    price: number,
    transmission: string,
    mileageKm: number,
    registrtionYear: number,
    registrationMonth: number,
    powerPS: number,
    vehicleOwners: number,
    accident: boolean,
    fuel: string,
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
    federalState: string,
    companyName: string,
    impressum: string,
    foreName: string,
    sureName: string,
    telNr: string,
    streetNr: string | null,
    since: string
  }

// -------- AxiosDataPacketStaticSearch -------
export interface AxiosDataPacketStatic {
    models: Model[],
    brands: Brand[],
    federalStates: FederalState[],
    cartypes: Cartype[],
    prices: Price[]
} 
export interface Searchparams {
    brandid: string | SelectFieldEnums,
    modelid: string | SelectFieldEnums,
    price: string | SelectFieldEnums,
    cartypeid: string | SelectFieldEnums,
    blandid: string | SelectFieldEnums,
    dateFrom: number | SelectFieldEnums | undefined,
    dateTo: number | SelectFieldEnums | undefined
}

// ---------- Sign In -------------------------
export interface SignInForm {
    email: string,
    password: string
  }
/**
 * Axios Packet for signin and authentication.
 */
export interface AuthResponse {
    authenticated: boolean,
    role: Roles,
    errorMessage?: string
}

// ----------- Sign Up -------------------------
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

  export interface AxiosDataSignup {
    form: SignUpForm,
    selectedBundesland: string,
    isCheckedDealer: boolean,
    isCheckedEmail: boolean,
    isCheckedTelefon: boolean,
    formattedDate: string,
    telefonNr: string,
  }