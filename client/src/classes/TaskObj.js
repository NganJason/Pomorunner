

export class TaskObj {
    constructor(content, user_id, order){
        this.pomodoro_progress = 0;
        this.pomodoro_duration = 10;
        this.content = content;
        this.checked = false;
        this.date = new Date();
        this.user_id = user_id;
        this.order = order;
        this.running = false;
        this.timerID = 0;
        this.lastEdit = new Date().getTime();
    }
}