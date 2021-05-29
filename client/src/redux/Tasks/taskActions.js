import { store } from "../store";
import { taskConst } from "./taskConst.js"

const setTasks = (payload) => {
    store.dispatch({ type: taskConst.ADD_TASK, payload:payload })
};

export const taskActions = {
    setTasks
}