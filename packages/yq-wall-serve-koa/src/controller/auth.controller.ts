import type { Context } from 'koa'
import authService from '../service/auth.service'
import userModel from "../models/users.model"
import jwt from "jsonwebtoken"

class authController {
    async login(ctx: Context) {
        const { username, password } = ctx.request.body as { username: string, password: string }
        const { token , user } = await authService.login(username, password)
        ctx.body = {
            code: 200,
            message: '登录成功',
            data: { token, user }
        }
    }
    async register(ctx: Context) {
        const { username, password } = ctx.request.body as { username: string, password: string }

        // 查询当前的用户注册的用户名是否存在
        const user = await userModel.findOne({ username })

        if(user) {
            ctx.body = {
                code: 500,
                message: '该用户名已被注册',
            }
            return
        }


        await userModel.create({username, password}).then((res) => {
            if(res) {
                ctx.body = {
                    code: 200,
                    message: '注册成功',
                    data: res,
                }
            } else {
                ctx.body = {
                    code: 300,
                    message: '注册失败',
                }
            }
        }).catch((err) => {
            ctx.body = {
                code: 500,
                message: '注册出现异常',
                data: err,
            }
        })

    }

    /**
     * @desc 验证用户登录
     * */
    async verify(ctx: Context) {
        let token = ctx.header.authorization
        token = token.replace('Bearer ', '')
        console.log(token)
        try {
          let result = jwt.verify(token, 'yq-message-wall-server-jwt')

            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }
}

export default new authController()
