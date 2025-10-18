import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import type { CreateTrack, Genre } from "./types";
import { useFormik } from "formik";
import { useState, type ChangeEvent } from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { useCreateTrackMutation } from "../../store/services/trackApi";
import { useGetGenresQuery } from "../../store/services/genreApi";
import { LinearProgress, MenuItem, Select, InputLabel } from "@mui/material";
import { useNavigate } from "react-router";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: "auto",
    [theme.breakpoints.up("sm")]: {
        maxWidth: "450px",
    },
    boxShadow:
        "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
        boxShadow:
            "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
}));

const Container = styled(Stack)(({ theme }) => ({
    minHeight: "100%",
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
        padding: theme.spacing(4),
    },
    "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        zIndex: -1,
        inset: 0,
        backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
        backgroundRepeat: "no-repeat",
        ...theme.applyStyles("dark", {
            backgroundImage:
                "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
        }),
    },
}));

const CreateTrackPage = () => {
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const { data, isLoading } = useGetGenresQuery(null);
    const [createTrack] = useCreateTrackMutation();
    const navigate = useNavigate();

    const convertDate = (date: Date) => {
        const iso = date.toISOString().substring(0, 10);
        return iso;
    };

    const initValues: CreateTrack = {
        title: "",
        description: "",
        releaseDate: convertDate(new Date()),
        posterUrl: "",
        genreId: "",
    };

    const handleAudioFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setAudioFile(files[0]);
        }
    };

    const handleSubmit = async (values: CreateTrack) => {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("description", values.description);
        formData.append("releaseDate", values.releaseDate);
        formData.append("posterUrl", values.posterUrl);
        formData.append("genreId", values.genreId);
        if (audioFile) {
            formData.append("audioFile", audioFile);
        }

        const result = await createTrack(formData);

        if (result.data?.isSuccess) {
            navigate("/");
        }
    };

    const formik = useFormik({
        initialValues: initValues,
        onSubmit: handleSubmit,
    });

    if (isLoading) {
        return <LinearProgress color="secondary" />;
    }

    return (
        <>
            <CssBaseline enableColorScheme />
            <Container direction="column" justifyContent="space-between">
                <Card variant="outlined">
                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            width: "100%",
                            fontSize: "clamp(2rem, 10vw, 2.15rem)",
                        }}
                    >
                        Новий трек
                    </Typography>
                    <Box
                        onSubmit={formik.handleSubmit}
                        component="form"
                        noValidate
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            gap: 2,
                        }}
                    >
                        <FormControl>
                            <FormLabel htmlFor="title">Назва</FormLabel>
                            <TextField
                                id="title"
                                type="text"
                                name="title"
                                placeholder="Назва пісні"
                                autoFocus
                                required
                                fullWidth
                                variant="outlined"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="description">Опис</FormLabel>
                            <TextField
                                name="description"
                                type="text"
                                placeholder="Опис"
                                id="description"
                                fullWidth
                                variant="outlined"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="releaseDate">
                                Дата виходу
                            </FormLabel>
                            <TextField
                                name="releaseDate"
                                type="date"
                                placeholder="Дата виходу"
                                id="releaseDate"
                                fullWidth
                                variant="outlined"
                                value={formik.values.releaseDate}
                                onChange={formik.handleChange}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="posterUrl">
                                Обкладинка
                            </FormLabel>
                            <TextField
                                name="posterUrl"
                                type="text"
                                placeholder="Обкладинка"
                                id="posterUrl"
                                fullWidth
                                variant="outlined"
                                value={formik.values.posterUrl}
                                onChange={formik.handleChange}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel id="genreId">Жанр</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="genreId"
                                name="genreId"
                                value={
                                    formik.values.genreId === ""
                                        ? data?.payload[0].id
                                        : formik.values.genreId
                                }
                                label="Жанр"
                                onChange={formik.handleChange}
                            >
                                {data?.payload.map((genre: Genre) => (
                                    <MenuItem key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            color="secondary"
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<MusicNoteIcon />}
                        >
                            Завантажити трек
                            <VisuallyHiddenInput
                                accept="audio/*"
                                type="file"
                                onChange={handleAudioFileChange}
                            />
                        </Button>
                        {audioFile && <Typography>{audioFile.name}</Typography>}

                        <Button type="submit" fullWidth variant="contained">
                            Створити
                        </Button>
                    </Box>
                </Card>
            </Container>
        </>
    );
};

export default CreateTrackPage;
