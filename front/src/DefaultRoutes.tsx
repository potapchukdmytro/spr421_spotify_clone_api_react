import { Route, Routes } from "react-router";
import DefaultLayout from "./components/layouts/DefaultLayout";
import MainPage from "./pages/mainPage/MainPage";
import LoginPage from "./pages/auth/LoginPage";
import CreateTrackPage from "./pages/track/CreateTrackPage";
import TrackListPage from "./pages/track/TrackListPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import { useAppSelector } from "./hooks/hooks";

const DefaultRoutes = () => {
    const { isAuth, user } = useAppSelector((state) => state.auth);

    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<MainPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="track">
                    <Route index element={<TrackListPage />} />
                    <Route path="create" element={<CreateTrackPage />} />
                    {/* {isAuth && user?.roles.includes("admin") && (
                        <Route path="create" element={<CreateTrackPage />} />
                    )} */}
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
};

export default DefaultRoutes;
