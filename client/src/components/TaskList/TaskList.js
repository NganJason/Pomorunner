import React from "react";
import { useSelector } from "react-redux";

import "./TaskList.modules.scss"
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import { clockUtils } from "../../utils/clockUtils";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Task from "../Task/Task.js";
import { MouseDown } from "../../classes/MouseEvents.js";

import { initTaskList, getTaskList } from "../../classes/TaskList.js"

export default function TaskList(props) {
    const tasks = useSelector((state) => state.tasks);
    const user = useSelector((state) => state.user);
    const [dragging, setDragging] = React.useState(false);
    const [mouseInList, setMouseInList] = React.useState(false);
    const toDelete = React.useRef(false);
    const { side } = props;

    React.useEffect(() => {
        if (user._id) {
            initTaskList(user._id);
        }
    }, [user]);

    async function addNewTask() {
        //Scroll to end of task list
        setTimeout(() => {
            const elem = document.getElementById("task-list-paper");
            elem.scrollTop = elem.scrollHeight;

            //Focus last item
            const elems = document.getElementsByClassName("task-input-outlined-root");
            elems[elems.length - 1].firstChild.focus();
        }, 0);

        getTaskList().addTask();
    }

    const dragEndHandler = (result) => {
        if (toDelete.current) {
            getTaskList().deleteTask(result.source.index)
            toDelete.current = false;
        }

        if (!result.destination || result.destination.index === result.source.index || !result) {
            setDragging(false);
            return;
        }

        getTaskList().updateTaskOrder(result.source.index, result.destination.index)

        //Delay setting dragging to false to allow drop animation to complete
        setTimeout(() => {
            setDragging(false);
        }, 0);
    };

    function dragStartHandler(e) {
        //Set dragging which disables animation on circular progress and fade in/out of play/pause
        setDragging(true);
        document.activeElement.blur();
    }

    function deleteEnter() {
        if (dragging && MouseDown)
            toDelete.current = true;
    }

    function deleteLeave() {
        if (dragging && MouseDown)
            toDelete.current = false;
    }

    function onTaskListEnter() {
        setMouseInList(true);
    }

    function onTaskListLeave() {
        setMouseInList(false);
    }

    return (
        <DragDropContext onDragEnd={dragEndHandler} onDragStart={dragStartHandler}>
            <Paper
                className={"main-paper"}
                classes={{ root: `main-paper-root ${side !== undefined ? side + "-task-list" : ""}` }}
                elevation={0}
                onMouseEnter={onTaskListEnter}
                onMouseLeave={onTaskListLeave}
            >
                <div className={"day-date-div"}>
                    <Typography variant="h5">Monday</Typography>
                    <Typography variant="p">{clockUtils.getDateMonthYear()}</Typography>
                    <br />
                </div>
                <Droppable droppableId="task-list">
                    {(provided) => {
                        return (
                            <Paper ref={provided.innerRef} {...provided.droppableProps} className={"content-div"} id="task-list-paper" classes={{ root: "content-paper" }} elevation={0}>
                                <Grid container>
                                    {tasks.map((task, index) => {
                                        return (
                                            <Draggable key={index} draggableId={`${index}`} index={index}>
                                                {(provided) => {
                                                    return <Task
                                                        index={index}
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
                <Zoom in={mouseInList}>
                    <div className={"add-button"}>
                        <Zoom in={!dragging} timeout={{ enter: 100, exit: 150 }}>

                            <Fab size="medium" classes={{ root: "add-button-root" }} onClick={addNewTask}>
                                <AddIcon />
                            </Fab>
                        </Zoom>
                        <Zoom in={dragging} timeout={{ enter: 100, exit: 150 }}>
                            <Fab size="medium" classes={{ root: "delete-button-root" }} onMouseEnter={deleteEnter} onMouseLeave={deleteLeave}>
                                <DeleteIcon fontSize="small" />
                            </Fab>
                        </Zoom>
                    </div>
                </Zoom>
            </Paper>
        </DragDropContext>
    );
};