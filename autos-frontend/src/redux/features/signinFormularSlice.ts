import { PayloadAction, createSlice } from "@reduxjs/toolkit";

/**
 * Texfield value email.
 * Textfield value password.
 */
interface IFieldValuesSignIn {
    valueEmail: string,
    valuePassword: string,
}

const initialState: IFieldValuesSignIn = {
    valueEmail: "",
    valuePassword: ""    
}

const userInfoSlice = createSlice({
    name: 'signInFormularValues',
    initialState: initialState,
    reducers: {
        setValuesEmail: (state, action: PayloadAction<string>) => {
            state.valueEmail = action.payload
        },
        setValuePassword: (state, action: PayloadAction<string>) => {
            state.valuePassword = action.payload
        },
        setToInitialStateSignIn:(state) => {
            state.valueEmail = "",
            state.valuePassword = ""
        },
    }
})

export const { setValuePassword, setValuesEmail, setToInitialStateSignIn } = userInfoSlice.actions;
export default userInfoSlice.reducer;