import { utils } from "./utils.js";

const handleCreateTask = async (req) => {
  let task = await DBRepo.task.createTask(req.body);

  return task;
};

const handleGetTask = async (req) => {
  const { task_id } = req.query;
  let task = await DBRepo.task.findTaskByID(task_id);

  return task;
};

const handleUpdateTask = async (req) => {
  const update = req.body;

  if (update.order != undefined) {
    let task = await DBRepo.task.findTaskByID(update.task_id)
    let reorderedTasks = await utils.getReorderedObjs(task, update.order)
    
    DBRepo.task.updateTasksOrder(reorderedTasks)
  }

  let updatedTask = await DBRepo.task.updateTaskByID(update.task_id, update);

  return updatedTask;
};

const handleDeleteTask = async (req) => {
  const { task_id } = req.query;
  let task = await DBRepo.task.deleteTaskByID(task_id);

  return task;
};

export const taskController = {
  handleGetTask,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
};
