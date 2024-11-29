import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Database from './db/index'
import cors from 'koa2-cors'
import router from './router'
import { corsHandler } from './config/cors'
import serve from 'koa-static'
import path from 'path'
/**
 * koa-jwt 中间件会自动检查请求头中是否携带有效的 JWT
 *
 * 提取 Token：当请求到达时，koa-jwt 会查找请求头中的 Authorization 字段，通常格式为 Bearer <token>。它会提取出 <token> 部分。
 *
 * 验证 Token：提取出 token 后，koa-jwt 会使用你提供的密钥（'yq-yq-message-wall-server-jwt'）来验证这个 token 的有效性。
 *
 * 处理结果：
 *
 * 如果 token 有效，koa-jwt 会将解码后的 token 放入 ctx.state.user 中，供后续的中间件或路由处理函数使用。
 * 如果 token 无效或缺失，koa-jwt 会返回一个 401 Unauthorized 的响应，表示请求未被授权。
 * */
import koajwt from 'koa-jwt'

const app = new Koa()

// 提供 'public' 目录的静态文件
app.use(serve(path.join(__dirname, 'public/uploads')));

Database.connect()

app.use(bodyParser())

app.use(cors(corsHandler))

app.use(koajwt({
    secret: 'yq-yq-message-wall-server-jwt'
}).unless({
    path: [/^\/auth\/login/, /^\/auth\/register/],
}))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(5174, () => {
    console.log("Server is running on http://localhost:5174")
})
