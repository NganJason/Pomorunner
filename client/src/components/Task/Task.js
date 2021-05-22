import "./Task.modules.scss";
import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import TaskContent from "./TaskContent/TaskContent.js";
import Fade from "@material-ui/core/Fade";
import PlayPauseButton from "./PlayPauseButton/PlayPauseButton";
import TextField from "@material-ui/core/TextField";
import { ObjArrayCopy } from "../../common/ObjArrayCopy.js";

const fadeExit = 30;

export default function Task(props) {
    const { index, content, setContents, timerIDStates, provided, dragging } = props;
    const { checked } = content;
    const [optionsVisible, setOptionsVisible] = React.useState(false);
    const [editingContent, setEditingContent] = React.useState(false);

    //Toggle checked state
    function onCheckboxChange() {
        setContents((prevContents) => {
            const newContents = ObjArrayCopy(prevContents);
            newContents[index].checked = !newContents[index].checked;
            return newContents;
        });
    }

    function onContextMenu(e) {
        e.preventDefault();
        setOptionsVisible(prevState => !prevState);
    }

    function onOptionsButtonClick(e) {
        switch (e.currentTarget.id) {
            case "task-delete":
                setContents(prevContents => {
                    const newContents = ObjArrayCopy(prevContents);
                    newContents.splice(index, 1);
                    console.log(newContents);
                    return newContents;
                });
                timerIDStates.current = timerIDStates.current.splice(index, 1);
                setOptionsVisible(false);
                setEditingContent(false);
                break;

            case "task-edit":
                setEditingContent(true);
                setOptionsVisible(false);
                break;

            case "task-cancel":
                setOptionsVisible(false);
                setEditingContent(false);
                break;

            default:
                break;
        }
    }

    //Disable options menu or editing on dragging
    React.useEffect(() => {
        if (dragging)
        {
            setOptionsVisible(false);
            setEditingContent(false);
        }
    }, [dragging])

    function textChange(e) {
        setContents(prevContents => {
            const newContents = ObjArrayCopy(prevContents);
            newContents[index].content = e.target.value;
            return newContents;
        })
    }

    function doneClicked(e) {
        //TODO: Clear this task if it becomes empty
        setEditingContent(false);
    }

    return (
        <Grid item xs={12} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className="transition-style">
            <Paper className={`task-paper`} elevation={0} onContextMenu={onContextMenu}>
                <Fade in={!optionsVisible} timeout={{ exit: fadeExit }}>
                    <Grid container className={"task-container"} alignItems={"center"} id={content}>
                        <Grid item xs={1} className={"task-item"}>
                            <Checkbox color="default" checked={checked} onChange={onCheckboxChange}></Checkbox>
                        </Grid>
                        <Grid item xs={10}>
                            <Fade in={editingContent}>
                                <Grid container
                                    direction="column"
                                    justify="space-between"
                                    spacing={1}
                                    className={`${editingContent ? "null" : "editing-disabled"}`}
                                >
                                    <Grid item xs={12}>
                                        <TextField
                                            classes={{
                                                root: "text-field-root"
                                            }}
                                            InputProps={{
                                                classes: {
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
                                            value={content.content}
                                            autoComplete={false}
                                            autoCapitalize={false}
                                            onChange={textChange}
                                        />

                                    </Grid>
                                    <Grid item>
                                        <Button
                                            classes={{ root: "done-edit-button" }}
                                            onClick={doneClicked}
                                            variant={"outlined"}
                                        >
                                            Done
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Fade>
                            <Fade in={!editingContent} className={`${!editingContent ? "null" : "editing-disabled"}`} timeout={{ exit: fadeExit }}>
                                <div>
                                    <TaskContent content={content.content} />
                                </div>
                            </Fade>
                        </Grid>
                        <Grid item xs={1}>
                            <PlayPauseButton
                                setContents={setContents}
                                timerIDStates={timerIDStates}
                                content={content}
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
                            <Button id="task-edit" className={"option-buttons"} variant="outlined" onClick={onOptionsButtonClick}>Edit</Button>
                        </Grid>
                        <Grid item>
                            <Button id="task-cancel" className={"option-buttons"} variant="outlined" onClick={onOptionsButtonClick}>Cancel</Button>
                        </Grid>
                    </Grid>
                </Fade>
            </Paper>
        </Grid >
    )
}