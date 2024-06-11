import { configureStore } from "@reduxjs/toolkit";

import { userLoggedReducer} from "./features/slices";
import { carBrandReducer } from "./features/slices";
import { dataSliceModelReducer } from "./features/slices";
import { detailSearchReducer } from "./features/slices";
import { darkLightReducer } from "./features/slices";

export const store = configureStore({
    reducer: {
       userLoggedIn: userLoggedReducer,
       mode: darkLightReducer,
       carBrandSlice: carBrandReducer,
       CarModelSlice: dataSliceModelReducer,
       detailSearch: detailSearchReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch