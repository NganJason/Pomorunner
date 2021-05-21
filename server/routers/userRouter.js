import { userView } from "../views/userView.js";

import express from "express";

const userRouter = express.Router();

userRouter.get("/get", userView.getUser);
userRouter.post("/create", userView.createUser);
userRouter.post("/update", userView.updateUser);
userRouter.get("/delete", userView.deleteUser);

export { userRouter };
