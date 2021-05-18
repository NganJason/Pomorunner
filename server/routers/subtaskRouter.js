import { subtaskView } from "../views/subtaskView.js";

import express from "express";

const subtaskRouter = express.Router();

subtaskRouter.get("/get", subtaskView.getSubtask);
subtaskRouter.post("/create", subtaskView.createSubtask);
subtaskRouter.post("/update", subtaskView.updateSubtask);
subtaskRouter.get("/delete", subtaskView.deleteSubtask);

export { subtaskRouter };
