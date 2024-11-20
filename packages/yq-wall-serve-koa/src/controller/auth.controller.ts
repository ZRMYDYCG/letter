import type { Context } from 'koa'
import authService from '../service/auth.service'

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
}

export default new authController()
