import Router from 'koa-router'
import type { Context } from 'koa'
import userModel from '../models/users.model'
import type { IUser } from '../types'
import UsersModel from "../models/users.model";
import UserController from "../controller/user.controller";

const userRouter = new Router({
    prefix: '/user'
})

/*
 * @desc 获取用户列表或单个用户
 * */
userRouter.get('/', UserController.getUser)

/**
 * @desc 新增用户
 * */
userRouter.post('/')

/**
 * @desc 更新用户
 * */
userRouter.put('/:id', UserController.updateUser)

/**
 * @desc 删除用户
 * */
userRouter.delete('/:id', UserController.deleteUser)

export default userRouter
