import { Subtask } from "../models/Subtask.js"
import { Task } from "../models/Task.js";

export class SubtaskRepo {
  async createSubtask(subtaskObj) {
    try {
        let subtask = await Subtask.create(subtaskObj)
        
        let task = await Task.findOne({ _id: subtaskObj.task_id});
        await task.saveSubtask(subtask._id);

        return subtask
    } catch(err) {
        throw new errorResponse.BadRequestError(err)
    }
  }

  async findSubtaskByID(_id) {
    try {
      let subtask = await Subtask.findOne({ _id });

      return subtask
    } catch(err) {
      throw new errorResponse.BadRequestError(err)
    }
  }

  async updateSubtaskByID(_id, update) {
    try {
      let subtask = await Subtask.findOneAndUpdate({ _id }, update, {new: true});

      return subtask
    } catch(err) {
      throw new errorResponse.BadRequestError(err);
    }
  }

  async deleteSubtaskByID(subtask_id) {
    try {
        let subtask = await Subtask.findOneAndDelete({_id: subtask_id})

        let task = await Task.findOne({_id: subtask.task_id})
        await task.removeSubtask(subtask_id);

        return subtask
    } catch(err) {
        throw new errorResponse.BadRequestError(err)
    }
  }

  async deleteSubtasks(subtasks){
    try {
        subtasks.forEach(subtask_id => {
            this.deleteSubtaskByID(subtask_id)
        })
    } catch (err) {
        return err
    }
  }
}