import { BaseTask, TaskObj } from "./TaskObj.js"
import { getService } from "../services/service.js"
import { ObjArrayCopy } from "../common/ObjArrayCopy.js";
import { store } from "../redux/store.js";
import { taskActions } from "../redux/Tasks/taskActions.js"

let taskList = null

export function initTaskList(user_id = null) {
    taskList = new TaskList(user_id);
}

export function getTaskList() {
    if(taskList == null) {
        initTaskList()
    }

    return taskList
}

class TaskList {
 constructor(user_id) {
    this.user_id = user_id;
    this.next_order = 0
    this.setTaskListState();
  }

  async setTaskListState() {
    const stateTasks = ObjArrayCopy(store.getState().tasks);

    if (stateTasks.length > 0){
      this.next_order = stateTasks.length;
      return
    } else {
      const taskObjs = await this.getTasksFromDB()

      taskActions.setTasks(taskObjs);
      this.next_order = taskObjs.length;
    }
  }

  async getTasksFromDB() {
    const stateTasks = ObjArrayCopy(store.getState().tasks);
    const dbTasks = await getService().localService.user.getTasks(this.user_id);
    const taskObjs = dbTasksToTaskObjs(dbTasks.data);
    taskObjs.sort((a, b) => a.order - b.order);
    stateTasks.sort((a, b) => a.order - b.order);

    if (stateTasks.length > 0) {
      stateTasks.forEach((stateTask) => {
        taskObjs.forEach((taskObj) => {
          if (taskObj._id == stateTask._id) {
            taskObj.pomodoro_progress = stateTask.pomodoro_progress;
            taskObj.running = stateTask.running;

            taskObj.progress_before_last_end =
              stateTask.progress_before_last_end;
            taskObj.last_pomodoro_start = stateTask.last_pomodoro_start;
            taskObj.last_pomodoro_end = stateTask.last_pomodoro_end;
          }
        });
      });
    }

    return taskObjs
  }

  addTask() { 
    const currentTime = new Date().getTime()
    const newTaskID = currentTime.toString() + this.user_id

    const newTaskObj = new TaskObj({
      _id: newTaskID.slice(0,24),
      user_id: this.user_id,
      order: this.next_order
    })

    taskActions.addTask(newTaskObj);
    this.next_order++;

    getService().localService.task.create(newTaskObj)
  }

  updateTask(index, updateObj) {
    const tasks = ObjArrayCopy(store.getState().tasks);
    const task = tasks[index];

    Object.keys(updateObj).forEach((attrKey) => {
      task[attrKey] = updateObj[attrKey];
    });
    
    taskActions.setTasks(tasks);

    updateObj.task_id = task._id;
    getService().localService.task.update(updateObj);
  }

  deleteTask(index) {
    const tasks = ObjArrayCopy(store.getState().tasks)

    const removedTask = tasks.splice(index, 1)[0]
    
    tasks.forEach((task, index) => {
        if(task.order !== index) {
            task.order = index
        }
    })
    taskActions.setTasks(tasks);

    getService().localService.task.delete(removedTask._id);

    tasks.forEach((task, index) => {
      getService().localService.task.update({
        task_id: task._id,
        order: index,
      });
    })
  }

  updateProgressRunning(index, isRunning) {
    const tasks = ObjArrayCopy(store.getState().tasks);
    const task = tasks[index];

    if (isRunning) {
      task.last_pomodoro_start = new Date().getTime()

      //Stop all other tasks
      tasks.forEach((item, ind) => {
        if(index !== ind) {
          item.running = false;
          item.last_pomodoro_end = new Date().getTime();
        }
      })

      if (task.pomodoro_progress >= 100) {
        task.pomodoro_progress = 0
        task.progress_before_last_end = 0
      }
      
    } else {
      task.last_pomodoro_end = new Date().getTime()
      task.progress_before_last_end = calculate_new_pomodoro_progress(task);
    }

    task.running = isRunning;
    taskActions.setTasks(tasks)
  }

  resetTask(index) {
    const tasks = ObjArrayCopy(store.getState().tasks);
    const task = tasks[index];
    task.pomodoro_progress = 0;
    task.secondsElapsed = 0;

    taskActions.setTasks(tasks);
  }

  setSubtasksVisibility(index, visible) {
    const tasks = ObjArrayCopy(store.getState().tasks);
    tasks[index].subtasksVisible = visible;

    //Set all other subtasks invisible
    if(visible) {
      tasks.forEach((item, ind) => {
        if(ind !== index)
          item.subtasksVisible = false;
      });
    }

    taskActions.setTasks(tasks);
  }

  updatePomodoroProgress(index) {
    const tasks = ObjArrayCopy(store.getState().tasks)
    const task = tasks[index]

    if (!task.running) {
      return
    }

    let new_pomodoro_progress = calculate_new_pomodoro_progress(task)

    tasks[index].pomodoro_progress = new_pomodoro_progress;
    taskActions.setTasks(tasks);
  }

  updateTaskOrder(source_index, destination_index) {
      let tasks = ObjArrayCopy(store.getState().tasks);
      const updateObj = {
          task_id : tasks[source_index]._id,
          order : destination_index
      }

      tasks = swapContent(tasks, source_index, destination_index);
      taskActions.setTasks(tasks);
      
      getService().localService.task.update(updateObj)
  }
}

function dbTasksToTaskObjs(dbTasks) {
    const taskObjs = []

    dbTasks.forEach(dbTask => {
        taskObjs.push(new TaskObj(dbTask))
    })

    return taskObjs
}

function swapContent(content, source_index, destination_index) {
  const newContent = ObjArrayCopy(content);
  const removedItem = { ...content[source_index] };

  newContent.splice(source_index, 1);
  newContent.splice(destination_index, 0, removedItem);

  newContent.forEach((item, index) => {
      item.lastEdit = new Date().getTime()
      item.order = index
    });

  return newContent;
}

function calculate_new_pomodoro_progress(task) {
  const seconds_passed = (new Date().getTime() - task.last_pomodoro_start)/1000
  task.last_pomodoro_start = new Date().getTime();
  task.secondsElapsed += seconds_passed;

  let new_pomodoro_progress = task.pomodoro_progress + (seconds_passed / task.pomodoro_duration) * 100.0;

  if (new_pomodoro_progress >= 100) {
    return 100.0
  }

  return new_pomodoro_progress
}