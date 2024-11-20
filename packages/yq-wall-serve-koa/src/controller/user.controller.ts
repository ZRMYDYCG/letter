import type { Context } from 'koa'
import userModel from '../models/users.model'
import type { IUser } from '../types'

class UserController {
    // 获取用户列表或单个用户
    async getUser(ctx: Context) {
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
                    };
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
                };
            }
        } catch (err) {
            // perf: 日志记录异常
            ctx.body = {
                code: 400,
                error: err.message
            };
        }
    }

    // 新增用户
    async createUser(ctx: Context) {
        const { username, password, nickname, avatar } = ctx.request.body as IUser;

        try {
            const res = await userModel.create({
                username,
                password,
                nickname,
                avatar
            });

            ctx.body = {
                code: res ? 200 : 500,
                message: res ? '新增用户成功' : '新增用户失败',
                data: res || null
            };
        } catch (err) {
            // perf: 日志记录异常
            ctx.body = {
                code: 400,
                error: err.message
            };
        }
    }

    // 更新用户
    async updateUser(ctx: Context) {
        const params = ctx.params as { id: string }
        const { username, password, nickname, avatar } = ctx.request.body as IUser

        try {
            const res = await userModel.updateOne({ _id: params.id }, {
                username,
                password,
                nickname,
                avatar
            });

            ctx.body = {
                code: 200,
                message: '更新用户成功',
                data: res
            };
        } catch (err) {
            // perf: 日志记录异常
            ctx.body = {
                code: 400,
                error: err.message
            };
        }
    }

    // 删除用户
    async deleteUser(ctx: Context) {
        const params = ctx.params as { id: string }

        try {
            const res = await userModel.deleteOne({ _id: params.id })
            ctx.body = {
                code: 200,
                message: '删除用户成功',
                data: res
            };
        } catch (err) {
            // perf: 日志记录异常
            ctx.body = {
                code: 400,
                error: err.message
            };
        }
    }
}

export default new UserController()
