import Koa from 'koa';
import bodyParser from 'koa-bodyparser'
import Database from './db/index'
import cors from 'koa2-cors'
import router from './router'
import { corsHandler } from './config/cors'
import koajwt from 'koa-jwt'

const app = new Koa()

Database.connect()

app.use(bodyParser())

app.use(cors(corsHandler))

app.use(koajwt({
    secret: 'yq-message-wall-server-jwt'
}).unless({
    path: [/^\/auth\/login/, /^\/auth\/register/],
}))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(5174, () => {
    console.log("Server is running on http://localhost:5174");
})
