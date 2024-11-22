import Router from 'koa-router'
import commentController from "../controller/comment.controller"

const commentRouter = new Router({
    prefix: '/comment'
})

commentRouter.post('/', commentController.createComment)


export default commentRouter
