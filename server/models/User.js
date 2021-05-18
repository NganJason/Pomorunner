import {DEFAULT_POMODORO_DURATION} from "./constant.js"

import mongoose from "mongoose"

const {Schema} = mongoose;

const userSchema = new Schema(
  {
    auth_id: {
      type: String,
      required: true,
    },
    default_pomodoro_duration: {
      type: Number,
      default: DEFAULT_POMODORO_DURATION,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema)