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

const handleRearrangeTasksOrder = async (task_id, updatedOrder) => {
  try {
    let task = await DBRepo.task.findTaskByID(task_id)
    let initialOrder = task.order
    
    let selfAndSiblingTasks = await task.getSelfAndSiblingTasks()
    selfAndSiblingTasks.sort((a, b) => a.order - b.order);

    let reorderedTasks = common.rearrangeObjOrder(selfAndSiblingTasks, initialOrder - 1, updatedOrder - 1)
    
    await DBRepo.task.updateTasksOrder(reorderedTasks)
  } catch(err) {
    return err
  }
}

export const taskController = {
  handleGetTask,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
};
