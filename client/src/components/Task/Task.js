import React from "react";
import { useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PlayPauseButton from "./PlayPauseButton/PlayPauseButton";
import TextField from "@material-ui/core/TextField";

import "./Task.modules.scss";
import { getTaskList } from "../../classes/TaskList.js"

const fadeExit = 30;

export default function Task(props) {
    const { index, task, provided, dragging } = props;
    const { checked, subtasksVisible } = task;

    const tasks = useSelector((state) => state.tasks);
    const [optionsVisible, setOptionsVisible] = React.useState(false);
    const [handleVisible, setHandleVisible] = React.useState(false);
    const [temporaryTask, setTemporaryTask] = React.useState({ content: task.content, lastEdit: new Date().getTime() });
    const shiftHeld = React.useRef(false);

    function onCheckboxChange() {
        getTaskList().updateTask(index, {checked : !tasks[index].checked})
    }

    function onContextMenu(e) {
        e.preventDefault();
        document.activeElement.blur();
        if(subtasksVisible) 
            return;

        setOptionsVisible(prevState => !prevState);
        setHandleVisible(false);
    }

    function onOptionsButtonClick(e) {
        switch (e.currentTarget.id) {
            case "task-delete":
                getTaskList().deleteTask(index)
                setOptionsVisible(false);
                break;

            case "task-cancel":
                setOptionsVisible(false);
                break;

            case "task-subtasks":
                getTaskList().setSubtasksVisibility(index, true);
                setOptionsVisible(false);
                break;

            case "task-reset":
                getTaskList().resetTask(index);
                setOptionsVisible(false);
                break;

            default:
                break;
        }
    }

    React.useEffect(() => {
        if (dragging) {
            setOptionsVisible(false);
        }
    }, [dragging]);

    //Effect when main store content is changed
    React.useEffect(() => {
        setTemporaryTask({ content: task.content, lastEdit: new Date().getTime() });
    }, [task.content])

    const textChange = React.useCallback((e) => {
        setTemporaryTask({ content: e.target.value, lastEdit: new Date().getTime() });
    }, []);

    const onMouseEnter = React.useCallback(() => {
        if (optionsVisible && handleVisible)
            setHandleVisible(false);

        else if (!optionsVisible && !handleVisible)
            setHandleVisible(true);
    }, [optionsVisible, handleVisible]);

    const onMouseLeave = React.useCallback(() => {
        setHandleVisible(false);
    }, []);

    //Save temporary content to original store
    const textFocusOut = React.useCallback(() => {
        shiftHeld.current = false;
        getTaskList().updateTask(index, {content : temporaryTask.content, lastEdit : new Date().getTime()})        
    }, [index, temporaryTask]);

    const keyDown = React.useCallback((e) => {
        if (e.key === "Shift")
            shiftHeld.current = true;

        else if (e.key === "Enter") {
            if (!shiftHeld.current)
                document.activeElement.blur();
        }
    }, [shiftHeld]);

    const keyUp = React.useCallback((e) => {
        if (e.key === "Shift")
            shiftHeld.current = false;
    }, [shiftHeld]);

    return (
        <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="transition-style">
            <Paper className={`task-paper`} elevation={0} onContextMenu={onContextMenu} onMouseOver={onMouseEnter} onMouseLeave={onMouseLeave}>
                <Fade in={!optionsVisible && !subtasksVisible} timeout={{ exit: fadeExit }}>
                    <Grid container spacing={0} className={"task-container"} alignItems={"center"} justify="flex-start" id={task}>
                        <Grid item xs={1} className={"task-item"}>
                            <Checkbox color="default" checked={checked} onChange={onCheckboxChange}></Checkbox>
                        </Grid>
                        <Grid item xs={10} className={"text-field-grid-item"}>
                            <Grid container
                                direction="column"
                                justify="space-between"
                                spacing={1}
                            >
                                <Grid item xs={12}>
                                    <TextField
                                        classes={{
                                            root: "text-field-root"
                                        }}
                                        InputProps={{
                                            classes: {
                                                root: "outlined-root task-input-outlined-root",
                                                multiline: "outlined-multiline",
                                                disabled: "text-field-disabled",
                                                notchedOutline: "text-field-border",
                                                focused: "text-field-focused"
                                            }
                                        }}
                                        size="small"
                                        margin="none"
                                        fullWidth={true}
                                        multiline={true}
                                        variant={"outlined"}
                                        value={temporaryTask.lastEdit > task.lastEdit ? temporaryTask.content : task.content}
                                        autoComplete="false"
                                        autoCapitalize="false"
                                        onChange={textChange}
                                        onBlur={textFocusOut}
                                        onKeyDown={keyDown}
                                        onKeyUp={keyUp}
                                        placeholder="Enter new task"
                                    />

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={1}>
                            <PlayPauseButton
                                task={task}
                                index={index}
                                dragging={dragging}
                            />
                        </Grid>
                    </Grid>
                </Fade>
                <Fade in={optionsVisible} timeout={{ exit: fadeExit }}>
                    <Grid container className={"options-div"} justify="space-evenly" wrap="nowrap" alignContent="center" alignItems="center">
                        <Grid item>
                            <Button id="task-reset" className={"option-buttons"} variant="outlined" onClick={onOptionsButtonClick}>Reset</Button>
                        </Grid>
                        <Grid item>
                            <Button id="task-subtasks" className={"option-buttons"} variant="outlined" onClick={onOptionsButtonClick}>Subtasks</Button>
                        </Grid>
                        <Grid item>
                            <Button id="task-delete" className={"option-buttons"} variant="outlined" onClick={onOptionsButtonClick}>Delete</Button>
                        </Grid>
                        <Grid item>
                            <Button id="task-cancel" className={"option-buttons"} variant="outlined" onClick={onOptionsButtonClick}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Fade>
                <Fade in={subtasksVisible} timeout={{ exit: fadeExit }}>
                    <div className={"subtasks-indicator"}>
                        <p> =======) Subtasks visible</p>
                    </div>
                </Fade>
                <div className="drag-handle-div">
                    <Fade in={handleVisible}>
                        <DragHandleIcon
                            fontSize="small"
                            color="disabled"
                            classes={{ root: "drag-handle-root" }}
                        />
                    </Fade>
                </div>
            </Paper>
        </Grid >
    )
}