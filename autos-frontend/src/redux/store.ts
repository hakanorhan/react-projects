import { configureStore } from "@reduxjs/toolkit";
import { userLoggedReducer } from "./features/userLoggedInSlice";
import { carBrandReducer } from "./features/carBrandSlice";
import { dataSliceModelReducer } from "./features/carModelSlice";
import { detailSearchReducer } from "./features/detailSearchSlice";
import { darkLightReducer } from "./features/darkLightReducer";
import { openClosePublishReducer } from "./features/iOpenPublishSlice";

export const store = configureStore({
    reducer: {
       userLoggedIn: userLoggedReducer,
       mode: darkLightReducer,
       carBrandSlice: carBrandReducer,
       CarModelSlice: dataSliceModelReducer,
       detailSearch: detailSearchReducer,
       openClosePublishReducer 
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch