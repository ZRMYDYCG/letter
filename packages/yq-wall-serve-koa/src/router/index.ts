import Router from 'koa-router'

import userRouter from './user.router'
import authRouter from "./auth.router"

export const router = new Router()

router.use(userRouter.routes())
router.use(authRouter.routes())

export default router