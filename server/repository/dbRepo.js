import { dbUtils } from "../models/dbUtils.js";
import { Subtask } from "../models/Subtask.js";
import { Task } from "../models/Task.js";
import { User } from "../models/User.js";

export class dbRepo {
  constructor() {}

  //------------ User ------------
  createUser(userObj) {
    return dbUtils.createOne(User, userObj);
  }

  findUserByID(auth_id) {
    return dbUtils.findOne(User, { auth_id });
  }

  updateUserByID(auth_id, update) {
    return dbUtils.updateOne(User, { auth_id }, update);
  }

  deleteUserByID(auth_id) {
    return dbUtils.deleteOne(User, { auth_id });
  }

  //------------ Task ------------
  createTask(taskObj) {
    return dbUtils.createOne(Task, taskObj);
  }

  findTaskByID(_id) {
    return dbUtils.findOne(Task, { _id });
  }

  updateTaskByID(_id, update) {
    return dbUtils.updateOne(Task, { _id }, update);
  }

  deleteTaskByID(_id) {
    return dbUtils.deleteOne(Task, { _id });
  }

  //------------ Subtask ------------
  createSubtask(subtaskObj) {
    return dbUtils.createOne(Subtask, subtaskObj);
  }

  findSubtaskByID(_id) {
    return dbUtils.findOne(Subtask, { _id });
  }

  updateSubtaskByID(_id, updateObj) {
    return dbUtils.updateOne(Subtask, { _id }, updateObj);
  }

  deleteSubtaskByID(_id) {
    return dbUtils.deleteOne(Subtask, { _id });
  }
}
