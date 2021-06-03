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
    const task = await getService().localService.user.getTasks(this.user_id);

    const taskObjs = dbTasksToTaskObjs(task.data);
    taskObjs.sort((a, b) => a.order - b.order)
    
    taskActions.setTasks(taskObjs);
    this.next_order = taskObjs.length;
  }

  async addTask() { 
    const res = await getService().localService.task.create(
      new BaseTask({ user_id: this.user_id, order: this.next_order })
    );

    this.next_order++;

    const newTaskObj = new TaskObj(res.data);
    taskActions.addTask(newTaskObj);
  }

  async updateTask(index, updateObj) {
    const tasks = ObjArrayCopy(store.getState().tasks);
    const task = tasks[index];

    Object.keys(updateObj).forEach((attrKey) => {
      task[attrKey] = updateObj[attrKey];
    });
    
    taskActions.setTasks(tasks);

    updateObj.task_id = task._id;
    await getService().localService.task.update(updateObj);
  }

  async deleteTask(index) {
    const tasks = ObjArrayCopy(store.getState().tasks)

    const removedTask = tasks.splice(index, 1)[0]
    
    await getService().localService.task.delete(removedTask._id)

    tasks.forEach( async (task, index) => {
        if(task.order !== index) {
            task.order = index

            await getService().localService.task.update({
                task_id: task._id,
                order: index,
            });
        }
    })

    taskActions.setTasks(tasks);
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

  async updatePomodoroProgress(index) {
    const tasks = ObjArrayCopy(store.getState().tasks)
    const task = tasks[index]

    if (!task.running) {
      return
    }

    let new_pomodoro_progress = calculate_new_pomodoro_progress(task)

    tasks[index].pomodoro_progress = new_pomodoro_progress;
    taskActions.setTasks(tasks);
  }

  async updateTaskOrder(source_index, destination_index) {
      let tasks = ObjArrayCopy(store.getState().tasks);
      const updateObj = {
          task_id : tasks[source_index]._id,
          order : destination_index
      }

      tasks = swapContent(tasks, source_index, destination_index);
      taskActions.setTasks(tasks);
      
      await getService().localService.task.update(updateObj)
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

  // let new_pomodoro_progress =
  //   task.progress_before_last_end +
  //   (seconds_passed / task.pomodoro_duration) * 100.0;

  if (new_pomodoro_progress >= 100) {
    return 100.0
  }

  return new_pomodoro_progress
}