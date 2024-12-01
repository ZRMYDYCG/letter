import Router from 'koa-router'
import uploadMiddleware from "../middleware/upload.middleware";

const uploadRouter = new Router({
    prefix: '/upload'
})

/**
 * @description 上传单文件
 * */
uploadRouter.post('/single', uploadMiddleware.single('file'), (ctx: any) => {
    let path = 'http://localhost:5174/' + ctx.req.file.filename

    ctx.body = {
        code: 200,
        message: '上传成功',
        url: path
    }
})

/**
 * @description 上传多文件
 * */
uploadRouter.post('/array', uploadMiddleware.array('files', 10))

/**
 * @description 新增带图片的留言
 * */
uploadRouter.post('/img-message', uploadMiddleware.fields(
    [
        { name: 'file', maxCount: 1 }, // 上传的文件字段
        { name: 'DTO', maxCount: 1 } // 可以作为文件上传（如 JSON 字符串）、前端记得使用 FormData 对象
    ]
), (ctx: any) => {
    const { file } = ctx.req.files
    const DTO = ctx.req.body.DTO

    ctx.body = {
        code: 200,
        message: '上传成功',
        data: {
            avatar: 'http://localhost:5174/' + file[0].filename,
            DTO: DTO
        }
    }
})

export default uploadRouter
