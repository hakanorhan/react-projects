import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLs } from "../../enums/URLs";
import { AxiosDataPacketBrand, Brand } from "../../interfaces/types";
import { notifyError, notifySuccess } from "../../helper/toastHelper";
import { AxiosRejectPackage } from "../../interfaces/IAxiosData";

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

export default dataSlice.reducer;