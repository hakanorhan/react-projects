import { configureStore } from "@reduxjs/toolkit";
import loginReducer from '../redux/features/loginSlice';

export const store = configureStore({
    reducer: {
        logger: loginReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch