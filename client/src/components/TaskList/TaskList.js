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

export default function TaskList() {
    const tasks = useSelector((state) => state.tasks);
    const user = useSelector((state) => state.user);
    const [dragging, setDragging] = React.useState(false);
    const toDelete = React.useRef(false);

    const timerIDStates = React.useRef(tasks.map((item) => item.timerID));

    React.useEffect(() => {
        (async function () {
          initTaskList(user._id);
        })();
    }, [user]);

    async function addNewTask() {
        //Delay until after setContent is complete
        setTimeout(() => {
            //Scroll to end of task list
            const elem = document.getElementById("task-list-paper");
            elem.scrollTop = elem.scrollHeight;
        }, 0);
        
        getTaskList().addTask()
    }

    React.useEffect(() => {
        timerIDStates.current.forEach((_, index) => {
            if (index < tasks.length && tasks[index].running && timerIDStates.current[index] === 0) {
                timerIDStates.current[index] = setInterval(() => {
                    getTaskList().updatePomodoroProgress(index)
                }, 1000);
            }
        })
    }, [tasks, timerIDStates])

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

        //Disable all timers on pickup of any item
        //Map or foreach does not work to set timerIDStates.current. Explicit set required
        timerIDStates.current.forEach((item, index) => {
            clearInterval(item);
            timerIDStates.current[index] = 0;
        });
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
                                                        timerIDStates={timerIDStates}
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