import { IMessageRegex } from "../interfaces/ITextFieldProps"
import ITextFieldProps from "../interfaces/ITextFieldProps"
import {
    REGEX_LOWERCASE,
    REGEX_UPPERCASE,
    REGEX_PASSWORD,
    REGEX_SPECIAL,
    REGEX_MIN_8,
    REGEX_NUMBER
} from "../../../autos-backend/src/regex/Regex"

const color = 'black';
const initialMatch = 0;

export const regexMin8: IMessageRegex = {
    message: 'Should have at least 8 characters',
    pattern: REGEX_MIN_8,
    color: color,
    match: initialMatch
}

export const regexLowercase: IMessageRegex = {
    message: 'Atleast One Lowercase',
    pattern: REGEX_LOWERCASE,
    color: color,
    match: initialMatch
  }

export const regexUppercase: IMessageRegex = {
    message: 'Atleast One Uppercase',
    pattern: REGEX_UPPERCASE,
    color: color,
    match: initialMatch
}

export const regexMatchPattern:IMessageRegex = {
    message: 'Valid Password',
    pattern: REGEX_PASSWORD,
    color: color,
    match: initialMatch
  }

export const regexNumber: IMessageRegex = {
    message: 'Atleast One Number',
    pattern: REGEX_NUMBER,
    color: color,
    match: initialMatch
  }

export const regexSpecial: IMessageRegex = {
    message: 'Atleast One Special Symbol #?!@$ %^&*-',
    pattern: REGEX_SPECIAL,
    color: color,
    match: initialMatch
  }

  /**
   * regexLowercase, regexUppercase, regexNumber, regexSpecial,regexMatchPattern, regexMin8
   */
export const textFieldPassword: ITextFieldProps = {
    regexMessage: [ regexLowercase, regexUppercase, regexNumber, regexSpecial,regexMatchPattern, regexMin8 ],
    // if all 
    passwordValid: false
  }