import "./App.css";
import { login } from "./store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import DefaultRoutes from "./DefaultRoutes";
import { ThemeProvider } from "@mui/material";
import { theme1, theme2 } from "./theming/themes";
import { useAppSelector } from "./hooks/hooks";

function App() {
    const dispatch = useDispatch();
    const {firstTheme} = useAppSelector((state) => state.theme);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(login(token));
        }
    }, [dispatch]);

    return (
        <>
            <ThemeProvider theme={firstTheme ? theme1 : theme2}>
                <DefaultRoutes />
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    limit={3}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Zoom}
                />
            </ThemeProvider>
        </>
    );
}

export default App;
