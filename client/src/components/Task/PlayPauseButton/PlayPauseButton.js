import React from "react";
import { useSelector } from "react-redux";

import "./PlayPauseButton.modules.scss";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import IconButton from "@material-ui/core/IconButton";
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { ObjArrayCopy } from "../../../common/ObjArrayCopy.js";
import { taskActions } from "../../../redux/Tasks/taskActions.js"

export default function PlayPauseButton(props) {
    const { timerIDStates, index, dragging, task } = props;
    const { running, pomodoro_progress } = task;

    const tasks = useSelector((state) => state.tasks);

    function playClick() {
        const newTasks = ObjArrayCopy(tasks);
        newTasks[index].running = !newTasks[index].running;

        //Attach timer
        if (newTasks[index].running) {
            //Clear and reset previous timer if there was one
            if (timerIDStates.current[index] !== 0)
                clearInterval(timerIDStates.current[index]);

            //Reset progress if it was previously run
            if (newTasks[index].pomodoro_progress === 100.0)
                newTasks[index].pomodoro_progress = 0;

            timerIDStates.current[index] = setInterval(() => {
                const newtasks = ObjArrayCopy(tasks);
                newTasks[index].pomodoro_progress += 1 / newTasks[index].pomodoro_duration * 100.0;
                if (newTasks[index].pomodoro_progress > 100) {
                  newTasks[index].pomodoro_progress = 100;
                }

                taskActions.setTasks(newtasks);
            }, 1000);
        }

        //Clear timer and timerID if paused
        else {
            clearInterval(timerIDStates.current[index]);
            timerIDStates.current[index] = 0;
        }

        taskActions.setTasks(newTasks)
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