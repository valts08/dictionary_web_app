import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fontObj: {
        activeFont: "--font-sans",
        mono: "--font-mono",
        serif: "--font-sans",
        sansSerif: "--font-sans-serif"
    },
    isLightTheme: true
}

const toggleSlice = createSlice({
    name: "toggles",
    initialState,
    reducers: {
        switchFont: () => {
            // logic to switch font based on passed payload
        },
        getTheme: () => {
            // logic to get light or dark theme
        },
        toggleTheme: () => {
            // logic to toggle between light n dark theme
        }
    }
})

export const { switchFont, getTheme, toggleTheme } = toggleSlice.actions;
export default toggleSlice.reducer;