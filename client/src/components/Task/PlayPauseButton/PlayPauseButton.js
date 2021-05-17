import "./PlayPauseButton.scss";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

export default function PlayPauseButton(props) {
    const [started, toggleStarted] = React.useState(false);
    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
        }, 59);

        return () => {
            clearInterval(timer);
        };
    }, []);

    function playClick() {
        toggleStarted(!started);
        setProgress(0);
    }

    return (
        <>
            <IconButton onClick={playClick} className={"play-button"}>
                <Fade in={!started} className={"play-button"}>
                    <PlayArrowIcon fontSize="default" />
                </Fade>
                <Fade in={started} size={"1.5rem"} className={"play-button"}>
                    <Box>
                        <CircularProgress variant="determinate" value={progress} />
                        <Box
                            top={0}
                            left={0}
                            bottom={0}
                            right={0}
                            position="absolute"
                            display="flex"
                            alignItems="center"
                            justifyContent="center">
                            <PauseIcon />
                        </Box>
                    </Box>
                </Fade>
            </IconButton>
        </>
    )
}