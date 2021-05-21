import { subtaskController } from "../controllers/subtaskController.js";

const createSubtask = async (req, res, next) => {
  try {
    let resp = await subtaskController.handleCreateSubtask(req);
    res.status(200).json(resp);
  } catch (err) {
    next(err);
  }
};

const getSubtask = async (req, res, next) => {
  try {
    let resp = await subtaskController.handleGetSubtask(req);
    res.status(200).json(resp);
  } catch (err) {
    next(err);
  }
};

const updateSubtask = async (req, res, next) => {
  try {
    let resp = await subtaskController.handleUpdateSubtask(req);
    res.status(200).json(resp);
  } catch (err) {
    next(err);
  }
};

const deleteSubtask = async (req, res, next) => {
  try {
    let resp = await subtaskController.handleDeleteSubtask(req);
    res.status(200).json(resp);
  } catch (err) {
    next(err);
  }
};

export const subtaskView = {
  createSubtask,
  getSubtask,
  updateSubtask,
  deleteSubtask,
};
