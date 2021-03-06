import {OAuth2Client} from "google-auth-library"

const client = new OAuth2Client(
  process.env.OAUTH_CLIENT_ID
);

const handleLoginUser = async (req) => {
  const {tokenId} = req.body

  const res = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.OAUTH_CLIENT_ID,
  });
  const {email, email_verified} = res.payload

  if (!email_verified) {
    throw new errorResponse.BadRequestError("Invalid token ID")
  }

  let user = await DBRepo.user.findUserByEmail(email);
  if (!user) {
    user = await DBRepo.user.createUser({email})
  }
  
  const token = user.getSignedToken()
  return {
    token: token, 
    user: user
  }
}

const handleUpdateUser = async (req) => {
  const {user_id, update} = req.body
  let user = await DBRepo.user.updateUserByID(user_id, update)

  return user
}

const handleDeleteUser = async (req) => {
  const { user_id } = req.query;
  let user = await DBRepo.user.deleteUserByID(user_id);

  return user;
}

const handleGetUserTasks = async (req) => {
  const {user_id, task_date} = req.query
  let tasks = await DBRepo.task.findUserTasks(user_id, task_date);

  return tasks
}

const handleGetUser = async (req) => {
  const { email } = req.query;
  let user = await DBRepo.user.findUserByEmail(email);

  return user;
};

const handleGetJWTToken = async (req) => {
  const {email} = req.query;
  let user = await DBRepo.user.findUserByEmail(email)

  let token = user.getSignedToken()
  return {
    token: token
  }
}

export const userController = {
  handleLoginUser,
  handleUpdateUser,
  handleDeleteUser,
  handleGetUserTasks,
  handleGetUser,
  handleGetJWTToken,
};
