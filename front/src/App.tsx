import { Route, Routes } from "react-router";
import "./App.css";
import DefaultLayout from "./components/layouts/DefaultLayout";
import MainPage from "./pages/mainPage/MainPage";
import LoginPage from "./pages/auth/LoginPage";
import { login } from "./store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import CreateTrackPage from "./pages/track/CreateTrackPage";
import TrackListPage from "./pages/track/TrackListPage";
import { useAppSelector } from "./hooks/hooks";
import { ToastContainer, Zoom } from "react-toastify";

function App() {
    const dispatch = useDispatch();
    const { isAuth, user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(login(token));
        }
    }, [dispatch]);

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<MainPage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="track">
                        <Route index element={<TrackListPage />} />
                        {isAuth && user?.roles.includes("admin") && (
                            <Route
                                path="create"
                                element={<CreateTrackPage />}
                            />
                        )}
                    </Route>
                </Route>
            </Routes>
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
        </>
    );
}

export default App;
