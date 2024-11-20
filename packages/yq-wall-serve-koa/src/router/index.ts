import Router from 'koa-router'

import userRouter from './user.router'

export const router = new Router()

router.use(userRouter.routes())

export default router