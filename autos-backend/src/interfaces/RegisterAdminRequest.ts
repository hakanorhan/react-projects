/**
 * Important attributes for register.
 */
interface RegisterAdminRequest {
    // admin
    persnr: string;
    name: string;
    familyname: string;
    email: string;
    password1: string;
    password2: string;
    grantpubliccar: Boolean;
    grantcreateadmin: Boolean;
    grantall: Boolean;
    createdbyadminid: number; 
}

export default RegisterAdminRequest;