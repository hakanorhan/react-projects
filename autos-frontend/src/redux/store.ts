import { configureStore } from "@reduxjs/toolkit";
import userlogged from "./features/userlogged";
import userDarkLightMode from "./features/darkLightMode";

import carBrandSlice from './features/carBrandSlice';
import CarModelSlice from "./features/CarModelSlice";
import detailSearch from "./features/search/detailSearch";

export const store = configureStore({
    reducer: {
       userLoggedIn: userlogged,
       mode: userDarkLightMode,
       carBrandSlice: carBrandSlice,
       CarModelSlice,
       detailSearch
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch