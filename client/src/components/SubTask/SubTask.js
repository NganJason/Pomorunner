import React from "react";
import { useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import PlayPauseButton from "./PlayPauseButton/PlayPauseButton";
import TextField from "@material-ui/core/TextField";

import "./SubTask.modules.scss";
import { ObjArrayCopy } from "../../common/ObjArrayCopy.js";
import { taskActions } from "../../redux/Tasks/taskActions.js"

const fadeExit = 30;

export default function SubTask(props) {
    const { index, task, provided, dragging } = props;
    const { checked } = task;

    const tasks = useSelector((state) => state.tasks);
    const [optionsVisible, setOptionsVisible] = React.useState(false);
    const [handleVisible, setHandleVisible] = React.useState(false);
    const [temporaryTask, setTemporaryTask] = React.useState({ content: task.content, lastEdit: new Date().getTime() });
    const shiftHeld = React.useRef(false);

    function onCheckboxChange() {
        // const newTasks = ObjArrayCopy(tasks)

        // newTasks[index].checked = !newTasks[index].checked;
        // taskActions.setTasks(newTasks)
    }

    function onContextMenu(e) {
        e.preventDefault();
        document.activeElement.blur();

        setOptionsVisible(prevState => !prevState);
        setHandleVisible(false);
    }

    function onOptionsButtonClick(e) {
        // const newTasks = ObjArrayCopy(tasks)
        switch (e.currentTarget.id) {
            case "task-delete":
                // newTasks.splice(index, 1)
                // taskActions.setTasks(newTasks)

                setOptionsVisible(false);
                break;

            case "task-cancel":
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
        const newTasks = ObjArrayCopy(tasks);
        newTasks[index].content = temporaryTask.content;
        newTasks[index].lastEdit = new Date().getTime();

        taskActions.setTasks(newTasks)
    }, [index, temporaryTask, tasks]);

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
                <Fade in={!optionsVisible} timeout={{ exit: fadeExit }}>
                    <Grid container spacing={0} className={"task-container"} alignItems={"center"} justify="flex-start" id={task}>
                        <Grid item xs={1} className={"task-item"}>
                            <Checkbox color="default" checked={checked} onChange={onCheckboxChange}></Checkbox>
                        </Grid>
                        <Grid item xs={11} className={"text-field-grid-item"}>
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
                                                root: "outlined-root sub-task-input-outlined-root",
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
                    </Grid>
                </Fade>
                <Fade in={optionsVisible} timeout={{ exit: fadeExit }}>
                    <Grid container className={"options-div"} justify="space-evenly" wrap="nowrap" alignContent="center" alignItems="center">
                        <Grid item>
                            <Button id="task-delete" className={"option-buttons"} variant="outlined" onClick={onOptionsButtonClick}>Delete</Button>
                        </Grid>
                        <Grid item>
                            <Button id="task-cancel" className={"option-buttons"} variant="outlined" onClick={onOptionsButtonClick}>Cancel</Button>
                        </Grid>
                    </Grid>
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