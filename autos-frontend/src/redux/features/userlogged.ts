import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUserState {
    userLoggedIn: boolean
}

const initialState: IUserState = {
    userLoggedIn : true
}

export const userLoggedSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.userLoggedIn = action.payload;
        }
    }
})

export const { setUserLoggedIn } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;