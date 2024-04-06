import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * Used only for display admin menus in drawer after login.
 */
export interface IUserState {
    userLoggedIn: boolean,
    role: string,
    whichButtonClicked: string
}

const initialState: IUserState = {
    userLoggedIn : false,
    role: "",
    whichButtonClicked: "addBrand"
}

export const userLoggedSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.userLoggedIn = action.payload;
        },
        setRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload;
        },
        setWhichButtonClicked: (state, action: PayloadAction<string>) => {
            state.whichButtonClicked = action.payload
        }
    }
})

export const { setUserLoggedIn, setRole, setWhichButtonClicked } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;