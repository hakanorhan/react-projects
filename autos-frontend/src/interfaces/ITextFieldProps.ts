export interface IMessageRegex {
    message: string,
    pattern: RegExp | RegExpMatchArray | null,
    color: string,
    match: number
}

export default interface ITextFieldProps {
    regexMessage: IMessageRegex[],
    // all regex true passwordValid: true else false
    passwordValid: boolean
}
