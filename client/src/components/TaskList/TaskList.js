import React from "react";
import { useSelector } from "react-redux";

import "./TaskList.modules.scss"
import Button from "@material-ui/core/Button";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Task from "../Task/Task.js";

import { ObjArrayCopy } from "../../common/ObjArrayCopy.js";
import { taskActions } from "../../redux/Tasks/taskActions.js"
import { TaskObj } from "../../classes/TaskObj.js";

export default function TaskList() {
    const tasks = useSelector((state) => state.tasks);
    const [dragging, setDragging] = React.useState(false);

    const timerIDStates = React.useRef(tasks.map((item) => item.timerID));

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
            setDragging(false);
            return;
        }

        const newTasks = swapContent(tasks, result.source.index, result.destination.index)
        taskActions.setTasks(newTasks)

        //Delay setting dragging to false to allow drop animation to complete
        setTimeout(() => {
            setDragging(false);
        }, 100);
    };

    function dragStartHandler() {
        setDragging(true);

        //Disable all timers on pickup of any item
        //Map or foreach does not work to set timerIDStates.current. Explicit set required
        timerIDStates.current.forEach((item, index) => {
            clearInterval(item);
            timerIDStates.current[index] = 0;
        });
    }

    function swapContent(content, source_index, destination_index) {
      const newContent = ObjArrayCopy(content);
      const removedItem = { ...content[source_index] };

      newContent.splice(source_index, 1);
      newContent.splice(destination_index, 0, removedItem);

      return newContent;
    }

    return (
        <DragDropContext onDragEnd={dragEndHandler} onDragStart={dragStartHandler}>
            <Paper className={"main-paper"} classes={{ root: "main-paper-root" }}>
                <Droppable droppableId="task-list">
                    {(provided) => {
                        return (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <Grid container>
                                    <Grid item>
                                        <Typography variant="h6">TaskList</Typography>
                                    </Grid>
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
                            </div>
                        )
                    }}
                </Droppable>

                <div className={"add-button"}>
                    <Button variant="contained" disableElevation={false}>Add</Button>
                </div>
            </Paper>
        </DragDropContext>
    );
};