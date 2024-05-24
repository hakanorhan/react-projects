import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLs } from "../../../../autos-backend/src/enums/URLs";
import { AxiosDataPacketBrand, Brand } from "../../interfaces/types";
import { notifyError, notifySuccess } from "../../helper/toastHelper";

export const fetchBrand = createAsyncThunk(
    'data/fetchBrand',
    async () => {
        const response = await axios.get<AxiosDataPacketBrand>(URLs.ORIGIN_SERVER + URLs.FETCH_BRAND, { withCredentials: true });
        return response.data;
    }
);

export const insertBrand = createAsyncThunk(
    'data/insertBrand',
    async (value: string) => {
        const response = await axios.post<AxiosDataPacketBrand>(URLs.ORIGIN_SERVER + URLs.POST_INSERT_BRAND, { value }, { withCredentials: true });
        
        return response.data;
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
            .addCase(fetchBrand.rejected,(state) => {
                state.loading = false;
            });

            builder
            .addCase(insertBrand.pending, (state) => {
                state.loading = true;
            })
            .addCase(insertBrand.fulfilled, (state, action: PayloadAction<AxiosDataPacketBrand>) => {
                state.brands = action.payload.dataBrands;
                state.loading = false;
                notifySuccess("success", "Erfolgreich hinzugefügt");
            })
            .addCase(insertBrand.rejected, (state, action: PayloadAction<unknown | AxiosDataPacketBrand>) => {
                state.loading = false;
            });
        
    }
})

export default dataSlice.reducer;