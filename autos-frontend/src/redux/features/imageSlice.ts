import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ImageState {
    imageName: string
}

const initialState: ImageState = {
    imageName : 'home'
}

export const imageSlice = createSlice({
    name: 'background',
    initialState,
    reducers: {
        setNewImage: (state, action: PayloadAction<string>) => {
            state.imageName = action.payload;
        }
    }
})

export const { setNewImage } = imageSlice.actions;
export default imageSlice.reducer;