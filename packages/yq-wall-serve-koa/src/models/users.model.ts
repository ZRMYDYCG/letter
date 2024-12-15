import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  // 账号
  username: {
    type: String,
    required: true,
  },
  // 密码
  password: {
    type: String,
    required: false,
    select: false,
  },
  // 昵称
  nickname: {
    type: String,
    default: "",
  },
  // 头像，可以是字符串或数字
  avatar: {
    type: mongoose.Schema.Types.Mixed,
    default: Math.floor(Math.random() * 11), // 默认为0到10的随机整数
  },
  // 用户身份
  identity: {
    type: Number,
    required: true,
  },
  // 账号是否冻结
  isFrozen: {
    type: Boolean,
    default: false,
  },
  // 创建时间
  createdAt: {
    type: Date,
    default: Date.now,
  },
  permissions: {
    type: [String],
    default: [],
  },
  // 更新时间
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
