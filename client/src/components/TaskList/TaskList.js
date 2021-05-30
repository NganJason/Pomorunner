import React from "react";
import { useSelector } from "react-redux";

import "./TaskList.modules.scss"
import Button from "@material-ui/core/Button";
<<<<<<< HEAD
=======
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
>>>>>>> eedb32c048df607a1312fb5ff8157d210d6f46fa
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Task from "../Task/Task.js";

<<<<<<< HEAD
import { ObjArrayCopy } from "../../common/ObjArrayCopy.js";
import { taskActions } from "../../redux/Tasks/taskActions.js"
import { TaskObj } from "../../classes/TaskObj.js";
=======
const contents_start = [new TaskObj("Content 1", 0), new TaskObj("Content 1", 0), new TaskObj("Content 1", 0), new TaskObj("Content 2", 0), new TaskObj("Content 3", 0), new TaskObj("Content 4", 0)];
>>>>>>> eedb32c048df607a1312fb5ff8157d210d6f46fa

export default function TaskList() {
    const tasks = useSelector((state) => state.tasks);
    const [dragging, setDragging] = React.useState(false);
    const toDelete = React.useRef(false);

    const timerIDStates = React.useRef(tasks.map((item) => item.timerID));

    function addNewTask() {
        setContents(prevContents => {
            const newContents = ObjArrayCopy(prevContents);
            newContents.push(new TaskObj("", 0));

            //Delay until after setContent is complete
            setTimeout(() => {
                //Scroll to end of task list
                const elem = document.getElementById("task-list-paper");
                elem.scrollTop = elem.scrollHeight;
            }, 0);

            return newContents;
        });
    }

    React.useEffect(() => {
        timerIDStates.current.forEach((_, index) => {
            if (index < tasks.length && tasks[index].running && timerIDStates.current[index] === 0) {
                timerIDStates.current[index] = setInterval(() => {
                    const newTasks = ObjArrayCopy(tasks);

                    let newProgress = newTasks[index].pomodoro_progress + 1 / newTasks[index].pomodoro_duration * 100.0;

                    if (newProgress > 100) {
                      newProgress = 100;
                    } else if (newProgress < 0) { 
                        newProgress = 0;
                    }

                    newTasks[index].pomodoro_progress = newProgress;

                    taskActions.setTasks(newTasks)
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

<<<<<<< HEAD
        const newTasks = swapContent(tasks, result.source.index, result.destination.index)
        taskActions.setTasks(newTasks)
=======
        //Swap contents
        setContents((prevContents) => {
            const newContents = ObjArrayCopy(prevContents);
            const removedItem = { ...prevContents[result.source.index] };
            newContents.splice(result.source.index, 1);

            //If not marked for deletion
            if (!toDelete.current)
                newContents.splice(result.destination.index, 0, removedItem);

            newContents.forEach(item => item.lastEdit = new Date().getSeconds());

            return newContents;
        });
>>>>>>> eedb32c048df607a1312fb5ff8157d210d6f46fa

        //Delay setting dragging to false to allow drop animation to complete
        setTimeout(() => {
            setDragging(false);
        }, 100);
    };

<<<<<<< HEAD
    function dragStartHandler() {
=======
    function dragStartHandler(e) {
        //Set dragging which disables animation on circular progress and fade in/out of play/pause
>>>>>>> eedb32c048df607a1312fb5ff8157d210d6f46fa
        setDragging(true);
        document.activeElement.blur();

        //Disable all timers on pickup of any item
        //Map or foreach does not work to set timerIDStates.current. Explicit set required
        timerIDStates.current.forEach((item, index) => {
            clearInterval(item);
            timerIDStates.current[index] = 0;
        });
    }

<<<<<<< HEAD
    function swapContent(content, source_index, destination_index) {
      const newContent = ObjArrayCopy(content);
      const removedItem = { ...content[source_index] };

      newContent.splice(source_index, 1);
      newContent.splice(destination_index, 0, removedItem);

      return newContent;
=======
    function deleteEnter() {
        toDelete.current = true;
        console.log("Entered");
    }

    function deleteLeave() {
        toDelete.current = false;
        console.log("Leaved");
>>>>>>> eedb32c048df607a1312fb5ff8157d210d6f46fa
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
<<<<<<< HEAD
                                    <Grid item>
                                        <Typography variant="h6">TaskList</Typography>
                                    </Grid>
                                    {tasks.map((task, index) => {
=======
                                    {contents.map((content, index) => {
>>>>>>> eedb32c048df607a1312fb5ff8157d210d6f46fa
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