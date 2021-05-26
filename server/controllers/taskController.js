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
  let task = await DBRepo.task.updateTaskByID(update.task_id, update);

  return task;
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
