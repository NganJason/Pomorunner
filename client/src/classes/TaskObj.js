export class BaseTask {
    constructor(dbTask) {
        this._id = dbTask._id
        this.order = dbTask.order
        this.content = dbTask.content || ""
        this.pomodoro_duration = dbTask.pomodoro_duration || 45
        this.pomodoro_progress = dbTask.pomodoro_progress || 0
        this.checked = dbTask.checked || false
        this.running = dbTask.running || false;
        this.task_date = dbTask.task_date || Date.parse(new Date().toDateString())
        this.user_id = dbTask.user_id
        this.subtasks = dbTask.subtasks || []
    }
}

export class TaskObj extends BaseTask{
    constructor(dbTask){
        super(dbTask)
        this.timerID = 0;
        this.lastEdit = new Date().getTime();
        this.subtasksVisible = false;
        this.last_pomodoro_start = new Date().getTime()
        this.secondsElapsed = 0;
    }
}