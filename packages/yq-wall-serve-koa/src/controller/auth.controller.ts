import type { Context } from "koa";
import authService from "../service/auth.service";
import userModel from "../models/users.model";
import jwt from "jsonwebtoken";

class authController {
  async login(ctx: Context) {
    const { username, password } = ctx.request.body as {
      username: string;
      password: string;
    };
    const { token, user } = await authService.login(username, password);
    ctx.body = {
      code: 200,
      message: "登录成功",
      data: { token, user },
    };
  }

  async register(ctx: Context) {
    const { username, password, identity } = ctx.request.body as {
      username?: string;
      password?: string;
      identity: number;
    };

    /**
     * identity: 1 代表注册普通用户，0 代表游客注册
     */
    if (identity === 1) {
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
        .create({ username, password, identity: 1 })
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
    } else if (identity === 0) {
      const ip = ctx.request.ip;
      console.log(ip);
      const user = await userModel.findOne({ username: ip });
      if (user) {
        ctx.body = {
          code: 500,
          message: "该ip地址已被注册",
        };
        return;
      }

      ctx.body = {
        code: 200,
        message: "游客注册成功",
        username: "游客" + ip,
      };

      await userModel.create({ username: ip, identity: 0 });
    }
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
