import "./Task.modules.scss";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import TaskContent from "./TaskContent/TaskContent.js";
import PlayPauseButton from "./PlayPauseButton/PlayPauseButton";
import { ObjArrayCopy } from "../../common/ObjArrayCopy.js";

export default function Task(props) {
    const { index, content, setContents, timerIDStates, provided, dragging } = props;
    const { checked } = content;

    //Toggle checked state
    function onCheckboxChange() {
        setContents((prevContents) => {
            const newContents = ObjArrayCopy(prevContents);
            newContents[index].checked = !newContents[index].checked;
            return newContents;
        });
    }

    return (
        <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
            <Paper className={"task-paper"} elevation={0}>
                <Grid container className={"task-container"} alignItems={"center"} id={content}>
                    <Grid item xs={1} className={"task-item"}>
                        <Checkbox color="default" checked={checked} onChange={onCheckboxChange}></Checkbox>
                    </Grid>
                    <Grid item xs={10}>
                        <TaskContent content={content.content} />
                    </Grid>
                    <Grid item xs={1}>
                        <PlayPauseButton
                            setContents={setContents}
                            timerIDStates={timerIDStates}
                            content={content}
                            index={index}
                            dragging={dragging}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}