import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { mainComponentHeight } from "../../themes/Theme";

/**
 * Used only for display admin menus in drawer after login.
 */
export interface IBackgroudImage {
    imageName: string,
    width?: string,
    height?: string,
    backgroundSize: string
}

const initialState: IBackgroudImage = {
    imageName: `linear-gradient(0deg, whitesmoke, whitesmoke, whitesmoke)`,
    width:'100%',
    height: mainComponentHeight,
    backgroundSize: '100%'
}

export const backgroundImageSlice = createSlice({
    name: 'backgroundImageRedux',
    initialState,
    reducers: {
        setBackgroundImage: (state, action: PayloadAction<IBackgroudImage>) => {
            state.backgroundSize = action.payload.backgroundSize
            state.height = action.payload.height
            state.imageName = action.payload.imageName
            state.width = action.payload.width
        },
        setBackgroundImageName: (state, action: PayloadAction<string>) => {
            state.imageName = action.payload;
        }
    }
})

export const { setBackgroundImage, setBackgroundImageName } = backgroundImageSlice.actions;
export default backgroundImageSlice.reducer;