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

        case taskConst.ADD_TASK: {
            return [
                ...state,
                action.payload
            ]            
        }

        case taskConst.RESET_PROGRESS:{
            const newState = ObjArrayCopy(state)
            const {index} = action.payload
            newState[index].pomodoro_progress = 0;
            newState[index].secondsElapsed = 0;

            return [...newState];
        }

        case taskConst.UPDATE_POMODORO_PROGRESS: {
            const newState = ObjArrayCopy(state)
            const {index} = action.payload
            
            newState[index].pomodoro_progress += 1 / newState[index].pomodoro_duration * 100.0;
            newState[index].secondsElapsed++;

            if (newState[index].pomodoro_progress > 100) {
                newState[index].pomodoro_progress = 100
                newState[index].secondsElapsed--;
            }

            return [...newState];
        }

        case taskConst.SET_RUNNING_STATUS: {
            const newState = ObjArrayCopy(state);
            const {index, status} = action.payload;
            newState[index].running = status;

            //Stop all other tasks if set to running
            if(status)
            {
                newState.forEach((state, ind) => {
                    if(ind !== index)
                        state.running = false;
                });
            }

            return [...newState];
        }

        case taskConst.RESET_TASK: {
            return []
        }

        default: {
            return state;
        }
    }
}