import type React from "react";
import type { Track } from "../../pages/track/types";
import { Box, Typography } from "@mui/material";
import "./cards.css";
import { imagesUrl } from "../../env";

const TrackCard: React.FC<{ track: Track, index: number, setIndex: React.Dispatch<React.SetStateAction<number>> }> = ({ track, index, setIndex }) => {
    const playTrack = () => {
        setIndex(index);
    }

    return (
        <Box>
            <Box display="flex" alignItems="center" my={3}>
                <Box
                    className='track-cover'
                    mx={1}
                    component="img"
                    src={`${imagesUrl}/${track.posterUrl ? track.posterUrl : "posterDefault.png"}`}
                    width={90}
                    height={90}
                    onClick={playTrack}
                />
                <Box mx={1}>
                    <Typography variant="h6">{track.title}</Typography>
                    <Typography>{track.description}</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default TrackCard;
