import { taskView } from "../views/taskView.js";

import express from "express";

const taskRouter = express.Router();

taskRouter.get("/get", taskView.getTask);
taskRouter.post("/create", taskView.createTask);
taskRouter.post("/update", taskView.updateTask);
taskRouter.get("/delete", taskView.deleteTask);

export { taskRouter };
