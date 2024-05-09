import { configureStore } from "@reduxjs/toolkit";
import userlogged from "./features/userlogged";
import userDarkLightMode from "./features/darkLightMode";

export const store = configureStore({
    reducer: {
       userLoggedIn: userlogged,
       mode: userDarkLightMode
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch