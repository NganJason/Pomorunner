import mongoose from "mongoose";
const { Schema } = mongoose;

const taskSchema = new Schema({
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
        default: 45,
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
        default: Date.now()
    },
    user_id: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
});

export const Task = mongoose.model("Task", taskSchema);