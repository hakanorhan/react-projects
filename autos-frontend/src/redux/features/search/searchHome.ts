import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLs } from "../../../../../autos-backend/src/enums/URLs";
import { Model, Searchparams } from "../../../interfaces/types";

export const fetchCount = createAsyncThunk(
    'data/fetchCount',
    async (searchParams: Searchparams) => {
        const response = await axios.get(URLs.ORIGIN_SERVER + URLs.FETCH_COUNT, {
            withCredentials: true,
            params: searchParams
        })
        return response.data;
    }
);

export const fetchModelSearchHome = createAsyncThunk(
    'data/fetchModelSearchHome',
    async (selectedBrand: string) => {
        const response = await axios.post(URLs.ORIGIN_SERVER + URLs.FETCH_MODEL, { selectedBrand }, { withCredentials: true })
        return response;
    }
)

interface SearchHomeState {
    count: number,
    models: Model[]
}

const initialState: SearchHomeState = {
    count: 0,
    models: []
}

const searchHomeSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCount.fulfilled, (state, action: PayloadAction<number>) => {
                state.count = action.payload;
            })
    }
})

export default searchHomeSlice.reducer;