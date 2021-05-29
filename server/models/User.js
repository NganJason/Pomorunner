import {DEFAULT_POMODORO_DURATION} from "./constant.js"

import jwt from "jsonwebtoken";
import mongoose from "mongoose"

const {Schema} = mongoose;

const userSchema = new Schema(
  {
    email: {
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

userSchema.methods.getSignedToken = function() { 
  return jwt.sign({ id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
}

export const User = mongoose.model("User", userSchema)