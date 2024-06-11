// https://emailregex.com/index.html  General Email Regex (RFC 5322 Official Standard)  added 64 characters local-part
export const REGEX_EMAIL = /^(?:(?=.{1,64}@)[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i
export const REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,255}$/;
export const REGEX_MIN_8 = /^(?=.*\d).{8,255}$/;
export const REGEX_UPPERCASE = /[A-Z]/;
export const REGEX_LOWERCASE = /[a-z]/;
export const REGEX_NUMBER = /[0-9]/;
export const REGEX_SPECIAL = /[#?!@$%^&*-]/;
export const REGEX_NAMES = /^(?=.{2,25}$)[a-zA-Zßäöü]+(?:['\s-][a-zA-Z]+)*$/;
export const REGEX_BAUREIHE = /^(?!.*\s\s)(?![ ]*$)[a-zA-Z0-9\s-]{1,20}(?<!\s)$/;
export const REGEX_HUBRAUM = /^\d{1,5}$/;
export const REGEX_PRICE = /^\d{1,9}$/;
export const REGEX_STREET = /^[a-zA-Z0-9ßäöü. -]{2,40}$/;
export const REGEX_STREET_NR = /^([1-9]\d{0,3})(?:[a-zA-Z])?$/;
export const REGEX_ZIPCODE = /^\d{5}$/;
export const REGEX_MODEL = /^(?=.*[a-zA-Z0-9\s-])(?!.*\s\s)(?![ ]*$)[a-zA-Z0-9\s-]{1,20}(?<!\s)$/;
export const REGEX_OWNER = /^([0-9]|[1-9][0-9]{0,2}|1000)$/;
export const REGEX_MILEAGE = /^([0-9]{1,7}|10000000)$/;
export const REGEX_POWER = /^([1-9]\d{0,3}|10000|0)$/;


