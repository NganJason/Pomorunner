import "./TaskList.modules.scss"
import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Task from "../Task/Task.js";

export default function TaskList() {
    return (
        <>
            <Paper className={"main-paper"} classes={{ root: "main-paper-root" }}>
                <Grid container>
                    <Grid item>
                        <Typography variant="h6">TaskList</Typography>
                    </Grid>
                    <Task content="Content"/>
                    <Task content="Content"/>
                    <Task content="Content"/>
                    <Task content="Content"/>
                </Grid>
            <div className={"add-button"}>
                <Button variant="contained" disableElevation={false}>Add</Button>
            </div>
            </Paper>
        </>
    );
};