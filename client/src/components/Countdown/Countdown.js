import "./Countdown.modules.scss";
import React from "react";
import { useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function Countdown(props) {
    const tasks = useSelector((state) => state.tasks);

    let countdownVal = -1, progressVal = -5, countdownMins = 0, countdownSecs = 0;
    const runningIndex = tasks.findIndex((elem) => elem.running);
    if (runningIndex !== -1) {
        countdownVal = tasks[runningIndex].pomodoro_duration - tasks[runningIndex].secondsElapsed;
        countdownMins = Math.floor(countdownVal / 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
        countdownSecs = (countdownVal % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false, maximumFractionDigits: 0 });
        progressVal = tasks[runningIndex].secondsElapsed / tasks[runningIndex].pomodoro_duration * 100;
    }

    //What to show when nothing is running?

    return (
        <>
            <div className={"clock-container"}>
                <Typography
                    variant={`${countdownVal !== -1 ? "h1" : "h3"}`}
                    paragraph={true}
                    classes={{
                        root: "timer-root",
                        h1: "timer-h1",
                        h3: "timer-h1"
                    }}
                >
                    {countdownVal !== -1 ? `${countdownMins}:${countdownSecs}` : "Pomorunner"}
                </Typography>
            </div>
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