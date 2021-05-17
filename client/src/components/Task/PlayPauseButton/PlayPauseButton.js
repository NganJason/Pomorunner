import "./PlayPauseButton.modules.scss";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";

export default function PlayPauseButton(props) {
    const [started, setStarted] = React.useState(false);
    const [progress, setProgress] = React.useState(0.0);
    const [timerID, setTimerID] = React.useState(0);
    const {maxTime} = props;

    //Callback when play pause button is pressed
    function playClick() {
        setStarted((prev) => {
            let newVal = !prev;

            //If now stopped, clear interval
            if(!newVal)
                clearInterval(timerID);

            return newVal;
        });

        //If progress was 100, then pause was pressed, then reset progress
        if(progress === 100)
            setProgress(0);
    }

    //Start interval once counter is started
    React.useEffect(() => {
        if(started)
        {
            setTimerID(setInterval(() => {
                setProgress((prevProgress) => {
                    let newProgress = prevProgress + 1 / maxTime * 100.0;
                    if(newProgress > 100)
                        newProgress = 100;
                    else if(newProgress < 0)
                        newProgress = 0;

                    return newProgress;
                });
            }, 1000));
        }
    }, [started, maxTime]);

    //Effect to clear timer when progress is done
    React.useEffect(() => {
        if(progress === 100)
        {
            clearInterval(timerID);
            setStarted((prev) => {
                let newVal = !prev;
                return newVal;
            });
        }
    }, [progress, timerID]);

    return (
        <>
            <IconButton onClick={playClick} className={"play-button"}>
                <Fade in={!started} className={"play-button"}>
                    <Box>
                        {progress > 0 && <CircularProgress variant="determinate" value={progress} classes={{colorPrimary: "color-primary"}}/>}
                        <Box
                            top={0}
                            left={0}
                            bottom={0}
                            right={0}
                            position="absolute"
                            display="flex"
                            alignItems="center"
                            justifyContent="center">
                            <PlayArrowIcon fontSize="default" />
                        </Box>
                    </Box>
                </Fade>
                <Fade in={started} size={"1.5rem"} className={"play-button"}>
                    <Box>
                        <CircularProgress variant="determinate" value={progress} classes={{colorPrimary: "color-primary"}}/>
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