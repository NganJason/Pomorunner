import "./TaskContext.modules.scss";
import React from "react";
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";
import { getTaskList } from "../../../classes/TaskList.js"

//TODO: Unsure if there is a better way to implement this, or better place to attach this event listener
let mousePosition;
document.onmousemove = (event) => {
    let eventDoc, doc, body;
    event = event || window.event; // IE-ism

    // If pageX/Y aren't available and clientX/Y are,
    // calculate pageX/Y - logic taken from jQuery.
    // (This is to support old IE)
    if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX = event.clientX +
            ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
            ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
        event.pageY = event.clientY +
            ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
            ((doc && doc.clientTop) || (body && body.clientTop) || 0);
    }

    // Use event.pageX / event.pageY here
    mousePosition = {x: event.pageY, y : event.pageX};
}

export default function TaskContext(props) {
    const { optionsVisible, setOptionsVisible, index } = props;
    const [mousePos, setMousePos] = React.useState({x: 0, y:0});

    React.useEffect(() => {
        //Set cursor location, undefined occurs on first page load
        if(optionsVisible)
        {
            if(mousePosition !== undefined)
                setMousePos(mousePosition);
        }
    }, [optionsVisible])
    
    const onOptionsButtonClick = React.useCallback((e) => {
        switch (e.currentTarget.id) {
            case "task-delete":
                getTaskList().deleteTask(index)
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
        <div className={"popover-div"}>
            <Popover
                open={optionsVisible}
                classes={{
                    paper: "popover-paper"
                }}
                anchorReference="anchorPosition"
                anchorPosition={{ top: mousePos.x + 1, left: mousePos.y + 1}} //Offset to prevent easy misclick on first item in menu
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                onClose={() => {setOptionsVisible(false)}}
            >
                <div className={"context-buttons-div"}>
                    <Button id="task-reset" className={"option-buttons"} onClick={onOptionsButtonClick}>Reset</Button>
                    <Button id="task-subtasks" className={"option-buttons"} onClick={onOptionsButtonClick}>Subtasks</Button>
                    <Button id="task-delete" className={"option-buttons"} onClick={onOptionsButtonClick}>Delete</Button>
                    <Button id="task-cancel" className={"option-buttons"} onClick={onOptionsButtonClick}>Cancel</Button>
                </div>
            </Popover>
        </div>
    )
}