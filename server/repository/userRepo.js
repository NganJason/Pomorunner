import { User } from "../models/User.js";
import { errorResponse } from "../utils/error.js";

export class UserRepo {
  constructor() {}

  async createUser(userObj) {
    try {
      let user = await User.create(userObj);

      return user
    } catch(err) {
      throw new errorResponse.BadRequestError(err)
    }
  }

  async findUserByEmail(email) {
    try {
      let user = await User.findOne({ email });

      return user
    } catch(err) {
      throw new errorResponse.BadRequestError(err)
    }
  }

  async findUserByID(_id) {
    try {
      let user = await User.findOne({ _id });

      return user
    } catch(err) {
      throw new errorResponse.BadRequestError(err)
    }
  }

  async updateUserByID(_id, updateObj) {
    try {
      let user = await User.findOneAndUpdate({ _id }, updateObj, { new: true });

      return user
    } catch(err) {
      throw new errorResponse.BadRequestError(err)
    }
  }

  async deleteUserByID(_id) {
    try {
      let user = await User.findOneAndDelete({ _id });

      return user
    } catch(err) {
      throw new errorResponse.BadRequestError(err)
    }
  }
}