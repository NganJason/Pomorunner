import "./TaskList.modules.scss"
import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

import { TaskObj } from "../../classes/TaskObj.js";
import Task from "../Task/Task.js";
import { ObjArrayCopy } from "../../common/ObjArrayCopy.js";

const contents_start = [new TaskObj("Content 1", 0), new TaskObj("Content 1", 0), new TaskObj("Content 1", 0), new TaskObj("Content 2", 0), new TaskObj("Content 3", 0), new TaskObj("Content 4", 0)];

export default function TaskList() {
    //Set contents from DB as React state
    const [contents, setContents] = React.useState(contents_start);
    const [dragging, setDragging] = React.useState(false);
    const toDelete = React.useRef(false);

    //Tried useState before, but timer would double start on the first start, requireing a hacky fix. Found to use useRef instead
    const timerIDStates = React.useRef(contents.map((item) => item.timerID));

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
            if (index < contents.length && contents[index].running && timerIDStates.current[index] === 0) {
                timerIDStates.current[index] = setInterval(() => {
                    setContents((prevContents) => {
                        const newContents = ObjArrayCopy(prevContents);

                        let newProgress = newContents[index].pomodoro_progress + 1 / newContents[index].pomodoro_duration * 100.0;
                        if (newProgress > 100)
                            newProgress = 100;
                        else if (newProgress < 0)
                            newProgress = 0;

                        newContents[index].pomodoro_progress = newProgress;
                        return newContents;
                    });
                }, 1000);
            }
        })
    }, [contents, timerIDStates])

    //Handler for drag end
    const dragEndHandler = (result) => {
        //If result is invalid, return
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
                                    {contents.map((content, index) => {
                                        return (
                                            <Draggable key={index} draggableId={`${index}`} index={index}>
                                                {(provided) => {
                                                    return <Task
                                                        index={index}
                                                        timerIDStates={timerIDStates}
                                                        setContents={setContents}
                                                        content={content}
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