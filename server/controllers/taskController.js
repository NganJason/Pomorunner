const handleCreateTask = async (req) => {
  let task = await DBRepo.createTask(req.body);

  return task;
};

const handleGetTask = async (req) => {
  const { _id } = req.query;
  let task = await DBRepo.findTaskByID(_id);

  return task;
};

const handleUpdateTask = async (req) => {
  const { _id, update } = req.body;
  let task = await DBRepo.updateTaskByID(_id, update);

  return task;
};

const handleDeleteTask = async (req) => {
  const { _id } = req.query;
  let task = await DBRepo.deleteTaskByID(_id);

  return task;
};

export const taskController = {
  handleGetTask,
  handleCreateTask,
  handleUpdateTask,
  handleDeleteTask,
};
