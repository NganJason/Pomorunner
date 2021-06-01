import { Subtask } from "./Subtask.js"
import { Task } from "./Task.js"
import { User } from "./User.js"

export class LocalService {
    constructor(axios) {
        this.user = new User(axios)
        this.task = new Task(axios)
        this.subtask = new Subtask(axios)
    }
}