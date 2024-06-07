import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URLs } from "../../../enums/URLs";
import { AxiosDetailsearch } from "../../../interfaces/types";

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

const initialState: DetailSearchState = {
    loading: false,
    detailState: null,
    carsNotFound: undefined
}
const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {},
    extraReducers: (builder) =>{
        builder
            .addCase(fetchDetailSearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDetailSearch.fulfilled, (state, action: PayloadAction<AxiosDetailsearch>) => {
                if(action.payload) {
                    state.detailState = action.payload;
                state.loading = false;
                state.carsNotFound = false;    
                } else state.carsNotFound = true;
            })
            .addCase(fetchDetailSearch.rejected,(state) => {
                state.loading = false;
            });
    }
})

export default dataSlice.reducer;