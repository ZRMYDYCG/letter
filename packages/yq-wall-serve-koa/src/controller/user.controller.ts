import type { Context } from 'koa'
import userService from '../service/user.service'
import type { IUser } from '../types'
import userModel from "../models/users.model";

class UserController {
    // 获取用户列表或单个用户
    async getUser(ctx: Context) {
        const { page = 1, pageSize = 10, id } = ctx.query as { page?: string; pageSize?: string; id?: string }

        try {
            const result = await userService.getUser(Number(page), Number(pageSize), id)

            if (id) {
                // 当查询单个用户时
                if (!result.user) {
                    ctx.body = {
                        code: 404,
                        message: '用户不存在',
                        data: null
                    }
                } else {
                    ctx.body = {
                        code: 200,
                        message: '查询用户成功',
                        data: result.user, // 直接返回单个用户
                        meta: null
                    }
                }
            } else {
                // 当查询用户列表时
                ctx.body = {
                    code: 200,
                    message: '查询用户成功',
                    data: result.users, // 返回用户列表
                    meta: {
                        pageSize: Number(pageSize),
                        page: Number(page),
                        total: result.total // 返回总数
                    }
                };
            }
        } catch (err) {
            ctx.body = {
                code: 400,
                error: err.message
            }
        }
    }

    // 新增用户
    async createUser(ctx: Context) {
        const { username, password, nickname, avatar } = ctx.request.body as IUser

        try {
            const res = await userService.createUser({
                username,
                password,
                nickname,
                avatar
            })

            ctx.body = {
                code: res ? 200 : 500,
                message: res ? '新增用户成功' : '新增用户失败',
                data: res || null
            }
        } catch (err) {
            ctx.body = {
                code: 400,
                error: err.message
            }
        }
    }

    // 更新用户
    async updateUser(ctx: Context) {
        const params = ctx.params as { id: string }
        const { username, password, nickname, avatar } = ctx.request.body as IUser

        try {
            const res = await userService.updateUser(params.id, {
                username,
                password,
                nickname,
                avatar
            })

            ctx.body = {
                code: 200,
                message: '更新用户成功',
                data: res
            }
        } catch (err) {
            ctx.body = {
                code: 400,
                error: err.message
            }
        }
    }

    // 删除用户
    async deleteUser(ctx: Context) {
        const params = ctx.params as { id: string }

        try {
            const res = await userService.deleteUser(params.id)
            ctx.body = {
                code: 200,
                message: '删除用户成功',
                data: res
            }
        } catch (err) {
            ctx.body = {
                code: 400,
                error: err.message
            }
        }
    }

    // 修改用户密码
    async updatePassword(ctx: Context) {
        const { username, newPassword } = ctx.request.body as { username: string; newPassword: string }
        try {
            const res = await userModel.updateOne({ username }, { password: newPassword })

            if(res) {
                ctx.body = {
                    code: 200,
                    message: '修改密码成功',
                    data: res
                }
            } else {
                ctx.body = {
                    code: 500,
                    error: '修改密码失败'
                }
            }

        } catch (err) {
            console.log(err)
        }
    }
}

export default new UserController()