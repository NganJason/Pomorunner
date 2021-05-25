import { User } from "../models/User.js";

export class UserRepo {
  constructor() {}

  async createUser(userObj) {
    return await User.create(userObj);
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async findUserByID(_id) {
    return await User.findOne({ _id });
  }

  async updateUserByID(_id, updateObj) {
    return await User.findOneAndUpdate({ _id }, updateObj, { new: true });
  }

  async deleteUserByID(_id) {
    return await User.findOneAndDelete({ _id });
  }
}