import {userController} from "../controllers/userController.js"

const loginUser = async (req, res, next) => {
    try {
        let resp = await userController.handleLoginUser(req)
        res.status(200).json(resp)
    } catch(err) {
        next(err)
    }
}

const logoutUser = async (req, res, next) => {
    try {
        res.cookie("token", "", { maxAge: 1 });
        res.status(200).json({message: "Logged out successfully"})
    } catch(err) {
        next(err)
    }
}

const updateUser = async (req, res, next) => {
    try {
        let resp = await userController.handleUpdateUser(req)
        res.status(200).json(resp)
    } catch(err) {
        next(err)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let resp = await userController.handleDeleteUser(req)
        res.status(200).json(resp)
    } catch(err) {
        next(err)
    }
}

const getUserTasks = async (req, res, next) => {
    try {
        let resp = await userController.handleGetUserTasks(req)
        res.status(200).json(resp)
    } catch(err) {
        next(err)
    }
}

const getUser = async (req, res, next) => {
  try {
    let resp = await userController.handleGetUser(req);
    res.status(200).json(resp);
  } catch(err) {
    next(err);
  }
};

const getJWTToken = async (req, res, next) => {
    try {
        let resp = await userController.handleGetJWTToken(req)
        res.status(200).json(resp)
    } catch(err) {
        next(err)
    }
}

export const userView = {
  loginUser,
  logoutUser,
  updateUser,
  deleteUser,
  getUserTasks,
  getUser,
  getJWTToken,
};