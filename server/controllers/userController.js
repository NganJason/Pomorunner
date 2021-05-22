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
    throw new Error("Invalid token ID")
  }

  let user = await DBRepo.user.findUserByEmail(email);
  if (!user) {
    user = await DBRepo.user.createUser({email})
  }
  
  const token = user.getSignedToken()
  return {token, email}
}

const handleLogoutUser = async (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
}

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
  handleLoginUser,
  handleLogoutUser,
  handleGetUser,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser
};
