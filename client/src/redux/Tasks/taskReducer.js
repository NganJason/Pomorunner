import { taskConst } from "./taskConst.js"

const inititalState = []

export default function taskReducer(state = inititalState, action) {
    switch(action.type) {
        case taskConst.SET_TASK: {
            return [
                ...action.payload
            ]
        }

        default: {
            return state;
        }
    }
}