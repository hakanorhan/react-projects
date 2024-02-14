import { configureStore } from "@reduxjs/toolkit";
import passwordPatternReducer from "./features/passwordPatternSlice";
import signupFormularReducer from './features/signupFormularSlice';
import signinFormularReducer from './features/signinFormularSlice';

export const store = configureStore({
    reducer: {
        passwordPattern: passwordPatternReducer,
        signupFormular: signupFormularReducer,
        signinFormular: signinFormularReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch