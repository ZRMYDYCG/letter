import Router from 'koa-router'
import type { Context } from 'koa'
import userModel from '../models/users.model'
import type { IUser } from '../types'
import UsersModel from "../models/users.model";

const userRouter = new Router({
    prefix: '/user'
})

/**
 * @desc 获取用户列表或单个用户
 * */
userRouter.get('/', async function(ctx: Context, next) {
    const { page = 1, pageSize = 10, id } = ctx.query
    try {
        if (id) {
            // 查询单个用户
            const user = await userModel.findById(id)
            if (user) {
                ctx.body = {
                    code: 200,
                    message: '查询用户成功',
                    data: user
                }
            } else {
                ctx.body = {
                    code: 404,
                    message: '用户不存在',
                    data: null
                }
            }
        } else {
            // 查询用户列表，支持分页
            const skip = (Number(page) - 1) * Number(pageSize)
            const users = await userModel.find().skip(skip).limit(Number(pageSize))
            const total = await userModel.countDocuments()

            ctx.body = {
                code: 200,
                message: '查询用户列表成功',
                data: users,
                meta: {
                    pageSize: Number(pageSize),
                    page: Number(page),
                    total: total
                }
            }
        }
    } catch (err) {
        // perf: 日志记录异常
        ctx.body = {
            code: 400,
            error: err.message
        }
    }
})

/**
 * @desc 新增用户
 * */
userRouter.post('/', async function(ctx: Context, next) {
    const { username, password, nickname, avatar } = ctx.request.body as IUser
    try {
        const res = await userModel.create({
            username,
            password,
            nickname,
            avatar
        })

        if(res) {
            ctx.body = {
                code: 200,
                message: '新增用户成功',
                data: res
            }
        } else {
            ctx.body = {
                code: 500,
                message: '新增用户失败'
            }
        }
    } catch(err) {
        // perf: 日志记录异常
        ctx.body = {
            code: 400,
            error: err.message
        }
    }
})

/**
 * @desc 更新用户
 * */
userRouter.put('/:id', async function(ctx: Context, next) {
    const params = ctx.params as { id: string }
    const { username, password, nickname, avatar } = ctx.request.body as IUser
    await UsersModel.updateOne({ _id: params.id }, {
        username: username,
        password: password,
        nickname: nickname,
        avatar: avatar
    }).then((res) => {
        ctx.body = {
            code: 200,
            message: '更新用户成功',
            data: res
        }
    }).catch((err) => {
        // perf: 日志记录异常
        ctx.body = {
            code: 400,
            error: err.message
        }
    })
})

/**
 * @desc 删除用户
 * */
userRouter.delete('/:id', async function(ctx: Context, next) {
    const params = ctx.params as { id: string }
    await UsersModel.deleteOne({ _id: params.id }).then((res) => {
        ctx.body = {
            code: 200,
            message: '删除用户成功',
            data: res
        }
    }).catch((err) => {
        // perf: 日志记录异常
        ctx.body = {
            code: 400,
            error: err.message
        }
    })
})

export default userRouter
