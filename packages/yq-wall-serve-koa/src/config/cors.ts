import { Context } from 'koa'

export const corsHandler = {
    origin: function (ctx: Context) {
        return ctx.request.headers.origin === 'http://localhost:5173' ? 'http://localhost:5173' : false
    },
    maxAge: 7 * 24 * 60 * 60,
    credentials: true,  // 允许跨域请求时携带凭证
    allowMethods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
}