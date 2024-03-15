import { FormBaureihe, FormBaureiheSelect } from "../../../autos-backend/src/interfaces/IAxiosData";
import * as REGEX from "../../../autos-backend/src/regex/regex";

export interface IAtLeastMessage {
    message: string,
    pattern: RegExp,
    // specific regular expression
    isValid: boolean
}

const iAtLeastMessages: IAtLeastMessage[] = [
    { message: "Atleast one lowercase character", pattern: REGEX.REGEX_LOWERCASE, isValid: false },
    { message: "Atleast one Uppercase character", pattern: REGEX.REGEX_UPPERCASE, isValid: false },
    { message: "Atleast one number", pattern: REGEX.REGEX_NUMBER, isValid: false },
    { message: "Atleast one special symbol #?!@$ %^&*-", pattern: REGEX.REGEX_SPECIAL, isValid: false },
    { message: "Should have atleast 8 characters", pattern:REGEX.REGEX_MIN_8, isValid: false },
    { message: "Password is valid", pattern: REGEX.REGEX_PASSWORD, isValid: false }
];

/**
 * 
 * @param formularValues 
 */
export function formularValuesValidSignIn(email: string, password: string): boolean {
    return REGEX.REGEX_EMAIL.test(email) && REGEX.REGEX_PASSWORD.test(password);
}

export function formularEmailValid(valueEmail: string): boolean {
    return REGEX.REGEX_EMAIL.test(valueEmail);
}

export function formularPasswordValid(valuePassword: string): boolean {
    return REGEX.REGEX_PASSWORD.test(valuePassword);
}

/**
 * using in handleOnChange function.
 * on every change the doValid function checks with regular expression.
 * @param valuePassword current value
 * @returns 
 */
export function passwordSpecificValid(valuePassword: string):IAtLeastMessage[] {

    const iAtLeastMessagesValid: IAtLeastMessage[] = [];

    for(let i = 0; i < iAtLeastMessages.length; i++) {
        const iAtLeastMessage = iAtLeastMessages[i];
        // current value matches the regular expression element 
        iAtLeastMessage.isValid = (iAtLeastMessages[i].pattern).test(valuePassword);
        iAtLeastMessagesValid[i] = iAtLeastMessage;
    }
    return iAtLeastMessagesValid;
}

/**
 * Checks at first passoword1 and password2 and then the 
 * equality of password1 and password2.
 * @param password1 SignUp Password1
 * @param password2 SignUp Password2
 * @returns true, if password1 and password2 matches the password regular expression
 *  and password1, password2 are equal
 */
export function password2Valid(password1: string, password2: string) {
    return (formularPasswordValid(password1) && formularPasswordValid(password2))
        ? password1 === password2
        : false;
}

export function formularSignUpIsValid(name: string, familyname: string, email: string,
        password1: string, password2: string) {

    return formularNameValid(name) && formularNameValid(familyname) && formularEmailValid(email) && formularPasswordValid(password1) && formularPasswordValid(password2)
        && password2Valid(password1, password2);
}

export function formularNameValid(value: string) {
    return REGEX.REGEX_NAMES.test(value);
}

export function formularBaureiheIsValid(form: FormBaureihe, formSelect: FormBaureiheSelect) {
    
    return REGEX.REGEX_BAUREIHE.test(form.baureihe) && REGEX.REGEX_HUBRAUM.test(form.kw) && REGEX.REGEX_HUBRAUM.test(form.hubraum) && 
        formSelect.brand && formSelect.cartype && formSelect.model;
}