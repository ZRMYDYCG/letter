import Router from 'koa-router'
import uploadMiddleware from "../middleware/upload.middleware";

const uploadRouter = new Router({
    prefix: '/upload'
})

uploadRouter.post('/single', uploadMiddleware.single('file'), async (ctx) => {})

uploadRouter.post('/array', uploadMiddleware.array('files', 10), async (ctx) => {})

export default uploadRouter
