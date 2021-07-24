import "./Weekview.modules.scss";
import TaskList from "../TaskList/TaskList.js"
import React from "react";

export default function Weekview(props) {
	return (
		<div className={"weekview-div"}>
			<TaskList side="left"/>
			<TaskList side="center"/>
			<TaskList side="center"/>
			<TaskList side="center"/>
			<TaskList side="right"/>
		</div>
	)
}