import { taskController } from "../controllers/taskController.js";

const createTask = async (req, res, next) => {
  try {
    let resp = await taskController.handleCreateTask(req);
    res.status(200).json(resp);
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    let resp = await taskController.handleGetTask(req);
    res.status(200).json(resp);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    let resp = await taskController.handleUpdateTask(req);
    res.status(200).json(resp);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    let resp = await taskController.handleDeleteTask(req);
    res.status(200).json(resp);
  } catch (err) {
    next(err);
  }
};

export const taskView = {
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
