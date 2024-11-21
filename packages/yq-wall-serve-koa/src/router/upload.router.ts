import Router from 'koa-router'
import uploadMiddleware from "../middleware/upload.middleware";

const uploadRouter = new Router({
    prefix: '/upload'
})

uploadRouter.post('/single', uploadMiddleware.single('file'), (ctx: any) => {
    let path = ctx.req.file.path
    path = ctx.origin + path
    ctx.body = {
        url: path
    }
})

uploadRouter.post('/array', uploadMiddleware.array('files', 10))

export default uploadRouter
