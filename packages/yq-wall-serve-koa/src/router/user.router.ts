import Router from "koa-router";
import UserController from "../controller/user.controller";

const userRouter = new Router({
  prefix: "/user",
});

/*
 * @desc 获取用户列表或单个用户
 * */
// @ts-ignore
userRouter.get("/", UserController.getUser);

/**
 * @desc 新增用户
 * */
// @ts-ignore
userRouter.post("/", UserController.createUser);

/**
 * @desc 更新用户
 * */
// @ts-ignore
userRouter.put("/:id",UserController.updateUser);

/**
 * @desc 删除用户
 * */
// @ts-ignore
userRouter.delete("/:id", UserController.deleteUser);

/**
 * @desc 修改密码
 * */
// @ts-ignore
userRouter.post("/change-password", UserController.updatePassword);

export default userRouter;
