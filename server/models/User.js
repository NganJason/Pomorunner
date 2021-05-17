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
        },
    },
    {timestamps: true}
)

export const User = mongoose.model("User", userSchema)