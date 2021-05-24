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
        return err
    }
  }

  async findSubtaskByID(_id) {
    return await Subtask.findOne({ _id });
  }

  async updateSubtaskByID(_id, update) {
    return await Subtask.findOneAndUpdate({ _id }, update, {new: true});
  }

  async deleteSubtaskByID(subtask_id) {
    try {
        let subtask = await Subtask.findOneAndDelete({_id: subtask_id})

        let task = await Task.findOne({_id: subtask.task_id})
        await task.removeSubtask(subtask_id);

        return subtask
    } catch(err) {
        return err
    }
  }

  async deleteSubtasks(subtasks){
    try {
        subtasks.forEach(subtask_id => {
            this.deleteSubtaskByID(subtask_id)
        })
    } catch (err) {
      return err;
    }
  }

  async updateSubtasksOrder(reorderedSubtasks) {
    try {
      reorderedSubtasks.forEach((subtask, index) => {
        subtask.order = index + 1;
        subtask.save();
      });
    } catch (err) {
      return err;
    }
  }
}