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
            state.fontObj.activeFont = { name: action.payload.name, font: action.payload.font}
        },
        toggleTheme: (state) => {
            state.isLightTheme = !state.isLightTheme
        }
    }
})

export const { switchFont, toggleTheme } = toggleSlice.actions;
export default toggleSlice.reducer;