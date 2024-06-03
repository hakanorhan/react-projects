import * as REGEX from '../regex/regex.js';
const iAtLeastMessages = [
    { message: "Atleast one lowercase character", pattern: REGEX.REGEX_LOWERCASE, isValid: false },
    { message: "Atleast one Uppercase character", pattern: REGEX.REGEX_UPPERCASE, isValid: false },
    { message: "Atleast one number", pattern: REGEX.REGEX_NUMBER, isValid: false },
    { message: "Atleast one special symbol #?!@$ %^&*-", pattern: REGEX.REGEX_SPECIAL, isValid: false },
    { message: "Should have atleast 8 characters", pattern: REGEX.REGEX_MIN_8, isValid: false },
    { message: "Password is valid", pattern: REGEX.REGEX_PASSWORD, isValid: false }
];
export function formularValuesValidSignIn(email, password) {
    return REGEX.REGEX_EMAIL.test(email) && REGEX.REGEX_PASSWORD.test(password);
}
export function formularEmailValid(valueEmail) {
    return REGEX.REGEX_EMAIL.test(valueEmail);
}
export function formularPasswordValid(valuePassword) {
    return REGEX.REGEX_PASSWORD.test(valuePassword);
}
export function passwordSpecificValid(valuePassword) {
    const iAtLeastMessagesValid = [];
    for (let i = 0; i < iAtLeastMessages.length; i++) {
        const iAtLeastMessage = iAtLeastMessages[i];
        iAtLeastMessage.isValid = (iAtLeastMessages[i].pattern).test(valuePassword);
        iAtLeastMessagesValid[i] = iAtLeastMessage;
    }
    return iAtLeastMessagesValid;
}
export function password2Valid(password1, password2) {
    return (formularPasswordValid(password1) && formularPasswordValid(password2))
        ? password1 === password2
        : false;
}
export function formularSignUpIsValid(name, familyname, email, password1, password2) {
    return formularNameValid(name) && formularNameValid(familyname) && formularEmailValid(email) && formularPasswordValid(password1) && formularPasswordValid(password2)
        && password2Valid(password1, password2);
}
export function formularNameValid(value) {
    return REGEX.REGEX_NAMES.test(value);
}
export function formularStreetIsValid(street) {
    return REGEX.REGEX_STREET.test(street);
}
export function formularStreetNrIsValid(nr) {
    return REGEX.REGEX_STREET_NR.test(nr);
}
export function formularZipCodeIsVald(zipcode) {
    return REGEX.REGEX_ZIPCODE.test(zipcode.toString());
}
export function formularModelIsValid(model) {
    return REGEX.REGEX_MODEL.test(model);
}
export function formularMileageIsValid(mileage) {
    return REGEX.REGEX_MILEAGE.test(mileage.toString());
}
export function formularIsNumber(value) {
    return REGEX.REGEX_NUMBER.test(value.toString());
}
export function formularOwnerIsValid(value) {
    return REGEX.REGEX_OWNER.test(value.toString());
}
export function formularPowerIsValid(value) {
    return REGEX.REGEX_POWER.test(value.toString());
}
export function formularHubraumIsValid(value) {
    return REGEX.REGEX_HUBRAUM.test(value.toString());
}
export function formularPriceIsValid(value) {
    return REGEX.REGEX_PRICE.test(value.toString());
}
export function formularNamesIsValid(value) {
    return REGEX.REGEX_NAMES.test(value);
}
