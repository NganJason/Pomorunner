import "./Countdown.modules.scss";
import React from "react";
import { useSelector } from "react-redux";

import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

import {clockUtils} from "../../utils/clockUtils.js"

export default function Countdown(props) {
    const tasks = useSelector((state) => state.tasks);
    const [currTime, setCurrTime] = React.useState(clockUtils.getTwentyFourHrTime())
    

    let countdownVal = -1, progressVal = -5, countdownMins = 0, countdownSecs = 0;
    const runningIndex = tasks.findIndex((elem) => elem.running);
    if (runningIndex !== -1) {
        countdownVal = tasks[runningIndex].pomodoro_duration - tasks[runningIndex].secondsElapsed;
        countdownMins = Math.floor(countdownVal / 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        countdownSecs = (countdownVal % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false, maximumFractionDigits: 0 });
        progressVal = tasks[runningIndex].secondsElapsed / tasks[runningIndex].pomodoro_duration * 100;
    }   

    React.useEffect(() => {
        const INTERVAL = 1000

        let timerID = setInterval(() => {
          setCurrTime(clockUtils.getTwentyFourHrTime());
        }, INTERVAL);

        return () => {
          clearInterval(timerID);
        };
    }, [])

    return (
        <>
            <Fade in={countdownVal !== -1} timeout={{enter: 2000, exit: 2000}} style={{display: countdownVal === -1 && "none"}}>
                <Typography
                    variant={"h3"}
                    paragraph={true}
                    classes={{
                        root: "timer-root",
                        h1: "timer-h1",
                        h3: "timer-h1"
                    }}
                >
                    {`${countdownMins}:${countdownSecs}`}
                </Typography>
            </Fade>
            <Fade in={countdownVal === -1} timeout={{enter: 2000, exit: 2000}} style={{display: countdownVal !== -1 && "none"}}>
                <Typography
                    variant={"h3"}
                    paragraph={true}
                    classes={{
                        root: "timer-root",
                        h1: "timer-h1",
                        h3: "timer-h1"
                    }}
                >
                    {currTime}
                </Typography>
            </Fade>
            <LinearProgress
                variant="determinate"
                value={progressVal}
                classes={{
                    root: "progress-root",
                    determinate: "progress-determinate",
                    bar: "progress-bar",
                }}
            />
        </>
    )
}