import { configureStore } from "@reduxjs/toolkit";
import userlogged from "./features/userlogged";
import userDarkLightMode from "./features/darkLightMode";
import backgroundImageSlice from "./features/backgroundImages";

import carBrandSlice from './features/carBrandSlice';
import CarModelSlice from "./features/CarModelSlice";
import detailSearch from "./features/search/detailSearch";

export const store = configureStore({
    reducer: {
       userLoggedIn: userlogged,
       mode: userDarkLightMode,
       backgroundImageRedux: backgroundImageSlice,
       carBrandSlice: carBrandSlice,
       CarModelSlice,
       detailSearch
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch