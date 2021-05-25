import { auth } from "../middlewares/auth.js"
import { userView } from "../views/userView.js";

import express from "express";

const userRouter = express.Router();

userRouter.post("/login", userView.loginUser)
userRouter.get("/logout", userView.logoutUser);
userRouter.get("/get", userView.getUser);
userRouter.post("/create", userView.createUser);
userRouter.post("/update", auth.isAuthenticated, auth.isAuthorized, userView.updateUser);
userRouter.get("/delete", auth.isAuthenticated, auth.isAuthorized, userView.deleteUser);

export { userRouter };
