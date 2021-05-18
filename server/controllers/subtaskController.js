const handleCreateSubtask = async (req) => {
  let subtask = await DBRepo.createSubtask(req.body);

  return subtask;
};

const handleGetSubtask = async (req) => {
  const { _id } = req.query;
  let subtask = await DBRepo.findSubtaskByID(_id);

  return subtask;
};

const handleUpdateSubtask = async (req) => {
  const { _id, update } = req.body;
  let subtask = await DBRepo.updateSubtaskByID(_id, update);

  return subtask;
};

const handleDeleteSubtask = async (req) => {
  const { _id } = req.query;
  let subtask = await DBRepo.deleteSubtaskByID(_id);

  return subtask;
};

export const subtaskController = {
  handleGetSubtask,
  handleCreateSubtask,
  handleUpdateSubtask,
  handleDeleteSubtask,
};
