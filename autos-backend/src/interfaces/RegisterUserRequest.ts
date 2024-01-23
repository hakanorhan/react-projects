/**
 * Important attributes for register.
 */
interface RegisterUserRequest {
    // user
    name: string;
    familyname: string;
    email: string;
    password1: string;
    password2: string;
    telnr: string;
    birth: string;
}

export default RegisterUserRequest;