import React from "react";
import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import "./PlayPauseButton.modules.scss";
import { getTaskList } from "../../../classes/TaskList.js"

export default function PlayPauseButton(props) {
    const { index, dragging, task} = props;
    const { running, pomodoro_progress } = task;

    const tasks = useSelector((state) => state.tasks);

    function playClick() {    
        const current_running = !tasks[index].running
        getTaskList().updateProgressRunning(index, current_running);
    }

    //Disable and clear timer if progress is full
    React.useEffect(() => {
        if (pomodoro_progress >= 100.0) {
          if (getTaskList()) {
              getTaskList().updateProgressRunning(index, false);
          }
        }
    }, [pomodoro_progress, index])

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