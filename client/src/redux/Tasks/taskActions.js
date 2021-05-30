import { store } from "../store";
import { taskConst } from "./taskConst.js";

const setTasks = (payload) => {
  store.dispatch({ type: taskConst.SET_TASK, payload: payload });
};

const updatePomodoroProgress = (index) => {
  store.dispatch({ type: taskConst.UPDATE_POMODORO_PROGRESS, payload: {index: index}})
}

export const taskActions = {
  setTasks,
  updatePomodoroProgress,
};
