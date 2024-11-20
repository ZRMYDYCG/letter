import Router from 'koa-router'
import authController from "../controller/auth.controller"

const authRouter = new Router({
    prefix: '/auth'
})

authRouter.post('/login', authController.login)


export default authRouter
