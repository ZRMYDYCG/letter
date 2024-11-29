import Router from 'koa-router'
import uploadMiddleware from "../middleware/upload.middleware";

const uploadRouter = new Router({
    prefix: '/upload'
})

uploadRouter.post('/single', uploadMiddleware.single('file'), (ctx: any) => {
    let path = 'http://localhost:5174/' + ctx.req.file.filename

    ctx.body = {
        code: 200,
        message: '上传成功',
        url: path
    }
})

uploadRouter.post('/array', uploadMiddleware.array('files', 10))

export default uploadRouter
