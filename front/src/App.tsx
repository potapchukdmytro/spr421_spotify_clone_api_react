import { Route, Routes } from "react-router";
import "./App.css";
import DefaultLayout from "./components/layouts/DefaultLayout";
import MainPage from "./pages/mainPage/MainPage";
import LoginPage from "./pages/auth/LoginPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<MainPage />} />
                <Route path="login" element={<LoginPage />} />
            </Route>
        </Routes>
    );
}

export default App;
