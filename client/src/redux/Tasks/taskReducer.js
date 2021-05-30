import { taskConst } from "./taskConst.js"
import { ObjArrayCopy } from "../../common/ObjArrayCopy.js"

const inititalState = []

export default function taskReducer(state = inititalState, action) {
    switch(action.type) {
        case taskConst.SET_TASK: {
            return [
                ...action.payload
            ]
        }

        case taskConst.UPDATE_POMODORO_PROGRESS: {
            const newState = ObjArrayCopy(state)
            const {index} = action.payload
            
            newState[index].pomodoro_progress += 1 / newState[index].pomodoro_duration * 100.0;

            if (newState[index].pomodoro_progress > 100) {
                newState[index].pomodoro_progress = 100
            }

            return [
                ...newState
            ]
        }

        case taskConst.RESET_TASK: {
            return []
        }

        default: {
            return state;
        }
    }
}