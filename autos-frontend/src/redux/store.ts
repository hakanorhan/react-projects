import { configureStore } from "@reduxjs/toolkit";
import userlogged from "./features/userlogged";
import userDarkLightMode from "./features/darkLightMode";
import backgroundImageSlice from "./features/backgroundImages";

export const store = configureStore({
    reducer: {
       userLoggedIn: userlogged,
       mode: userDarkLightMode,
       backgroundImageRedux: backgroundImageSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch