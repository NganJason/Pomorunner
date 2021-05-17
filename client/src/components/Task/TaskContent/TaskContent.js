import "./TaskContent.scss";
import React from "react";
import Typography from "@material-ui/core/Typography";

export default function TaskContent(props){
    return(
        <>
        <Typography className={"task-content"}>{props.content}</Typography>
        </>
    )
}