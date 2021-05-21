import "./PlayPauseButton.modules.scss";
import React from "react";
import IconButton from "@material-ui/core/IconButton";
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import { ObjArrayCopy } from "../../../common/ObjArrayCopy.js";

export default function PlayPauseButton(props) {
    const { timerIDStates, index, dragging, content, setContents } = props;
    const { running, pomodoro_progress } = content;

    //Callback when play pause button is pressed
    function playClick() {
        setContents((prevContents) => {
            //Deep copy of array of objects
            const newContents = ObjArrayCopy(prevContents);

            //Toggle running state
            newContents[index].running = !prevContents[index].running;

            //Attach timer if now runnning
            if (newContents[index].running) {
                //Clear and reset previous timer if there was one
                if (timerIDStates.current[index] !== 0)
                    clearInterval(timerIDStates.current[index]);

                //Reset progress if it was previously run
                if (newContents[index].pomodoro_progress === 100.0)
                    newContents[index].pomodoro_progress = 0;

                timerIDStates.current[index] = setInterval(() => {
                    setContents(prevContents => {
                        const newContents = ObjArrayCopy(prevContents);
                        newContents[index].pomodoro_progress += 1 / newContents[index].pomodoro_duration * 100.0;
                        if (newContents[index].pomodoro_progress > 100)
                            newContents[index].pomodoro_progress = 100;

                        return newContents;
                    })
                }, 1000);
            }

            //Clear timer and timerID if paused
            else {
                clearInterval(timerIDStates.current[index]);
                timerIDStates.current[index] = 0;
            }

            return newContents;
        })
    }

    //Disable and clear timer if progress is full
    React.useEffect(() => {
        if (pomodoro_progress === 100.0) {
            setContents((prevContents) => {
                const newContents = ObjArrayCopy(prevContents);
                newContents[index].running = false;
                clearInterval(timerIDStates.current[index]);
                timerIDStates.current[index] = 0;

                return newContents;
            });
        }
    }, [pomodoro_progress, index, setContents, timerIDStates])

    return (
        <IconButton onClick={playClick} className={"play-button"}>
            <Fade in={!running} className={"play-button"} timeout={dragging ? 0 : 200}>
                <Box>
                    {pomodoro_progress >= 0 && <CircularProgress variant="determinate" value={Number(pomodoro_progress)} classes={{ colorPrimary: "color-primary", circleDeterminate: `${dragging ? "disable-anim" : "null"}` }} />}
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
            <Fade in={running} size={"1.5rem"} className={"play-button"} timeout={dragging ? 0 : 200}>
                <Box>
                    <CircularProgress variant="determinate" value={Number(pomodoro_progress)} classes={{ colorPrimary: "color-primary", circleDeterminate: `${dragging ? "disable-anim" : "null"}` }} />
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
    )
}