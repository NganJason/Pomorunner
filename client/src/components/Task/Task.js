import "./Task.modules.scss";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import TaskContent from "./TaskContent/TaskContent.js";
import PlayPauseButton from "./PlayPauseButton/PlayPauseButton";

export default function Task(props) {
    const {content} = props;
    return (
        <Grid item xs={12}>
            <Paper className={"task-paper"} elevation={0}>
                <Grid container className={"task-container"} alignItems={"center"}>
                    <Grid item xs={1} className={"task-item"}>
                        <Checkbox color="default"></Checkbox>
                    </Grid>
                    <Grid item xs={10}>
                        <TaskContent content={content} />
                    </Grid>
                    <Grid item xs={1}>
                        <PlayPauseButton maxTime={5.0}/>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}