import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fontObj: {
        activeFont: {
            name: "Sans",
            font: "font-sans"
        },
        mono: {
            name: "Sans",
            font: "font-mono"
        },
        serif: {
            name: "Sans",
            font: "font-sans"
        },
        sansSerif: {
            name: "Sans",
            font: "font-sans-serif"
        }
    },
    isLightTheme: true
}

const toggleSlice = createSlice({
    name: "toggles",
    initialState,
    reducers: {
        switchFont: (state, action) => {
            // logic to switch font based on passed payload
            state.fontObj.activeFont = { name: action.payload.name, font: action.payload.font}
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