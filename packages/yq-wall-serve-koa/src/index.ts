import Koa from 'koa';
import Database from '../db/index'

const app = new Koa()
const msg: string = 'Hello World'

// 连接数据库
Database.connect()

app.use(async (ctx: Koa.Context): Promise<void> => {
    ctx.body = msg
})

app.listen(5173, () => {
    console.log("Server is running on http://localhost:5173");
})
