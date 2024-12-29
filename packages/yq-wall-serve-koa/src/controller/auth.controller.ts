import type { Context } from "koa";
import authService from "../service/auth.service";
import userModel from "../models/users.model";
import jwt from "jsonwebtoken";

class authController {
  async login(ctx: Context) {
    const { username, password, identity } = ctx.request.body as {
      username: string;
      password: string;
      identity: number;
    };
    const { token, user } = await authService.login(username, password, identity, ctx.request.ip);
    ctx.body = {
      code: 200,
      message: "登录成功",
      data: { token, user },
    };
  }

  async register(ctx: Context) {
    const { username, password, identity } = ctx.request.body as {
      identity: number;
      username?: string;
      password?: string;
    };

    // 检查用户名和密码是否提供
    if (!username || !password) {
      ctx.body = {
        code: 400,
        message: "用户名和密码是必填项",
      };
      return;
    }

    // 查询当前的用户注册的用户名是否存在
    const user = await userModel.findOne({ username });

    if (user) {
      ctx.body = {
        code: 500,
        message: "该用户名已被注册",
      };
      return;
    }

    await userModel
        .create({ username, password, identity })
        .then((res) => {
          if (res) {
            ctx.body = {
              code: 200,
              message: "注册成功",
              data: res,
            };
          } else {
            ctx.body = {
              code: 300,
              message: "注册失败",
            };
          }
        })
        .catch((err) => {
          ctx.body = {
            code: 500,
            message: "注册出现异常",
            data: err,
          };
        });
  }

  /**
   * @desc 验证用户登录
   * */
  async verify(ctx: Context) {
    let token = ctx.header.authorization;
    token = token.replace("Bearer ", "");
    console.log(token);

    try {
      const result = jwt.verify(token, "yq-yq-message-wall-server-jwt") as any;

      await userModel
        .findOne({ id: result.res.id })
        .then((res) => {
          if (res) {
            ctx.body = {
              code: 200,
              message: "用户认证成功",
              data: res,
            };
          } else {
            ctx.body = {
              code: 500,
              message: "用户认证出现异常",
            };
          }
        })
        .catch((error) => {
          ctx.body = {
            code: 500,
            message: "用户认证出现异常",
            data: error,
          };
        });
    } catch (error) {
      ctx.body = {
        code: 500,
        message: "用户认证出现异常",
        data: error,
      };
    }
  }
}

export default new authController();
