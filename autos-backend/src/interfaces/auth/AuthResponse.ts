import { Roles } from "../../enums/Roles.js";

export interface AuthResponse {
    authenticated: boolean,
    role: Roles,
    errorMessage?: string
}