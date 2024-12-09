import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  /**
   * 用户名
   */
  username: {
    type: String,
    required: true,
  },
  /**
   * 密码
   */
  password: {
    type: String,
    required: false,
    select: false,
  },
  nickname: {
    type: String,
    default: "",
  },
  /**
   * 头像
   */
  avatar: {
    type: String,
    default: "",
  },
  /**
   * 身份验证  0则代表游客，1则代表普通用户，2则代表管理员
   */
  identity: {
    type: Number,
    required: true,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
