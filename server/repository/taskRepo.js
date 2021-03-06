import mongoose from "mongoose";

import { SubtaskRepo } from "./subtaskRepo.js";
import { Task } from "../models/Task.js";
import { errorResponse } from "../utils/error.js";

export class TaskRepo {
  constructor() {
    this.subtaskRepo = new SubtaskRepo();
  }

  async createTask(taskObj) {
    try {
      if (taskObj._id) {
        taskObj._id = mongoose.Types.ObjectId(taskObj._id);
      }
      
      let task = await Task.create(taskObj);

      return task
    } catch(err) {
      throw new errorResponse.BadRequestError(err)
    }
  }

  async findTaskByID(_id) {
    try {
      let task = await Task.findOne({ _id }).populate("subtasks");

      return task
    } catch(err) {
      throw new errorResponse.BadRequestError(err)
    }
  }

  async updateTaskByID(_id, update) {
    try {
      let task = await Task.findOneAndUpdate({ _id }, update, { new: true });

      return task
    } catch(err) {
      throw new errorResponse.BadRequestError(err)
    }
  }

  async deleteTaskByID(_id) {
    try {
      let task = await Task.findOne({ _id });

      await this.subtaskRepo.deleteSubtasks(task.subtasks);

      return await Task.findOneAndDelete({ _id: task._id });
    } catch (err) {
      throw new errorResponse.BadRequestError(err)
    }
  }

  async findUserTasks(user_id, task_date) {
    return await Task.find({ user_id, task_date }).populate("subtasks");
  }

  async updateTasksOrder(reorderedTasks) {
    try {
      reorderedTasks.forEach((task, index) => {
        task.order = index
        task.save()
      })
    } catch(err) {
      return err
    }
  }
}
