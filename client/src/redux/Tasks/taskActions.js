import { store } from "../store";
import { taskConst } from "./taskConst.js";

const setTasks = (payload) => {
  store.dispatch({ type: taskConst.SET_TASK, payload: payload });
};

const addTask = async (newTaskObj) => {
  store.dispatch({ type: taskConst.ADD_TASK, payload: newTaskObj });
}

export const taskActions = {
  setTasks,
  addTask
};
