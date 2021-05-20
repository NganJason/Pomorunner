import { User } from "../models/User.js";

export class UserRepo {
  constructor() {}

  async createUser(userObj) {
    return await User.create(userObj);
  }

  async findUserByID(auth_id) {
    return await User.findOne({ auth_id });
  }

  async updateUserByID(auth_id, updateObj) {
    return await User.findOneAndUpdate({ auth_id }, updateObj, {new: true});
  }

  async deleteUserByID(auth_id) {
    return await User.findOneAndDelete({ auth_id });
  }
}