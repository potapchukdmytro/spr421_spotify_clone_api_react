import { createSlice } from "@reduxjs/toolkit";
import type { ThemeState } from "./types";

const initState: ThemeState = {
    firstTheme: true,
};

const themeSlice = createSlice({
    name: "theme",
    initialState: initState,
    reducers: {
        switchTheme(state) {
            state.firstTheme = !state.firstTheme;
        },
    },
});

export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
