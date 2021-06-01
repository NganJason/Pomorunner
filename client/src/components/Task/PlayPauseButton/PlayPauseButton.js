import React from "react";
import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import "./PlayPauseButton.modules.scss";
import { ObjArrayCopy } from "../../../common/ObjArrayCopy.js";
import { taskActions } from "../../../redux/Tasks/taskActions.js";

export default function PlayPauseButton(props) {
    const { timerIDStates, index, dragging, task} = props;
    const { running, pomodoro_progress } = task;

    const tasks = useSelector((state) => state.tasks);

    //Callback when play pause button is pressed
    function playClick() {
        //Deep copy of array of objects
        const newTasks = ObjArrayCopy(tasks);

        //Toggle running state
        newTasks[index].running = !tasks[index].running;
        
        //Attach timer if now runnning
        if (newTasks[index].running) {
            //Clear and reset previous timer if there was one
            if (timerIDStates.current[index] !== 0)
                clearInterval(timerIDStates.current[index]);

            //Reset progress if it was previously run
            if (newTasks[index].pomodoro_progress === 100.0)
                newTasks[index].pomodoro_progress = 0;
            
            timerIDStates.current[index] = setInterval(() => {
                taskActions.updatePomodoroProgress(index);
            }, 1000);
        }

        //Clear timer and timerID if paused
        else {
            clearInterval(timerIDStates.current[index]);
            timerIDStates.current[index] = 0;
        }

        taskActions.setTasks(newTasks);
    }

    //Disable and clear timer if progress is full
    React.useEffect(() => {
        if (pomodoro_progress === 100.0) {
            const newTasks = ObjArrayCopy(tasks);
            newTasks[index].running = false;

            clearInterval(timerIDStates.current[index]);
            timerIDStates.current[index] = 0;

            taskActions.setTasks(newTasks)
        }
    }, [pomodoro_progress, index, timerIDStates])

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