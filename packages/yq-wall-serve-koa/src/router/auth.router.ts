import Router from "koa-router";
import authController from "../controller/auth.controller";

const authRouter = new Router({
  prefix: "/auth",
});

/**
 * @desc 用户登录
 * */
// @ts-ignore
authRouter.post("/login", authController.login);

/**
 * @desc 用户注册
 * */
// @ts-ignore
authRouter.post("/register", authController.register);

/**
 * @desc 验证用户登录
 * */
// @ts-ignore
authRouter.post("/verify", authController.verify);

export default authRouter;
