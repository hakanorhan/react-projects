import { IMessageRegex } from "../interfaces/ITextFieldProps"
import ITextFieldProps from "../interfaces/ITextFieldProps"
import { REGEX_EMAIL } from '../../../autos-backend/src/regex/Regex'

  const regexMatchPattern:IMessageRegex = {
    message: 'Invalid Email',
    pattern: REGEX_EMAIL,
    color: 'black',
    match: 0
  }

  export const textFieldEmail: ITextFieldProps = {
    regexMessage: [ regexMatchPattern ]
  }