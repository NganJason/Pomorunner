import React from "react";
import { useSelector } from "react-redux";

import "./TaskList.modules.scss"
import Button from "@material-ui/core/Button";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Task from "../Task/Task.js";

import { initTaskList, getTaskList } from "../../classes/TaskList.js"
import { GlobalTimer } from "../../classes/GlobalTimer.js"

export default function TaskList() {
    const tasks = useSelector((state) => state.tasks);
    const user = useSelector((state) => state.user);
    const [dragging, setDragging] = React.useState(false);
    const toDelete = React.useRef(false);

    React.useEffect(() => { 
    initTaskList(user._id);

    const globalTimer = new GlobalTimer()
    globalTimer.setTimer()

    return () => {
        clearInterval(globalTimer.timerID)
    }
    }, [user]);

    async function addNewTask() {
      //Scroll to end of task list
      setTimeout(() => {
        const elem = document.getElementById("task-list-paper");
        elem.scrollTop = elem.scrollHeight;
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
                    <Fade in={!dragging} timeout={{ exit: 100 }}>
                        <Button variant="contained" disableElevation={false} classes={{ root: "add-button-root" }} onClick={addNewTask}>Add task</Button>
                    </Fade>
                    <Fade in={dragging} timeout={{ exit: 100 }}>
                        <Button variant="contained" disableElevation={false} classes={{ root: "delete-button-root" }} onMouseEnter={deleteEnter} onMouseLeave={deleteLeave}>Delete</Button>
                    </Fade>
                </div>
            </Paper>
        </DragDropContext>
    );
};