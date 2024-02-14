export interface IMessageRegex {
    message: string,
    pattern: string,
    color: string,
    match: number
}

export default interface ITextFieldProps {
    regexMessage: IMessageRegex[],
    // all regex true passwordValid: true else false
    passwordValid: boolean
}
