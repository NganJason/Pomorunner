export class TaskObj {
    constructor(content, userID){
        this.pomodoro_progress = 0;
        this.pomodoro_duration = 70;
        this.content = content;
        this.checked = false;
        this.date = new Date();
        this.userID = userID;
        this.running = false;
        this.timerID = 0;
        this.lastEdit = new Date().getTime();
        this.secondsElapsed = 0;
        this.subtasksVisible = false;
    }
}