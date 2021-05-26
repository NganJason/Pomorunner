import { auth } from "../middlewares/auth.js"
import { userView } from "../views/userView.js";

import express from "express";

const userRouter = express.Router();

userRouter.post("/login", userView.loginUser)
userRouter.get("/logout", userView.logoutUser);
userRouter.post("/update", auth.isAuthenticated, auth.isAuthorized, userView.updateUser);
userRouter.get("/delete", auth.isAuthenticated, auth.isAuthorized, userView.deleteUser);
userRouter.get("/get_tasks", auth.isAuthenticated, auth.isAuthorized, userView.getUserTasks);
userRouter.get("/get", userView.getUser);
userRouter.get("/get_jwt_token", userView.getJWTToken)

export { userRouter };
