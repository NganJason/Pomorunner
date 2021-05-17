import mongoose from "mongoose";
const { Schema } = mongoose;

subtaskSchema = new Schema(
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
      required: true,
    },
  },
  { timestamps: true }
);

export const Subtask = mongoose.model("Subtask", subtaskSchema);
