import { Roles } from "../../enums/Roles.js"

export interface UserInformation {
    id?: number,
    authenticated: boolean,
    role: Roles,
    errorMessage?: string
}