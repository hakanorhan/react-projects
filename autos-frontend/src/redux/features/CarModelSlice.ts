import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLs } from "../../enums/URLs";
import { RequestAxiosDataModel, AxiosDataPacketBrand, AxiosDataPacketModel, Brand, Model } from "../../interfaces/types";
import { notifyError, notifySuccess } from "../../helper/toastHelper";
import { AxiosRejectPackage } from "../../interfaces/IAxiosData";

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

const dataSlice = createSlice({
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

export default dataSlice.reducer;