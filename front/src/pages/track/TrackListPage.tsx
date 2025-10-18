import LinearProgress from "@mui/material/LinearProgress";
import { useGetTracksQuery } from "../../store/services/trackApi";
import type { Track } from "./types";
import TrackCard from "../../components/cards/TrackCard";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { audioUrl } from "../../env";
import { Box, Typography, IconButton } from "@mui/material";
import "./trackStyle.css";
import { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router";
import { useAppSelector } from "../../hooks/hooks";

const TrackListPage = () => {
    const [index, setIndex] = useState<number>(0);
    const { data, isLoading } = useGetTracksQuery(null);

    const { isAuth, user } = useAppSelector((state) => state.auth);

    const nextHandler = () => {
        const count = data?.payload.length;
        if (index < count - 1) {
            setIndex((prev) => prev + 1);
        } else {
            setIndex(0);
        }
    };

    const prevHandler = () => {
        const count = data?.payload.length;
        if (index > 0) {
            setIndex((prev) => prev - 1);
        } else {
            setIndex(count - 1);
        }
    };

    return (
        <>
            {isLoading ? (
                <LinearProgress color="secondary" />
            ) : (
                <Box minHeight="200vh">
                    {data?.payload.map((track: Track, index: number) => (
                        <TrackCard
                            key={track.id}
                            track={track}
                            index={index}
                            setIndex={setIndex}
                        />
                    ))}
                    {isAuth && user?.roles.includes("admin") && (
                        <Box
                            width="100%"
                            display="flex"
                            justifyContent="center"
                        >
                            <Link to="/track/create">
                                <IconButton color="primary">
                                    <AddCircleOutlineIcon
                                        sx={{ fontSize: "2.5em" }}
                                    />
                                </IconButton>
                            </Link>
                        </Box>
                    )}
                    <Box className="playerBox">
                        <Typography sx={{ mx: 2 }}>
                            {data?.payload[index].title}
                        </Typography>
                        <AudioPlayer
                            volume={0.05}
                            autoPlayAfterSrcChange
                            onClickPrevious={prevHandler}
                            onClickNext={nextHandler}
                            showSkipControls
                            src={`${audioUrl}/${data?.payload[index].audioUrl}`}
                        />
                    </Box>
                </Box>
            )}
        </>
    );
};

export default TrackListPage;
