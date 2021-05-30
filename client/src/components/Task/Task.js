import React from "react";
import { useSelector } from "react-redux";

import "./Task.modules.scss";
import Button from "@material-ui/core/Button";
<<<<<<< HEAD
import Checkbox from "@material-ui/core/Checkbox";
import DragHandleIcon from "@material-ui/icons/DragHandle";
=======
>>>>>>> eedb32c048df607a1312fb5ff8157d210d6f46fa
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PlayPauseButton from "./PlayPauseButton/PlayPauseButton";
import TextField from "@material-ui/core/TextField";

import { ObjArrayCopy } from "../../common/ObjArrayCopy.js";
import { taskActions } from "../../redux/Tasks/taskActions.js"

const fadeExit = 30;

export default function Task(props) {
    const { index, task, timerIDStates, provided, dragging } = props;
    const { checked } = task;

    const tasks = useSelector((state) => state.tasks);
    const [optionsVisible, setOptionsVisible] = React.useState(false);
    const [handleVisible, setHandleVisible] = React.useState(false);
    const [temporaryContent, setTemporaryContent] = React.useState({content: content.content, lastEdit: new Date().getSeconds()});
    const shiftHeld = React.useRef(false);

    function onCheckboxChange() {
        const newTasks = ObjArrayCopy(tasks)

        newTasks[index].checked = !newTasks[index].checked;
        taskActions.setTasks(newTasks)
    }

    function onContextMenu(e) {
        e.preventDefault();
        setOptionsVisible(prevState => !prevState);
    }

    function onOptionsButtonClick(e) {
        switch (e.currentTarget.id) {
            case "task-delete":
                const newTasks = ObjArrayCopy(tasks)
                newTasks.splice(index, 1)
                taskActions.setTasks(newTasks)
                
                timerIDStates.current = timerIDStates.current.splice(index, 1);
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
        setTemporaryContent({content: content.content, lastEdit: new Date().getSeconds()});
    }, [content.content])

    const textChange = React.useCallback((e) => {
        setTemporaryContent({content: e.target.value, lastEdit: new Date().getSeconds()});
    }, []);

    const onMouseEnter = React.useCallback(() => {
        setHandleVisible(true);
    }, []);

    const onMouseLeave = React.useCallback(() => {
        setHandleVisible(false);
    }, []);

    function textChange(e) {
        const newTasks = ObjArrayCopy(tasks)
        newTasks[index].content = e.target.value
        
        taskActions.setTasks(newTasks)
    }

    function doneClicked(e) {
        //TODO: Clear this task if it becomes empty
        setEditingContent(false);
    }
    //Save temporary content to original store
    const textFocusOut = React.useCallback(() => {
        setContents(prevContents => {
            const newContents = ObjArrayCopy(prevContents);
            newContents[index].content = temporaryContent.content;
            newContents[index].lastEdit = new Date().getSeconds();

            return newContents;
        })
    }, [index, temporaryContent, setContents]);

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
            <Paper className={`task-paper`} elevation={0} onContextMenu={onContextMenu} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <Fade in={!optionsVisible} timeout={{ exit: fadeExit }}>
                    <Grid container spacing={0} className={"task-container"} alignItems={"center"} justify="flex-start" id={task}>
                        <Grid item xs={1} className={"task-item"}>
                            <Checkbox color="default" checked={checked} onChange={onCheckboxChange}></Checkbox>
                        </Grid>
                        <Grid item xs={10} className={"text-field-grid-item"}>
                            <Fade in={true}>
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
                                                    root: "outlined-root",
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
                                            value={temporaryContent.lastEdit > content.lastEdit ? temporaryContent.content : content.content}
                                            autoComplete={false}
                                            autoCapitalize={false}
                                            onChange={textChange}
                                            onBlur={textFocusOut}
                                            onKeyDown={keyDown}
                                            onKeyUp={keyUp}
                                            placeholder="Enter new task"
                                        />

                                    </Grid>
                                </Grid>
                            </Fade>
                        </Grid>
                        <Grid item xs={1}>
                            <PlayPauseButton
                                timerIDStates={timerIDStates}
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