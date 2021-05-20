import { SubtaskRepo } from "./subtaskRepo.js";
import { TaskRepo } from "./taskRepo.js";
import { UserRepo } from "./userRepo.js";

export class dbRepo {
  constructor() {
    this.user = new UserRepo();
    this.task = new TaskRepo();
    this.subtask = new SubtaskRepo();
  }
}
