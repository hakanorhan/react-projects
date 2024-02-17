import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IFieldInfosFormular } from "../../interfaces/IFieldInfosFormular";

interface ISignUp {
    fieldName: IFieldInfosFormular,
    fieldFamilyname: IFieldInfosFormular,
    fieldEmail: IFieldInfosFormular,
    fieldPassword1: IFieldInfosFormular,
    fieldPassword2: IFieldInfosFormular,
    fieldCarDealer: boolean

}

const intialIFieldInfosFormular: IFieldInfosFormular = { value: "", isValid: false }; 

const initialState: ISignUp = {
    fieldName: intialIFieldInfosFormular,
    fieldFamilyname: intialIFieldInfosFormular,
    fieldEmail: intialIFieldInfosFormular,
    fieldPassword1: intialIFieldInfosFormular,
    fieldPassword2: intialIFieldInfosFormular,
    fieldCarDealer: false
}

const setDefault: IFieldInfosFormular = { value: "", isValid: false };

const userInfoSlice = createSlice({
    name: 'signUpFormularValues',
    initialState: initialState,
    reducers: {
        setValueName: (state, action: PayloadAction<string>) => {
            state.fieldName.value = action.payload
        },
        setIsValidName: (state, action: PayloadAction<boolean>) => {
            state.fieldName.isValid = action.payload
        },
        setValueFamilyname: (state, action: PayloadAction<string>) => {
            state.fieldFamilyname.value = action.payload
        },
        setIsValiFamilyname: (state, action: PayloadAction<boolean>) => {
            state.fieldFamilyname.isValid = action.payload
        },
        setValuesEmail: (state, action: PayloadAction<string>) => {
            state.fieldEmail.value = action.payload
        },
        setIsValidEmail: (state, action: PayloadAction<boolean>) => {
            state.fieldEmail.isValid = action.payload
        },
        setValuePassword: (state, action: PayloadAction<string>) => {
            state.fieldPassword1.value = action.payload
        },
        setIsValidPassword: (state, action: PayloadAction<boolean>) => {
            state.fieldPassword1.isValid = action.payload
        },
        setValuePassword2: (state, action: PayloadAction<string>) => {
            state.fieldPassword2.value = action.payload
        },
        setIsValidPassword2: (state, action: PayloadAction<boolean>) => {
            state.fieldPassword2.isValid = action.payload
        },
        setValueCarDealer: (state, action: PayloadAction<boolean>) => {
            state.fieldCarDealer = action.payload;
        },
        setToInitialState:(state) => {
            state.fieldName = setDefault;
            state.fieldFamilyname = setDefault;
            state.fieldEmail = setDefault;
            state.fieldPassword1 = setDefault;
            state.fieldPassword2 = setDefault;
            state.fieldCarDealer = false;
            
        }, 
    }
})

export const {setValueName, setValueFamilyname, setValuePassword, setValuesEmail,
    setValuePassword2, setValueCarDealer, setToInitialState,
    setIsValiFamilyname, setIsValidEmail, setIsValidName, setIsValidPassword, setIsValidPassword2
    } = userInfoSlice.actions;
export default userInfoSlice.reducer;

/*
interface IFieldValues {
    valueName: string,
    valueFamilyname: string,
    valueEmail: string,
    valuePassword: string,
    valuePassword2: string,
    valueChecked: boolean,
    regexAtLeastMessages: IAtLeastMessage[]
}*/

/*const initialState: IFieldValues = {
    valueName: "",
    valueFamilyname: "",
    valueEmail: "",
    valuePassword: "",
    valuePassword2: "",
    valueChecked: false,
    regexAtLeastMessages: []
}*/