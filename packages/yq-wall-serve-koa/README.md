## 角色

角色描述:

:::  

游客 (identity: 0)：没有注册用户，能够浏览留言墙，但不能进行评论、点赞、发布留言等操作。

普通用户 (identity: 1)：注册用户，能够发表意见、评论和点赞，但没有特殊的管理权限。

管理员 (identity: 2)：具有管理权限，可以删除不当言论或用户，审核用户内容等。

超级管理员（增加一个更高的权限，identity: 3）：可以进行系统级别的操作，如添加/删除用户、管理系统设置等。

::: 

权限关系:

:::

游客只能查看内容，不能进行任何操作。

普通用户可以执行以下操作：发布内容、评论、点赞等。

管理员可以管理普通用户，包括拉黑用户、删除评论等。

超级管理员拥有所有权限，可以对管理员的权限进行管理。

:::

数据库实体:

```javascript
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
  // 创建时间
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // 更新时间
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  // 账号是否冻结 
  isFrozen: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("users", userSchema);
export default userModel;
```

权限检查机制:

:::

在进行用户操作时（如添加评论、删除内容等），可以通过用户的身份字段进行验证，确保他们有权进行相应的操作。

:::

## 角色菜单

