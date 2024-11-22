import type { Context } from 'koa'
import commentModel from "../models/comment.model"

class commentController {
    async createComment(ctx: Context) {
        const { content, messageId, userId } = ctx.request.body as any
        const comment = await commentModel.create({ content, messageId, userId })
        ctx.body = {
          success: true,
          data: comment
        }
    }
}

export default new commentController()
