import userModel from "../models/users.model";
import type { IUser, IUserQueryResult } from "../types";

class UserService {
  // 获取用户列表或单个用户
  async getUser(page: number, pageSize: number, id?: string): Promise<any> {
    try {
      if (id) {
        // 查询单个用户
        const user = await userModel.findById(id);
        return { user }; // 返回单个用户
      } else {
        // 查询用户列表，支持分页
        const skip = (page - 1) * pageSize;
        const users = await userModel.find().skip(skip).limit(pageSize);
        const total = await userModel.countDocuments();
        return { users, total }; // 返回用户列表和总数
      }
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // 新增用户
  async createUser(userData: IUser) {
    try {
      return await userModel.create(userData);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // 更新用户
  async updateUser(id: string, userData: IUser) {
    try {
      return await userModel.updateOne({ _id: id }, userData);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // 删除用户
  async deleteUser(id: string) {
    try {
      return await userModel.deleteOne({ _id: id });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

export default new UserService();
