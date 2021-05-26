import { SubtaskRepo } from "./subtaskRepo.js";
import { Task } from "../models/Task.js";

export class TaskRepo {
  constructor() {
    this.subtaskRepo = new SubtaskRepo();
  }

  async createTask(taskObj) {
    return await Task.create(taskObj);
  }

  async findTaskByID(_id) {
    return await Task.findOne({ _id }).populate("subtasks");
  }

  async updateTaskByID(_id, update) {
    return await Task.findOneAndUpdate({ _id }, update, { new: true });
  }

  async deleteTaskByID(_id) {
    try {
      let task = await Task.findOne({ _id });

      await this.subtaskRepo.deleteSubtasks(task.subtasks);

      return await Task.findOneAndDelete({ _id: task._id });
    } catch (err) {
      return err;
    }
  }

  async findUserTasks(user_id, datestring) {
    return await Task.find({user_id, datestring}).populate("subtasks")
  }

  async updateTasksOrder(reorderedTasks) {
    try {
      reorderedTasks.forEach((task, index) => {
        task.order = index + 1
        task.save()
      })
    } catch(err) {
      return err
    }
  }
}
