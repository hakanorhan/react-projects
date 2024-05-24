import { configureStore } from "@reduxjs/toolkit";
import userlogged from "./features/userlogged";
import userDarkLightMode from "./features/darkLightMode";
import backgroundImageSlice from "./features/backgroundImages";

import dataSlice from './features/carBrandSlice';

export const store = configureStore({
    reducer: {
       userLoggedIn: userlogged,
       mode: userDarkLightMode,
       backgroundImageRedux: backgroundImageSlice,
       responseData: dataSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch