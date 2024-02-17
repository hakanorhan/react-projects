import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFieldInfosFormular } from "../../interfaces/IFieldInfosFormular";
/**
 * Texfield value email.
 * Textfield value password.
 */



interface ISignIn {
    fieldEmail: IFieldInfosFormular,
    fieldPassword: IFieldInfosFormular
}

const initialState: ISignIn = {
    fieldEmail: { value: "", isValid: false },
    fieldPassword: { value: "", isValid: false }
}

const setDefault: IFieldInfosFormular = { value: "", isValid: false };

const userInfoSlice = createSlice({
    name: 'signInFormularValues',
    initialState: initialState,
    reducers: {
        setValuesEmail: (state, action: PayloadAction<string>) => {
            state.fieldEmail.value = action.payload
        },
        setValuePassword: (state, action: PayloadAction<string>) => {
            state.fieldPassword.value = action.payload
        },
        setIsValidEmail: (state, action: PayloadAction<boolean>) => {
            state.fieldEmail.isValid = action.payload;
        },
        setIsValidPassword: (state, action: PayloadAction<boolean>) => {
            state.fieldPassword.isValid = action.payload;
        },
        setToInitialStateSignIn: (state) => {
            state.fieldEmail = setDefault;
            state.fieldPassword = setDefault;

        }
    }
})

export const { setValuePassword, setValuesEmail, setIsValidEmail, setIsValidPassword, setToInitialStateSignIn } = userInfoSlice.actions;
export default userInfoSlice.reducer;