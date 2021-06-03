import "./SubTaskList.modules.scss";
import "../TaskList/TaskList.modules.scss";
import React from "react";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import CancelIcon from '@material-ui/icons/Cancel';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { TaskObj } from "../../classes/TaskObj.js";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import SubTask from "../SubTask/SubTask.js";

import { useSelector } from "react-redux";
import { getTaskList } from "../../classes/TaskList.js"

const subtasks = [new TaskObj("Buy medicine", 0), new TaskObj("Wash fur", 0)];

export default function SubTaskList(props) {
    const tasks = useSelector((state) => state.tasks);
    const [dragging, setDragging] = React.useState(false);
    const subtasksIndex = tasks.findIndex(elem => elem.subtasksVisible);

    const task = tasks[subtasksIndex];

    function closeClicked(e) {
        getTaskList().setSubtasksVisibility(subtasksIndex, false);
    }

    function dragStartHandler(e) {

    }

    function dragEndHandler(e) {

    }

    return (
        <>
            <DragDropContext onDragEnd={dragEndHandler} onDragStart={dragStartHandler}>
                <Fade in={subtasksIndex !== -1}>
                    <Paper className={"main-paper"} classes={{ root: "main-paper-root" }} elevation={0}>
                        <Grid container alignItems="center">
                            <Grid item xs={11}>
                                <Typography variant="h6">{task ? task.content : ""}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <IconButton className={"close-button"} onClick={closeClicked}>
                                    <CancelIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                        <Droppable droppableId="sub-task-list">
                            {(provided) => {
                                return (
                                    <Paper ref={provided.innerRef} {...provided.droppableProps} className={"content-div"} id="task-list-paper" classes={{ root: "content-paper" }} elevation={0}>
                                        {/* <Paper className={"content-div"} id="task-list-paper" classes={{ root: "content-paper" }} elevation={0}> */}
                                        <Grid container>
                                            {subtasks.map((task, index) => {
                                                return (
                                                    <Draggable key={index} draggableId={`${index}`} index={index}>
                                                        {(provided) => {
                                                            return <SubTask
                                                                index={index}
                                                                // timerIDStates={timerIDStates}
                                                                task={task}
                                                                provided={provided}
                                                                dragging={dragging}
                                                            />
                                                        }}
                                                    </Draggable>
                                                );
                                            })}
                                            {provided.placeholder}
                                        </Grid>
                                    </Paper>
                                )
                            }}
                        </Droppable>
                    </Paper>
                </Fade>
                <div className={"subtask-div"}>
                </div>
            </DragDropContext>
        </>
    )
}