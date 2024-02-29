import Address from "./Address.js";

interface IRequestSignUp {
    name: string,
    familyname: string,
    email: string,
    password: string,
    password2: string,
    isCarDealer: boolean
}

export interface IRequestSignUpEmployee {
    name: string,
    familyname: string,
    email: string,
    password: string,
    password2: string,
    birth: string,
    adress: Address
}

export interface IResponseSignup {
    message: string
}

export interface IResponseSignUpEmployee {
    name: string,
    id: string,
    role: string
}

export default IRequestSignUp;