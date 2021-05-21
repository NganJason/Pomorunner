const handleCreateUser = async (req) => {
  let user = await DBRepo.user.createUser(req.body)

  return user
};

const handleGetUser = async (req) => {
  const { auth_id } = req.query;
  let user = await DBRepo.user.findUserByID(auth_id);

  return user;
};

const handleUpdateUser = async (req) => {
  const {auth_id, update} = req.body
  let user = await DBRepo.user.updateUserByID(auth_id, update)

  return user
}

const handleDeleteUser = async (req) => {
  const { auth_id } = req.query;
  let user = await DBRepo.user.deleteUserByID(auth_id);

  return user;
}

export const userController = {
  handleGetUser,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser
};
