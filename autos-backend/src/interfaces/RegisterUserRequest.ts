import RegisterPersonInfo from "./RegisterPersonInfo.js";
/**
 * Important attributes for register.
 */
interface RegisterUserRequest {
    // user
    personinfo: RegisterPersonInfo,
    isCardealer: Boolean
    
}

export default RegisterUserRequest;