import Router from 'koa-router'
import messageController from '../controller/message.controller'

const messageRouter = new Router({
    prefix: '/yq-message',
})

messageRouter.post('/', messageController.createMessage)

messageRouter.delete('/:id', messageController.deleteMessage)

messageRouter.get('/', messageController.getMessage)

export default messageRouter
