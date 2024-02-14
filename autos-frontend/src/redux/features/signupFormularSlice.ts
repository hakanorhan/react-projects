import { PayloadAction, createSlice } from "@reduxjs/toolkit";


interface IFieldValues {
    valueName: string,
    valueFamilyname: string,
    valueEmail: string,
    valuePassword: string,
    valuePassword2: string,
    valueChecked: boolean
}

const initialState: IFieldValues = {
    valueName: "",
    valueFamilyname: "",
    valueEmail: "",
    valuePassword: "",
    valuePassword2: "",
    valueChecked: false
}

const userInfoSlice = createSlice({
    name: 'signUpFormularValues',
    initialState: initialState,
    reducers: {
        setValueName: (state, action: PayloadAction<string>) => {
            state.valueName = action.payload
        },
        setValueFamilyname: (state, action: PayloadAction<string>) => {
            state.valueFamilyname = action.payload
        },
        setValuesEmail: (state, action: PayloadAction<string>) => {
            state.valueEmail = action.payload
        },
        setValuePassword: (state, action: PayloadAction<string>) => {
            state.valuePassword = action.payload
        },
        setValuePassword2: (state, action: PayloadAction<string>) => {
            state.valuePassword2 = action.payload
        },
        setToInitialState:(state) => {
            state.valueName = "",
            state.valueFamilyname = "",
            state.valueEmail = "",
            state.valuePassword = "",
            state.valuePassword2 = "",
            state.valueChecked = false
            
        }
    }
})

export const {setValueName, setValueFamilyname, setValuePassword, setValuesEmail, setValuePassword2, setToInitialState } = userInfoSlice.actions;
export default userInfoSlice.reducer;