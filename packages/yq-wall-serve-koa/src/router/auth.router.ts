import Router from 'koa-router'
import authController from "../controller/auth.controller"

const authRouter = new Router({
    prefix: '/auth'
})

/**
 * @desc 用户登录
 * */
authRouter.post('/login', authController.login)

/**
 * @desc 用户注册
 * */
authRouter.post('/register', authController.register)


export default authRouter
