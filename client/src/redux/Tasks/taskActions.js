import { store } from "../store";
import { taskConst } from "./taskConst.js";

const setTasks = (payload) => {
  store.dispatch({ type: taskConst.SET_TASK, payload: payload });
};

const addTask = (taskObj) => {
  store.dispatch({ type: taskConst.ADD_TASK, payload: taskObj })
}

const updatePomodoroProgress = (index) => {
  store.dispatch({ type: taskConst.UPDATE_POMODORO_PROGRESS, payload: { index: index } })
}

const setRunningStatus = (index, status) => {
  store.dispatch({ type: taskConst.SET_RUNNING_STATUS, payload: { index: index, status: status } })
}

export const taskActions = {
  setTasks,
  updatePomodoroProgress,
  setRunningStatus,
  addTask
};
