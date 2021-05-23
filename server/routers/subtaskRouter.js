import { auth } from "../middlewares/auth.js"
import { subtaskView } from "../views/subtaskView.js";

import express from "express";

const subtaskRouter = express.Router();

subtaskRouter.get("/get", auth.isAuthenticated, subtaskView.getSubtask);
subtaskRouter.post("/create", auth.isAuthenticated, subtaskView.createSubtask);
subtaskRouter.post("/update", auth.isAuthenticated, subtaskView.updateSubtask);
subtaskRouter.get("/delete", auth.isAuthenticated, subtaskView.deleteSubtask);

export { subtaskRouter };
