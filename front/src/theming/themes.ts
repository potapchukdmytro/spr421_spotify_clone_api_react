import { createTheme, alpha } from "@mui/material";

export const theme1 = createTheme({
    palette: {
        primary: {
            light: alpha("#FF5733", 0.5),
            main: "#FF5733",
            dark: alpha("#FF5733", 0.9),
        },
        secondary: {
            light: alpha("#E0C2FF", 0.5),
            main: "#E0C2FF",
            dark: alpha("#E0C2FF", 0.9),
        },
    },
});

export const theme2 = createTheme({
    palette: {
        primary: {
            light: alpha("#4ba096", 0.5),
            main: "#4ba096",
            dark: alpha("#4ba096", 0.9),
        },
        secondary: {
            light: alpha("#fdfa00", 0.5),
            main: "#fdfa00",
            dark: alpha("#fdfa00", 0.9),
        },
    },
});
