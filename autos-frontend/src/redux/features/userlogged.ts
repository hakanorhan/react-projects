import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
    userLoggedIn: boolean,
    role: string
}

const initialState: IUserState = {
    userLoggedIn : false,
    role: ""
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
        }
    }
})

export const { setUserLoggedIn, setRole } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;