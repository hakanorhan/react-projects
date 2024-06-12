import { Roles } from "../../constants/values";
import { URLs } from "../../constants/values";
import { PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";
import { AxiosDataPacketBrand } from "../../interfaces/types";
import { Brand } from "../../interfaces/types";
import { RequestAxiosDataModel } from "../../interfaces/types";
import { AxiosDataPacketModel } from "../../interfaces/types";
import { Model } from "../../interfaces/types";
import { AxiosDetailsearch } from "../../interfaces/types";
import { notifyError} from "../../helper/toastHelper";
import { notifySuccess } from "../../helper/toastHelper";
import { AxiosRejectPackage } from "../../interfaces/IAxiosData";

// ------------- userLoggedIn --------------------------------------------------------------------------
/**
 * Used only for display admin menus in drawer after login.
 */
export interface IUserState {
    userLoggedIn: boolean,
    role: Roles,
    mode: boolean | undefined
}

const initialState: IUserState = {
    userLoggedIn : false,
    role: Roles.NULL,
    mode: undefined
}

export const userLoggedSlice = createSlice({
    name: 'userState',
    initialState,
    reducers: {
        setUserLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.userLoggedIn = action.payload;
        },
        setRole: (state, action: PayloadAction<Roles>) => {
            state.role = action.payload;
        },
        setMode: (state, action: PayloadAction<boolean>) => {
            state.mode = action.payload
        }
    }
})

export const { setUserLoggedIn, setRole, setMode } = userLoggedSlice.actions;
export const userLoggedReducer = userLoggedSlice.reducer;
// --------------------------------------------------------------------------------------------------------

// ------------- carBrandSlice ----------------------------------------------------------------------------
export const fetchBrand = createAsyncThunk<
    AxiosDataPacketBrand,
    void,
    { rejectValue: AxiosRejectPackage }>(
    'data/fetchBrand',
    async (_, { rejectWithValue }) => {
        try {
        const response = await axios.get<AxiosDataPacketBrand>(URLs.ORIGIN_SERVER + URLs.FETCH_BRAND, { withCredentials: true });
        return response.data;
        } catch(error: any) {
            return rejectWithValue(error.response.data as AxiosRejectPackage)
        }
    }
);

export const insertBrand = createAsyncThunk<
    AxiosDataPacketBrand,
    string,
    { rejectValue: AxiosRejectPackage }>(
    'data/insertBrand',
    async (value: string, { rejectWithValue }) => {
        try {
            const response = await axios.post<AxiosDataPacketBrand>(URLs.ORIGIN_SERVER + URLs.POST_INSERT_BRAND, { value }, { withCredentials: true });
        return response.data;
        } catch(error: any) {
            return rejectWithValue(error.response.data as AxiosRejectPackage);
            
        }
    }
);

const dataSlice = createSlice({
    name: 'data',
    initialState: {
        loading: false,
        brands: [] as Brand[],
        message: null
    },
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBrand.fulfilled, (state, action: PayloadAction<AxiosDataPacketBrand>) => {
                state.brands = action.payload.dataBrands;
                state.loading = false;
            })
            .addCase(fetchBrand.rejected,(state, action: PayloadAction<AxiosRejectPackage | undefined>) => {
                state.loading = false;
                if(action.payload?.messageId) { 
                    notifyError(action.payload.messageId, action.payload.message);
                } else
                    notifyError("500", "Unerwarteter Fehler aufgetreten");
            
            });

            builder
            .addCase(insertBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(insertBrand.fulfilled, (state, action: PayloadAction<AxiosDataPacketBrand>) => {
                state.brands = action.payload.dataBrands;
                state.loading = false;
                notifySuccess(action.payload.message, action.payload.message);
            })
            .addCase(insertBrand.rejected, (state, action: PayloadAction<AxiosRejectPackage | undefined>) => {
                state.loading = false;
                if(action.payload?.messageId) { 
                    notifyError(action.payload.messageId, action.payload.message);
                } else
                    notifyError("500", "Unerwarteter Fehler aufgetreten");
            });
        
    }
})

export const carBrandReducer =  dataSlice.reducer;
// --------------------------------------------------------------------------------------------------------


// ------------- carModelSlice ----------------------------------------------------------------------------
export const fetchBrandModel = createAsyncThunk(
    'data/fetchBrandModel',
    async () => {
        const response = await axios.get<AxiosDataPacketBrand>(URLs.ORIGIN_SERVER + URLs.FETCH_BRAND, { withCredentials: true });
        return response.data;
    }
);

export const insertModel = createAsyncThunk<
    AxiosDataPacketModel,
    RequestAxiosDataModel,
    { rejectValue: AxiosRejectPackage }>(
    'data/insertModel',
    async ( axiosDataModel: RequestAxiosDataModel, { rejectWithValue } ) => {
        try {
        const response = await axios.post<AxiosDataPacketModel>(URLs.ORIGIN_SERVER + URLs.POST_INSERT_MODEL, axiosDataModel, { withCredentials: true });
        return response.data;
        } catch(error: any) {
            return rejectWithValue(error.response.data as AxiosRejectPackage);
        }
    }
);

const dataSliceModel = createSlice({
    name: 'data',
    initialState: {
        loading: false,
        models: [] as Model[],
        brands: [] as Brand[],
        brandName: '',
        message: null
    },
    reducers: {
    },
    extraReducers: (builder) =>{
        builder
            .addCase(fetchBrandModel.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBrandModel.fulfilled, (state, action: PayloadAction<AxiosDataPacketBrand>) => {
                state.brands = action.payload.dataBrands;
                state.loading = false;
            })
            .addCase(fetchBrandModel.rejected,(state) => {
                state.loading = false;
            });

            builder
            .addCase(insertModel.pending, (state) => {
                state.loading = true;
            })
            .addCase(insertModel.fulfilled, (state, action: PayloadAction<AxiosDataPacketModel>) => {
                state.models = action.payload.dataModels;
                state.brandName = action.payload.brand;
                state.loading = false;
                notifySuccess(action.payload.message, action.payload.message);
            })
            .addCase(insertModel.rejected, (state, action: PayloadAction<AxiosRejectPackage | undefined>) => {
                state.loading = false;
                if(action.payload?.messageId) { 
                    notifyError(action.payload.messageId, action.payload.message);
                } else
                    notifyError("500", "Unerwarteter Fehler aufgetreten");
            });
        
    }
})

export const dataSliceModelReducer =  dataSliceModel.reducer;
// -------------------------------------------------------------------------------------------------------

// ------------------------------ detailSearch -----------------------------------------------------------

export const fetchDetailSearch = createAsyncThunk(
    'data/fetchDetailSearch',
    async (id: number | string) => {
        const response = await axios.get<AxiosDetailsearch>(URLs.ORIGIN_SERVER + URLs.FETCH_DETAIL_SEARCH + `/${id}`, { withCredentials: true });
        return response.data;
    }
);

interface DetailSearchState {
    loading: boolean,
    detailState: AxiosDetailsearch | null | undefined,
    carsNotFound: boolean | undefined
}

const initialStateDetailSearch: DetailSearchState = {
    loading: false,
    detailState: null,
    carsNotFound: undefined
}
const dataSliceDetailSearch = createSlice({
    name: 'data',
    initialState: initialStateDetailSearch,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDetailSearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDetailSearch.fulfilled, (state, action: PayloadAction<AxiosDetailsearch>) => {
                // TODO: fix
                if (action.payload) {
                    state.detailState = action.payload;
                    state.loading = false;
                    state.carsNotFound = false;
                } else state.carsNotFound = true;
            })
            .addCase(fetchDetailSearch.rejected, (state) => {
                state.loading = false;
            });
    }
})

export const detailSearchReducer = dataSliceDetailSearch.reducer;
// -------------------------------------------------------------------------------------------------------

// ----------------------- darkLightMode -----------------------------------------------------------------
/* Used only for display admin menus in drawer after login. */
export interface IModeState {
   mode: boolean
}

const initialStateDarkLight: IModeState = {
   mode: false
}

export const userDarkLightModeSlice = createSlice({
   name: 'userDarkLightMode',
   initialState: initialStateDarkLight,
   reducers: {
       setModeDarkLight: (state, action: PayloadAction<boolean>) => {
           state.mode = action.payload
       }
   }
})

export const { setModeDarkLight } = userDarkLightModeSlice.actions;
export const darkLightReducer =  userDarkLightModeSlice.reducer;

// ----------------------- close ---------------------------------------------------------------------------
export interface IOpenPublish {
    open: boolean
}

const initialOpenPublish: IOpenPublish = {
    open: false
}

export const openClosePublishSlice = createSlice({
    name: 'openClosePublish',
    initialState: initialOpenPublish,
    reducers: {
        handleDialog: (state, action: PayloadAction<boolean>) => {
            state.open = action.payload;
        }
    }
})

export const { handleDialog } = openClosePublishSlice.actions;
export const openClosePublishReducer = openClosePublishSlice.reducer;