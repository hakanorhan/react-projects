import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IinitialState {
    password1Valid: boolean,
    password2Valid: boolean,
    compareMatch: boolean
}

const initialState: IinitialState = {
    password1Valid: false,
    password2Valid: false,
    compareMatch: false
}

const passwordPatternSlice = createSlice({
    name: 'passwordPattern',
    initialState: initialState,
    /* sets the color from error Message */
    reducers: {
        setPassword1Valid: (state, action: PayloadAction<boolean>) => {
            state.password1Valid = action.payload
        },
        setPassword2Valid: (state, action: PayloadAction<boolean>) => {
            state.password2Valid = action.payload
        },
        comperePasswords: (state) => {
            state.compareMatch = (state.password1Valid === state.password2Valid)
        },
        setToInitialStatePassword: (state => {
            state.password1Valid = false,
            state.password2Valid = false,
            state.compareMatch = false;
        })
    }
})

export const { setPassword1Valid, setPassword2Valid, setToInitialStatePassword, comperePasswords } = passwordPatternSlice.actions;
export default passwordPatternSlice.reducer;