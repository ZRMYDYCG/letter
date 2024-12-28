import Router from "koa-router";
import uploadMiddleware from "../middleware/upload.middleware";
import messageModel from "../models/message.model";
import userModel from "../models/users.model";

interface CreateMessageBody {
  content: string; // 留言内容
  userId: string; // 用户ID
  type?: number; // 类型
  color?: string; // 卡片颜色
  tag?: string; // 标签
  nickName?: string; // 用户的留言昵称
  image?: string; // 留言图片
}

const uploadRouter = new Router({
  prefix: "/upload",
});

/**
 * @description 上传单文件
 * */
uploadRouter.post("/single", uploadMiddleware.single("file"), (ctx: any) => {
  let path = "http://localhost:5174/" + ctx.req.file.filename;

  ctx.body = {
    code: 200,
    message: "上传成功",
    url: path,
  };
});

/**
 * @description 上传多文件
 * */
uploadRouter.post("/array", uploadMiddleware.array("files", 10));

/**
 * @description 新增带图片的留言
 * */
uploadRouter.post(
  "/img-message",
  uploadMiddleware.fields([
    { name: "file", maxCount: 1 }, // 上传的文件字段
    { name: "DTO", maxCount: 1 }, // 可以作为文件上传（如 JSON 字符串）、前端记得使用 FormData 对象
  ]),
  async (ctx: any) => {
    const { file } = ctx.req.files;
    const DTO = JSON.parse(ctx.req.body.DTO); // 解析 JSON 字符串

    // 结合 DTO 和文件信息
    const messageData: CreateMessageBody = {
      content: DTO.content, // 从 DTO 获取内容
      userId: DTO.userId,
      type: 1,
      color: DTO.color,
      tag: DTO.tag,
      nickName: DTO.nickName,
      image: "http://localhost:5174/" + file[0].filename, // 存储图片的链接
    };

    const result = await messageModel.create(messageData);

    ctx.body = {
      code: 200,
      message: "留言创建成功",
      data: result,
    };
  },
);

/**
 * 更新用户个人资料
 */
uploadRouter.post(
    "/img-user-profile/:id",
    uploadMiddleware.fields([
      { name: "file", maxCount: 1 }, // 上传的文件字段
      { name: "DTO", maxCount: 1 },
    ]),
    async (ctx: any) => {
      const { id } = ctx.params;
      const { file } = ctx.req.files;
      const DTO = JSON.parse(ctx.req.body.DTO); // 解析 JSON 字符串

      // 创建用户更新数据的对象
      const profileData = {
        nickname: DTO.nickname,
        avatar: "http://localhost:5174/" + file[0].filename, // 存储图片的链接
      };

      // 使用 _id 更新用户信息
      await userModel.updateOne({ _id: id }, profileData);

      // 查询更新后的用户信息
      const updatedUser = await userModel.findById(id);

      ctx.body = {
        code: 200,
        message: "修改用户信息成功",
        data: updatedUser, // 返回更新后的用户信息
      };
    },
);

export default uploadRouter;
