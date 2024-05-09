import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Roles } from "../../../../autos-backend/src/enums/Roles";

/**
 * Used only for display admin menus in drawer after login.
 */
export interface IUserState {
    userLoggedIn: boolean,
    role: Roles,
    mode: boolean | undefined
}

const initialState: IUserState = {
    userLoggedIn : false,
    role: Roles.NULL,
    whichButtonClicked: "addBrand",
    mode: undefined
}

export const userLoggedSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.userLoggedIn = action.payload;
        },
        setRole: (state, action: PayloadAction<Roles>) => {
            state.role = action.payload;
        },
        setMode: (state, action: PayloadAction<boolean>) => {
            state.mode = action.payload
        }
    }
})

export const { setUserLoggedIn, setRole, setMode } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;