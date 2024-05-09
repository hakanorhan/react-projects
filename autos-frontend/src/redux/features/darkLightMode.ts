import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/**
 * Used only for display admin menus in drawer after login.
 */
export interface IModeState {
    mode: boolean
}

const initialState: IModeState = {
    mode: false
}

export const userDarkLightModeSlice = createSlice({
    name: 'userDarkLightMode',
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<boolean>) => {
            state.mode = action.payload
        }
    }
})

export const { setMode } = userDarkLightModeSlice.actions;
export default userDarkLightModeSlice.reducer;