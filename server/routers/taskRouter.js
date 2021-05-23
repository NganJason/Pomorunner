import { auth } from "../middlewares/auth.js"
import { taskView } from "../views/taskView.js";

import express from "express";

const taskRouter = express.Router();

taskRouter.get("/get", auth.isAuthenticated, taskView.getTask);
taskRouter.post("/create", auth.isAuthenticated, taskView.createTask);
taskRouter.post("/update", auth.isAuthenticated, taskView.updateTask);
taskRouter.get("/delete", auth.isAuthenticated, taskView.deleteTask);

export { taskRouter };
