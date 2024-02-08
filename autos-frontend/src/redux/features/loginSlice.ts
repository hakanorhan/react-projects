import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoginState {
    loggedIn: Boolean
}

const initialState: LoginState = {
    loggedIn: false,
}

export const loginslice = createSlice({
    name: 'logger',
    initialState,
    reducers: {
        loggedIn: (state) => {
            state.loggedIn = true
        },
        loggedOut: (state) => {
            state.loggedIn = false
        }
    }
})

export const { loggedIn, loggedOut } = loginslice.actions

export default loginslice.reducer