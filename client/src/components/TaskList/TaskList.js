import React from "react";
import { useSelector } from "react-redux";

import "./TaskList.modules.scss"
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import Fade from "@material-ui/core/Fade";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Task from "../Task/Task.js";

import { initTaskList, getTaskList } from "../../classes/TaskList.js"

export default function TaskList() {
    const tasks = useSelector((state) => state.tasks);
    const user = useSelector((state) => state.user);
    const [dragging, setDragging] = React.useState(false);
    const toDelete = React.useRef(false);

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
        if (!result.destination || result.destination.index === result.source.index || !result) {
            console.log("Invalid", result, toDelete.current);
            // if (result.source.index !== undefined && toDelete.current) {
            //     //Delete content
            //     setContents((prevContents) => {
            //         const newContents = ObjArrayCopy(prevContents);
            //         newContents.splice(result.source.index, 1);

            //         return newContents;
            //     });
            // }
            setDragging(false);
            return;
        }

        getTaskList().updateTaskOrder(result.source.index, result.destination.index)

        //Delay setting dragging to false to allow drop animation to complete
        setTimeout(() => {
            setDragging(false);
        }, 100);
    };

    function dragStartHandler(e) {
        //Set dragging which disables animation on circular progress and fade in/out of play/pause
        setDragging(true);
        document.activeElement.blur();
    }

    function deleteEnter() {
        toDelete.current = true;
        console.log("Entered");
    }

    function deleteLeave() {
        toDelete.current = false;
        console.log("Leaved");
    }

    return (
        <DragDropContext onDragEnd={dragEndHandler} onDragStart={dragStartHandler}>
            <Paper className={"main-paper"} classes={{ root: "main-paper-root" }} elevation={0}>
                <Typography variant="h6">TaskList</Typography>
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
                <div className={"add-button"}>
                    <Zoom in={!dragging} timeout={{ enter: 100, exit: 150 }}>

                        <Fab size="medium" classes={{ root: "add-button-root" }} onClick={addNewTask}>
                            <AddIcon />
                        </Fab>
                    </Zoom>
                    <Zoom in={dragging} timeout={{ enter: 100, exit: 150 }}>
                        <Fab size="medium" classes={{ root: "delete-button-root" }} onMouseEnter={deleteEnter} onMouseLeave={deleteLeave}>
                            <DeleteIcon />
                        </Fab>
                    </Zoom>
                </div>
            </Paper>
        </DragDropContext>
    );
};