import { getTaskList } from "./TaskList.js"
import { store } from "../redux/store.js";

export class GlobalTimer {
    constructor(){
        this.timerID = null
    }

    setTimer(interval=1000) {
        let timerID = setInterval(() => {
         this.handlers()   
        }, interval)

        this.timerID = timerID
        return timerID
    }

    handlers() {
        this.updateAllPomodoroProgress()
    }

    updateAllPomodoroProgress() {
        const tasks = store.getState().tasks
        tasks.forEach((_, index) => {
            getTaskList().updatePomodoroProgress(index)
        })
    }
}