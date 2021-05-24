import {utils} from "./utils.js"

const handleCreateSubtask = async (req) => {
  let subtask = await DBRepo.subtask.createSubtask(req.body);

  return subtask;
};

const handleGetSubtask = async (req) => {
  const { subtask_id } = req.query;
  let subtask = await DBRepo.subtask.findSubtaskByID(subtask_id);

  return subtask;
};

const handleUpdateSubtask = async (req) => {
  const update = req.body;

  if (update.order != undefined) {
    let subtask = await DBRepo.subtask.findSubtaskByID(update.subtask_id)
    let reorderedSubtasks = await utils.getReorderedObjs(subtask, update.order);

    DBRepo.subtask.updateSubtasksOrder(reorderedSubtasks);
  }

  let updatedSubtask = await DBRepo.subtask.updateSubtaskByID(update.subtask_id, update);

  return updatedSubtask;
};

const handleDeleteSubtask = async (req) => {
  const { subtask_id } = req.query;
  let subtask = await DBRepo.subtask.deleteSubtaskByID(subtask_id);

  return subtask;
};

export const subtaskController = {
  handleGetSubtask,
  handleCreateSubtask,
  handleUpdateSubtask,
  handleDeleteSubtask,
};
