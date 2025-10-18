import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";
import { useAppSelector } from "../../hooks/hooks";
import { logout } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import ContrastIcon from "@mui/icons-material/Contrast";
import { switchTheme } from "../../store/slices/themeSlice";

const Navbar = () => {
    const { isAuth, user } = useAppSelector((state) => state.auth);
    const dispatch = useDispatch();

    const logoutHanlder = () => {
        dispatch(logout());
    };

    const hanleChangeTheme = () => {
        dispatch(switchTheme());
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Link to="/" style={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div">
                            Треки
                        </Typography>
                    </Link>
                    <IconButton sx={{ color: "white" }} onClick={hanleChangeTheme}>
                        <ContrastIcon />
                    </IconButton>
                    {!isAuth ? (
                        <Link to="/login">
                            <Button color="inherit">Login</Button>
                        </Link>
                    ) : (
                        <Box>
                            <Button color="inherit">{user?.email}</Button>
                            <Button onClick={logoutHanlder} color="inherit">
                                Logout
                            </Button>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar;
