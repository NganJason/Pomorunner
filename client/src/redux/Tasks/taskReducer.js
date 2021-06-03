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

        case taskConst.RESET_TASK: {
            return []
        }

        default: {
            return state;
        }
    }
}