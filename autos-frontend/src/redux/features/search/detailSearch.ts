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
    detailState: AxiosDetailsearch | null
}

const initialState: DetailSearchState = {
    loading: false,
    detailState: null
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
                state.detailState = action.payload;
                state.loading = false;
            })
            .addCase(fetchDetailSearch.rejected,(state) => {
                state.loading = false;
            });
    }
})

export default dataSlice.reducer;