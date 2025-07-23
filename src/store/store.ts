import { configureStore } from "@reduxjs/toolkit";
import toggleReducer from "./toggle_slice/toggleSlice"

const store = configureStore({
    reducer: {
        toggles: toggleReducer
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch