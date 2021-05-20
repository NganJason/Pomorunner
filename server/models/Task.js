import { DEFAULT_POMODORO_DURATION } from "./constant.js";

import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema(
  {
    order: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    pomodoro_duration: {
      type: Number,
      default: DEFAULT_POMODORO_DURATION,
    },
    pomodoro_progress: {
      type: Number,
      default: 0,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subtasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subtask",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

taskSchema.methods.saveSubtask = async function (subtask_id) {
    this.subtasks.push(subtask_id)

    return await this.save()
}

taskSchema.methods.removeSubtask = async function (subtask_id) {
  let filtered_subtasks = this.subtasks.filter(id => {
    return id != subtask_id
  })

  this.subtasks = filtered_subtasks
  return await this.save()
}

export const Task = mongoose.model("Task", taskSchema);