import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "./features/imageSlice";
import userlogged from "./features/userlogged";

export const store = configureStore({
    reducer: {
       background: imageSlice,
       userLoggedIn: userlogged,
       
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch