import Address from "./Address.js"
/**
 * Person inherits admin, user and service.
 */
interface RegisterPersonInfo {
    name: string,
    familyname: string,
    email: string,
    password1: string,
    password2:string,
    telnr: string | null,
    birth: any,
    isactive: Boolean,
    address: Address
}

export default RegisterPersonInfo;