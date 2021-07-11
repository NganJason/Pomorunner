import "./TaskContext.modules.scss";
import React from "react";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import { MousePosition } from "../../../classes/MouseEvents.js"
import { getTaskList } from "../../../classes/TaskList.js"

export default function TaskContext(props) {
    const { optionsVisible, setOptionsVisible, index, setDeleting } = props;
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        //Set cursor location, undefined occurs on first page load
        if (optionsVisible) {
            if (MousePosition !== undefined)
                setMousePos(MousePosition);
        }
    }, [optionsVisible])

    const onOptionsButtonClick = React.useCallback((e) => {
        switch (e.currentTarget.id) {
            case "task-delete":
                getTaskList().deleteTask(index);
                break;

            case "task-cancel":
                break;

            case "task-subtasks":
                getTaskList().setSubtasksVisibility(index, true);
                break;

            case "task-reset":
                getTaskList().resetTask(index);
                break;

            default:
                break;
        }

        setOptionsVisible(false);
    });

    return (
        <>
            <Popover
                open={optionsVisible}
                classes={{
                    paper: "popover-paper"
                }}
                anchorReference="anchorPosition"
                anchorPosition={{ top: mousePos.x + 1, left: mousePos.y + 1 }} //Offset to prevent easy misclick on first item in menu
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={() => { setOptionsVisible(false) }}
            >
                <div className={"context-buttons-div"}>
                    <Button id="task-reset" className={"option-buttons"} onClick={onOptionsButtonClick}>Reset</Button>
                    <Button id="task-subtasks" className={"option-buttons"} onClick={onOptionsButtonClick}>Subtasks</Button>
                    <Button id="task-delete" className={"option-buttons"} onClick={onOptionsButtonClick}>Delete</Button>
                    <Button id="task-cancel" className={"option-buttons"} onClick={onOptionsButtonClick}>Cancel</Button>
                </div>
            </Popover>
        </>
    )
}