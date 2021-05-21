import mongoose from "mongoose";

const { Schema } = mongoose;

let subtaskSchema = new Schema(
  {
    order: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      default: "",
    },
    checked: {
      type: Boolean,
      default: false,
    },
    task_id: {
      type: Schema.Types.ObjectId,
      ref: "Task",
    },
  },
  { timestamps: true }
);

export const Subtask = mongoose.model("Subtask", subtaskSchema);